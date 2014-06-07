// ==UserScript==
// @name       	Drone.X
// @namespace   Mafiawars
// @description tmp drone hosting
// @version     3.32
// ==/UserScript==
//Version 3.31

var Drone = {
		Version: 'v3.32',
		iLike: '<iframe src="http://www.facebook.com/plugins/like.php?app_id=219527258096177&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FGuessX-Scripts%2F131414080285469&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:20px;" allowTransparency="true"></iframe>',
		CurrentLevel: $('#user_level').text(),
		StartLevel: $('#user_level').text(),
		JobOptions: {
	Targetid:function(){return("p|" + Drone.StoreThis.WhoToKill);},
	JobPrimaryOrSecondary: 'PrimaryEnergyJobInfo',
	StamPrimaryOrSecondary: 'PrimaryStaminaJobInfo',
	DoExtraJob: 0,
	DoExtraStam: 0,
	RatioingJob: false,
	NormalUntillJob: false,
	RatioStam: false,
	NormStamUntil: false
}, 
Images: {
	Play: 'data:image/gif;base64,R0lGODlhEAAQAMQAAP8A/2K1SIHOEXbIAIPTHZXbMIDRFnbIAXfJA33OEM/vqIbWJHrMC5HLf3jKB/D/3/X/6fn/8uz/1ej/zJjcRc7vpv3/+qHfVP///+T/xAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAVqICCOZEk2QaqmTRlUSizHVTA21LXs/H5RLUCAQCRgikib0MA0WCzNpjKQqCYiWGt1yugyIGCIlzF1mB2P9OPsmCLeCIkc/p4e7ofJBI+fDv4DGYCDSg0Ch4iJh0FCBY6PkEo3KyuMJpcjIQA7',
	Pause: 'data:image/gif;base64,R0lGODlhEAAQAOYAAP8A/zaa/3O4/xal/6jd//L6//r9/87s/8bp/+r3/+Dz/////9bv/xel/xim/xun/xyn/1zA/1a+/0q5/y6u/yWr/x6o/3nL/0S3/yGp/6fd/xqn/2fE/zmz/zmy/2jF/yKq/4rS/27H/3bK/026/zOw/zGw/z+0/1q//0i4/0O2/0m5/3HI/zax/3fK/ySq/067/1O8/1G8/1m//y2u/z20/2HC/5DU/3vM/1C7/yis/x+o/zCv/6vf/3LI/4vS/yOq/zqz/23H/z+1/z60/zuz/zWx/1i+/1vA/2LC/2rF/33N/0u6/2bE/3PJ/yyu/3jL/2nF/y+v/yms/2TD/4nR/6re/xmm/2DC/ySr/3rM/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAewgACCg4SFhAIBiYqJAoUBPQSRkRoaBFYBgwI3IThaFxdQLiNLP1WNAAFOPiwLCyJCrUpRH5ioHE1UBgY2WLoRSCi1ATNHEgUFMTLHMCRMwhMrKQkJGCrTQ0Q1wkVBHQoKLUbfJjxSwhQ0TwwMUzrrFVkvwkAgGQcHOxb3EBAPwhsbriBA4MDBwAYNBtQSMKChwwYOHljIUOEUKgolPJzAMCGHhAhJamVatMiioZODAgEAOw%3D%3D',
	Stop: 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7',
	En2xp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACc0lEQVR42mL8//8/Ay6gOuPA/NsZDomaqqIcl7Y7X2ZlZWJBV7Nozd1FAAHEhMsATjVDARlzBwcuIJ0TLZ/DysCgwvD7nwIyfvro47O44pP1AAGE0xABz/gEHyEGBQGv+IQoN+lohl//GFDwzz8Pchsv5YLUAgQQC06v+CXEy7EzMFhrCRUIcjD/Z/jxB0V+2fb7y9bteXwOxAYIIKyG8NgEGuTMWS8ACq4ymdPiQAM4kOW//fjLsPHgl40LNkurMTIyMQAEECNvzvxGXmkFOWluBgYWXgEBDhUDAyagJ6NlGBS+3znBEMcyg4HnzytcDn7Qt/ZxP0AAMYJiR7JmQ394cECAiTCDAiNQhhFMMDBITxNisNdkw2lA2YrP5V1bv64CCCBGWBRz+RYGOJX19/tLMyhwsoDNYPj+8Q1cB+uZqQzx/6bADShe+aW4d9f3dSAOQAAxIqcTVkVDAa2e/ft1uL4bMLKwMjAyMTP8//+P4f+fPww1tz1+aDI/BIXNg9xV33InH/ixBaYPIIBQAvb3/fMfBGY++fLo+ycGRlY2BkZmoPS/vwwmDxYyCEl/ZmD4+/dB+qrv6TOP/dqFrA8ggFDSCYu2o8L/v/8Z/v7+A8R/Gf6y8TL8AdLdAmsY/v/6y+CzmLUG3QAQAAggFJcwG/oH/Hn/2oaRi2/Pv9cPH/2andEca8a35o8Kp7LlsyKBZ5pfRLGFMEAAMYDCBIbZuu/vZ++6vZvFvSAAxFcRZGD5Vsm6VdfKuoK9+85etp77+5HVwzBAAKFwmEr3z0fmz/dmagzXZLSA8ZnLUOVhGCCAGLAJwnCgKoMRPnkYBggwAB7mUT+/Zgm1AAAAAElFTkSuQmCC',
	Iced: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADqklEQVR42n2Ta2xTZRjH3/f0nNP2nLOWsq7rZa5sa0fZunZZN5GNKChu3IIEEyNM5QsaSVBH1KAQDXgLX7yERBYJEjMj6Lwsi9FNccwbDq24K3bdupWVsWE7Dyvtzjk9l/e1IfGDmPD/9P/wf578kuf5Q3AblW7aSyR62tHtMvBfs2zrIVjkb1oTcFnvddu4aoeF9SzjKEdW0YCcUzIYIwEDkAYEFRMEebD74nTPyCstl28uqDny07YqO3M0VG71SoggBZ7XGJOJSMs6iCgCeG00LuZIZAA4I2OUjqfE6+3fTi7wovouDLx2/v67Vlo/u5rMkKSqASDlMCUJFMsYCQOBcKnXkfWWWCiXmV4Ymc2kT3w9RhggKKqvdoLfk7nvYd2xP061BJyPUZKIBsOT2o3FLIxHZnCR2aDzldtVf1PNAkPB3GhsIdM3mLDkvYkjRX2Zz0NEee0wXP32r8f33Od5ggIIn/tmLBsen2dZPQlMJEChymLgrSpJv9cb+Ws6nrQ3hCpNqZk4tlkNOtbmghcS1zfD1W/82Na23f+mtCTjL/vG8aXJeWxmaejgIM4TKJ47lqNjp/vJ8emU1rguSPl9bnJkKolkmoOxqalGuPalT5tbNzf1XEtllDwmLS3lcIHEKzablajy2pAMoNj53SgzNBqTdFCBz7S1sh+cjaqcmdPJitwM17/8yT11gWD/n9F5XFtTAilVBV4LqQqSBravWQExxOjp9h/UcHQO+ioc5INb7iSPfPibuKrETGMduQ/uODX8pIOljquSDNYHnUBczCof916SAm4L9fyukN5IU6j5YOfSaPQKqPCWGZ7bu5H+qn9CczFAJozMR3B3Z/T0znr7Qw6OJoYTaaQqGIRjPDAzJG7xW1Q7R+OdR3ulsdg1xVNZRr6w526LXhSxmuefvSF3wWe7Jzr2rVvxiJWjQCQp4p9jvPBLZC7V4ncW6pGScxeyxte7ItrlOV59aneTye0wkXYdAoSGQMf5Ky/Cje8MbHnr0dpu1kATEELAUhDE53m+2rXcIuc0VUNYuzCbIQssBSQvyCAeS4JVdgYMzwl97V+c23bzlR9+f7h1R8hx2F5oLKVIQmdi9ASFEc6fG3B6gugaSoE4L2Kck4EoqtGB2N/7zx5Y2/ufMjkfOKgvr6mtrlrpa2istO4KlprrixgK0bSOOXRmCOL8eFYlTg6ELx6YOfm48L823qq6/R3uDY0NmyqK2eDVRSnRE574PPzq1olbc/8A2rymL02d5P0AAAAASUVORK5CYII=',
	Killed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAD/UlEQVR42mJkwAMS5NWZFjy8+Q+fGoAAYoQxmjg4GQMY/1sKWho5cSgoa3PIyKgw8wlJ/vv4meHP75+f//77/43x//+PbAz/7/z+8fX886XLt2u9+/AAIIDABtwSF/Xj0dbs4DW3VGX59o3l7d8ff/nYOZnY379lZP72l+G/jsF/Bmnpf/+42D7/+/n3459b19+/6ut48/7X76kAAQBBAL7/Ad4WFUUTNzus9uXgBPsKBQD4BwH/8w8JBQgLCwL8Cgr/GBEf9A0lKQUBISHs+8zK8eCWjgL+DAkVFTI6AAK8wsACAEEAvv8B6BYfnhdMTF70BwD+3tvL/fT28QHO8PP/EhMLAxskJPwuGCzs/wsM+fHVzfPqu7YR/wwMDvMKEAciGSICB9HQgAIAQQC+/wHWJC6WKGVlZv0HBv/YyrD05c3NC/4OEgAKDwT+ETQ5ABoYJ/HklIzp4O7oGC4jLA7e8+3/BRAZAx0FCAHyw8dKAgBBAL7/AWJrl3CbLQmN+vfx/+C7qv/i29r/CwwKAf4cHP8UJiv7DyMo/siRiATa6+r9QhsnBRctMwT0zsj+EPX3AdLm5zoCAEEAvv8BuSouRj1cW7f26OP78dXNBvn9+P/oGBT7ExUWAhIkLv4D9vn32qqiCtHf3Pj+/gABYVtrC+KelfwPBQkD+vj6RgIAQQC+/wG6LzE/MzEsv+vc0/8XKTQB+wsHAPsvLvwA9vIAFlNbAf/9//7SZlz87MjFAQwsNgQ6TFQE1nxw9w0oKwYF/P5sAgBBAL7/Aew3OmgAHhqW+gH9ABBFTQDx/ff74a2d+AwwMgUlc4MHBQsK/p5LUvX5z70AIhoiCEhvfQbhs6T9+yEh+gz9/6UCAEEAvv8B8kVKpgtnaVYCHRoC9czL/v/9+QD5x8EAAQ8R/wZOVPwCHBr/uFta+Ofg1fsyDxMEOXSEEfQLAv/7//36/t7frwIAQQC+/wHvXV+iEH1+XAAZGQAAztD/9by89u++uusNUlIT+QwK+QkiIAnRiYz9A9bL/DZmeA4DKy8E/BkUAPwC/wDkoKF5AojxkYGut8z85RsZBfiZGJiYGBh4uBm+3rj5jttIX/D/z29//v8Fgr0HWVhFJVkYXrxi+HDnAgOLvgHDv1Mn94ZcZfQDCCBwUn7laBfNEZfSwC0hLcfIxs7MKCrCxMDM+J9BXJSBgY+P6cfC+Qx/b93+/4P5PzBf/Li57gVbYdbS3h0gvQABBM9MUv5V7GpaOtrhPL9NA0X+Ronq6ZgwSoj+Y+Tk5rpUVs74lY3z55c/THPaP/CW79/Q/g2mDyCAGHFlU6PCRfIN4j899fj+69/7wvCo/LPU2tPNPrfQ1QEEGADHlqBOy+nxvAAAAABJRU5ErkJggg==',
	fb_icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXZwQWcAAAAQAAAAEABcxq3DAAABUUlEQVQ4y52TMS8EURSFv4nR2LEYWsUWej+ATtBpSDQSUSgldEKHQoOWQpQqiXI1IvsHlBKdgkSxiQ22eO+ep5jM2mWHZG81Jznn5Jz77kQhBOaWdwI9TPXyIIpmlrbD5PRsL3ruazfEAObEW/29kGhmND8/WjgZLDOUJshELBPOhDcVGgwnfWyuzpMOlwDYPaniTJhEbBLmDTMrNFhbnGqJ80TmDUnEUp6g2CAXH1/c8fzaAOhM4Jzw/neFz49GB354fAJgoFTGOSEFYilgpq4VTg9WuuKNvSvMlFVwzuOc4X1xhZ/jveGcYabsGb1Z1x2s714CcLa/3IFzzY8d/J+gneOcvu+gKMEvgzZOK8FoWmKiMkKj3v+vQWV8rPVdThOaL4PZDmQB/XGJ+bRzZIGgQByUiZOhUqHw8PwWoIMjy+4gCiEwvbDV0+9cuz6KvgDVmeooGa+dswAAACV0RVh0Y3JlYXRlLWRhdGUAMjAxMC0wNC0xM1QxOTo0NjoyMCswMDowMLs82X8AAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMy8wOeispIwAAAAldEVYdG1vZGlmeS1kYXRlADIwMTAtMDQtMTNUMTk6NDY6MjArMDA6MDDkja9LAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAAal6VFh0WE1MOmNvbS5hZG9iZS54bXAAAHja1VLLitswFN3nKy7qtrYezozHwvZQEkIppAyTQEt3siV7TKIHsgZr8vVd5NFMKF0UuuhZXs7j3sMtH6MT7U4FaFQ/mAoBAIJBVujb3Zqs3UK9DJ8PXm0OX7ftYdcWEj3WszLyqJ1WQUDUezPyWCEhbaO4GblWQWAEkUftwq5Cn6RtFHxfP8HCegXzlCYtyeYwv09Zzor8/iNsRIAvwgDLgRGSA2OcUj6ncAKqZwBQetnx5+XqlOllV6GXEBzHeJqmdMpS63tMi6LAhGHGEi+7ZHwzQcTEjB+OJmefpRpbP7gwWANedlw09jVUCM3gCqfjhLsEmTEV0jYqba3GUThMU4IvzgBQRuH4wisRrN9au6+P568GrybrdyMsNlmJb0m/06ulCKpmhBQJyRKWb+kdZw88oz+u9EfSjXxt5dC9XcmLhDxsWcZpxslZfkU694JvivnbwmR76cu9+n1qfY9li9VeaWXCiGlK33cmW95Zr0WoBy16hZ3pS/xr+Mf9jtPn5aqelfjyl/W7tf4V/vuQn8/A+zhjKi18AAAAAElFTkSuQmCC',
	BGJICZCI: 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/crafters_choice/hellish_hydraulics/popup_bg.jpg',
	Exit: 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/iced.png'
},
Running:{
	Paused: false
},
BankInfo: {
	cash_in_hand: 0
},
Switches: {
	BankBackToEnergy: false,
	BankBackToStamina: false
},
SpeedCFG: {
	healInterval: 0,
	startkilling: 0
},
updateStats:function(multipler, stats_div){
	var stat_count = parseInt($('#'+stats_div).text());
	nmult = parseInt(multipler);
	stat_count = (stat_count + nmult);
	$('#'+stats_div).text(stat_count);
},
Check:{
	tthInt: 0,
	MLInt: 0,
	StaminaTotals: 0,
	PowerAttackCost: 0,
	LevelsDone: 0,
	EnergyStamina: 0,
	CurrentEnergyRatio: 0,
	CurrentStamRatio: 0,
	CombinedRatios:0,
	CurrentHealth: 0,
	JobsDone: 0,
	FobsDone: 0,
	BoardsCleared: 0,
	AmRobbing: false,
	AmAwake: false,
	GiveMeAPause: 0,
	BanditsBroski: 0,
	Started: TimeStampMe(),
	Finished: TimeStampOut(),
	ActiveCity: getCurrCity(),
	tmpvaz: 0,
	Morethan: false,
	livelinks: new Array(),
	livelinkindex: 0
}, 
Fighterx: {
	user_list: [],
	user_names: [],
	umwavoidlist: new Array(),
	FLInterval: 0,
	AttackInterval: 0,
	FightWatchDogTimout: 0,
	FightActionRunning: false,
	targetid: 0,
	ajax: false,
	closing: false,
	xw_user: User.id,
	newfighton: false,
	target_name: 0,
	tth: 0
},
StoreThis: {
	Bursts: 2,
	BurstsOn: true,
	FightCity: 0,
	RobCity: 0,
	RobSquads: 0,
	Restart: 0,
	UseWhatFirst: 0, 
	RobbingSlotSpeed: 0, 
	RobbingPageRefresh: 4, 
	RepeatJobSpeed: 1,
	PageRefresh: 5, 
	AttackSpeed: 2, 
	RestartIn: 3, 
	Health: 500,
	Spending: 0, 
	WhoToKill: unescape('1111073894\n100000465673474').replace(/,/g, '\n'),
	opponentLevelMax: 35000,
	opponentMafiaMax: 501,
	NormalUntillValue: 5000,
	RatioingJobValue: 2.3,
	NormalStamUntillValue: 5000,
	RatioingStamValue: 2.3,
	PrimaryEnergyJobInfo: 1,
	SecondryEnergyJobInfo: 1,
	PrimaryStaminaJobInfo: 1,
	SecondryStaminaJobInfo: 1,
	StaminaCheck: 0,
	JobberCheck: 0,
	LevelMeUpOi: false,
	ABank: false,
	BanditGamblerXP: false,
	BanditGamblerCSH: false,
	BanditElapsedTimerXP: 4,
	BanditElapsedTimerCash: 4,
	BanditCSHCheck: 0,
	BanditXPCheck: 0,
	lolzatcash: false,
	xp: true,
	csh: true,
	jb: true,
	AutopostingCrew: false,
	AmLearning: true,
	hazseen: false,
	isAutoRun: false,
	hopperid: 'yWVqXQshpKWcehRX',
	JobBursts: false,
	JobBurstsCount: 0,
	StamBursts: false,
	StamBurstsCount: 0,
	DXSkillSelector: 0,
	DXSkillIsTrue: false,
	SkillSimple: false,
	SkillAllocate: false,
	MasterAttV: 0,
	MasterDefV: 0,
	MasterHeaV: 0,
	MasterNRGV: 0,
	MasterStaV: 0,
	isNew: 0,
	PostLevelUp: 1,
	PostToGroupWithID: '',
	CommentToPostWithID: '',
	RemoveLevelUpPost: false,
	PostOnItem: 0,
	PauseOnItem: 0,
	PauseOnLevel: 'never',
	Tinyurl: '',
	LoadArenaPage: false,
	fake: 0
}	
};

var DroneXJobMap = new Array(
		{name: "New York"},
		{name: "Fight a Haitian Gang [1.60]", button: 17, city: 1, cost: 5, tab: 3, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 8},
		{name: "Repel the Yakuza [1.81]", button: 29, city: 1, cost: 11, tab: 5, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 20},
		{name: "Muscle in on a Triad Operation [1.95]", button: 65, city: 1, cost: 40, tab: 8, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 78},
		{name: "Settle a Beef... Permanently  [1.9167]", button: 69, city: 1, cost: 36, tab: 9, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 69},
		{name: "Make Arrangements for a Visiting Don [1.9167]", button: 74, city: 1, cost: 36, tab: 9, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 69},
		{name: "Travel to the Old Country [1.9565]", button: 76, city: 1, cost: 46, tab: 9, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 90},
		{name: "Vegas"},
		{name: "Move The Take Out Of Town [1.96]", button: 40, city: 5, cost: 108, tab: 5, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 212},
		{name: "Stash The Take [1.99]", button: 44, city: 5, cost: 165, tab: 5, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 328},
		{name: "Rescue A Hotelier [1.97]", button: 50, city: 5, cost: 86, tab: 5, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 169},
		{name: "Nab A High Tech Prototype [2.03]", button: 68, city: 5, cost: 158, tab: 7, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 321},
		{name: "Dig Up Links To Halloran And A Meth Ring  [2.07]", button: 73, city: 5, cost: 165, tab: 8, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 342},
		{name: "Verify Halloran's Arrival At The Dam [2.03]", button: 77, city: 5, cost: 158, tab: 8, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 321},
		{name: "Brazil"},
		{name: "Run a Collection Plate Con [1.38]", button: 9, city: 7, cost: 82, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 113},
		{name: "Assassinate a Politician at a Museum Gala [1.47]", button: 11, city: 7, cost: 115, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 169},
		{name: "Give Chase to the Neo-Imperium [1.98]", button: 59, city: 7, cost: 756, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1500},
		{name: "Bribe a Taubate Prison Worker [2.22]", button: 87, city: 7, cost: 648, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1430},
		{name: "Assassinate the Neo-Imperium's Primary Heads [2.19]", button: 95, city: 7, cost: 810, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1770},
		{name: "Chicago"},
		{name: "Secure Hooch to Sell in Your Joint [2.14]", button: 10, city: 8, cost: 324, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 692},
		{name: "Case Warehouses on North Side [2.13]", button: 12, city: 8, cost: 378, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 807},
		{name: "Flee the Scene Before the Police Arrive [1.96]", button: 48, city: 8, cost: 1350, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
		{name: "London Districts 3-8"},
		{name: "Approach The Police With Leads [2.05]", button: 19, city: 9, cost: 702, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
		{name: "Run The Racket [1.98]", button: 32, city: 9, cost: 1134, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2240},
		{name: "Pay Off Your Debts [1.99]", button: 38, city: 9, cost: 1180, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2360},
		{name: "Run Your Empire [2.24]", button: 39, city: 9, cost: 1080, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2420},
		{name: "Ambush The Convoy Transporting The Gang Boss [2.09]", button: 43, city: 9, cost: 1240, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2590},
		{name: "Forge The Reports [2.18]", button: 45, city: 9, cost: 1350, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2930},
		{name: "Chase Down Your Son's Kidnappers [2.23]", button: 52, city: 9, cost: 1188, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
		{name: "Sneak Into The Manor [2.19]", button: 53, city: 9, cost: 1026, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2240},
		{name: "Retire To The Isle Of Wight [2.23]", button: 56, city: 9, cost: 1240, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2760},
		{name: "Investigate The Trail Of The Puzzle Box [2.25]", button: 58, city: 9, cost: 972, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2180},
		{name: "Steal The Puzzle Box [2.13]", button: 61, city: 9, cost: 1240, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
		{name: "Fight Off The Police [2.28]", button: 62, city: 9, cost: 1188, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2700},
		{name: "London District 9"},
		{name: "Set Up A Drug Racket From Your Kebab Shop (2.19)", button: 65, city: 9, cost: 972, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2132},
		{name: "Expand The Business With Turkish Smugglers' Help (2.19)", button: 66, city: 9, cost: 1026, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2247},
		{name: "Reap The Benefits (2.23)", button: 67, city: 9, cost: 1242, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2765},
		{name: "Suspect Foul Play (2.19)", button: 68, city: 9, cost: 1080, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2362},
		{name: "Silence Your Disloyal Associates (2.13)", button: 69, city: 9, cost: 1242, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
		{name: "Pretend To Be A Survivor (2.13)", button: 70, city: 9, cost: 1188, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2535},
		{name: "Get Compensation From Insurance Company (2.05)", button: 71, city: 9, cost: 1350, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2765},
		{name: "Open Various Branches Across London But Beware (2.05)", button: 72, city: 9, cost: 1404, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2880},
		{name: "London District 10"},
		{name: "Queue Up At The Grande Stadium For The Game (2.13)", button: 73, city: 9, cost: 972, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2132},
		{name: "Enjoy The Game At Rival Team's Cost (2.25)", button: 74, city: 9, cost: 972, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2247},
		{name: "Go To A Pub To Celebrate Your Team's Win (2.23)", button: 75, city: 9, cost: 1188, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2765},
		{name: "Poke Your Team's Victory In Rival Fans' Faces (2.23)", button: 76, city: 9, cost: 1242, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2362},
		{name: "Defend Yourself From The Rival's Fans (2.23)", button: 77, city: 9, cost: 1188, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
		{name: "Make A Run For It And Hide (2.19)", button: 78, city: 9, cost: 1080, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2535},
		{name: "Speak To Your Uncle With Connections (2.22)", button: 79, city: 9, cost: 1296, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2765},
		{name: "Make The Club Pay For Their Disrespect (2.23)", button: 80, city: 9, cost: 1242, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2880},
{name: "South Africa \"Cape Town\""},
{name: "Help Out At The Shipwreck (1.75)", button: 1, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 13740},
{name: "Steal The Cargo Of Diamonds (1.95)", button: 2, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 15512},
{name: "Hunt For The Highest Bidder (1.98)", button: 3, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 15512},
{name: "Rally The Union To Join Your Operation (1.99)", button: 4, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 15623},
{name: "Hide Your Shipment (2.02)", button: 5, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 22160},
{name: "Discover A Rat In Your Operation (2.02)", button: 6, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 22160},
{name: "Hire The Mafia As Muscle (2.05)", button: 7, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 28808},
{name: "Protect Your Shipment Into International Waters (2.13)", button: 8, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 19944},
{name: "Join Forces With The Mafia (2.13)", button: 9, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 26592},
{name: "Set Up A Diamond Smuggling Racket (2.24)", button: 10, city: 10, cost: 100, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 24487},

{name: "South Africa \"The Limpopo River\""},
{name: "Steal A Diamond At Work (1.82)", button: 11, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 19944},
{name: "Defend Yourself Against The Supervisors (1.95)", button: 12, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 24376},
{name: "Distract The Guards (2.02)", button: 13, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 22160},
{name: "Loot The Safe Of Diamonds (1.89)", button: 14, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 26592},
{name: "Locate The Militia By The River (1.89)", button: 15, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 28808},
{name: "Trade Diamonds For High-Grade Weapons (2.1)", button: 16, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 33240},
{name: "Incite The Miners to Riot (2.13)", button: 17, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 33240},
{name: "Wage War Against The Mining Corporation (2.09)", button: 18, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 29362},
{name: "Establish Yourself As A Rebel Leader (2.19)", button: 19, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 37672},
{name: "Distribute The Spoils Of War (2.27)", button: 20, city: 10, cost: 100, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 35456},
 
{name: "South Africa \"Bloemfontein\""},
{name: "Accept The Job For A Top-Secret Mission (1.89)", button: 21, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 17728},
{name: "Reach The Medical Facility Without Being Noticed (2.13)", button: 22, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 19944},
{name: "Dodge All High Security Elements (2.02)", button: 23, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 22160},
{name: "Gain Access To The Disease Containment Chamber (2.13)", button: 24, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 19944},
{name: "Eliminate An Unexpected Roadblock (2.02)", button: 25, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 22160},
{name: "Open The Virus Vault With Protective Gear (2.23)", button: 26, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 24376},
{name: "Take What You Came For (2.13)", button: 27, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 26592},
{name: "Flee The Scene Without Leaving A Trail (2.2)", button: 28, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 31024},
{name: "Be At The Right Place At The Right Time (2.18)", button: 29, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 33240},
{name: "Sell The Virus To The Highest Bidder (2.29)", button: 30, city: 10, cost: 100, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 32287},
{name: "South Africa \"Kimberley\""},
{name: "Spy On The Witch Doctor (1.786)", button: 31, city: 10, cost: 6336, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 11313},
{name: "Discover The Secret Location Of The Herbs (1.877)", button: 32, city: 10, cost: 5544, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 10404},
{name: "Fake An Injury And Seek Doctor's Aid (1.913)", button: 33, city: 10, cost: 7128, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 13636},
{name: "Offer A Contract To The Witch Doctor (1.9)", button: 34, city: 10, cost: 6732, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 12788},
{name: "Threaten The Doctor To Part With His \"Herbal Meds\" (2.127)", button: 35, city: 10, cost: 8910, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 18949},
{name: "Gather A Mob To Force Doctor To Agree (1.99)", button: 36, city: 10, cost: 7920, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 15757},
{name: "Set Doctor's House On Fire As A Warning (2.225)", button: 37, city: 10, cost: 9551, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 21252},
{name: "Discover That The Doctor Has Escaped (2.162)", button: 38, city: 10, cost: 9979, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 21575},
{name: "Launch A Manhunt For Doctor (2.254)", button: 39, city: 10, cost: 10692, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 24100},
{name: "Ensure That The Doctor Is In The Boss' Clutches (2.294)", button: 40, city: 10, cost: 11404, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 26161},

{name: "South Africa \"Durban\""},
{name: "Acquire Car Parts From Local Hoodlums (1.71)", button: 41, city: 10, cost: 1814, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 3102},
{name: "Offer Your Expertise For Their Business (1.783)", button: 42, city: 10, cost: 1728, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 3081},
{name: "Go Through A Series Of Tests To Prove Yourself (1.819)", button: 43, city: 10, cost: 2160, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 3930},
{name: "Get Recruited For A Lucrative Project (2.035)", button: 44, city: 10, cost: 2235, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 4548},
{name: "Proceed To Dealer's Warehouse (1.869)", button: 45, city: 10, cost: 2052, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 3836},
{name: "Discover A Special Package In The Car (2.103)", button: 46, city: 10, cost: 2332, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 4904},
{name: "Notice That You Are Being Followed (2.136)", button: 47, city: 10, cost: 2527, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 5397},
{name: "Lose Them On The Highway (2.129)", button: 48, city: 10, cost: 2643, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 5627},
{name: "Bury Your Treasure In A Nearby Field (2.147)", button: 49, city: 10, cost: 2916, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 6261},
{name: "Finish Your Car-Jacking Job As Planned (2.189)", button: 50, city: 10, cost: 3207, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 7021},

{name: "South Africa \"Mthatha\""},
{name: "Assign Your Protege To An Undercover Operation (1.759)", button: 51, city: 10, cost: 2073, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 3647},
{name: "Crack Down On Narcotics Rings In The Slums (1.795)", button: 52, city: 10, cost: 1944, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 3490},
{name: "Bring Your Protege In On Your Operation (2.049)", button: 53, city: 10, cost: 2041, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 4181},
{name: "Stage A Break In Into The Evidence Room (1.856)", button: 54, city: 10, cost: 2160, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 4008},
{name: "Find Prospective Buyers In The Mafia (2.089)", button: 55, city: 10, cost: 2235, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 4669},
{name: "Resell Snow Candy To The Mafia (2.117)", button: 56, city: 10, cost: 2332, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 4936},
{name: "Run A Substance Raid In The Slums (2.131)", button: 57, city: 10, cost: 2624, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 5591},
{name: "Fake The Arrest Of Your Protege (2.13)", button: 58, city: 10, cost: 2721, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 5795},
{name: "Shift To Another Precinct In The City (2.156)", button: 59, city: 10, cost: 2916, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 6287},
{name: "Get Cure For Disease With Your Profits (2.194)", button: 60, city: 10, cost: 3265, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 7162}
		/*				{name: "Secret District \"It Takes Talent\""},
		{name: "Support Your Friend's Son In A National Talent Show (1.91)", button: 996, city: 9, cost: 2122, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 4044},
		{name: "Learn That There Is A Lot Of Money Involved (1.89)", button: 997, city: 9, cost: 500, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 500},
		{name: "Approach The Bookies With New Prospects (1.91)", button: 998, city: 9, cost: 500, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 500},
		{name: "Buy The Judges Votes (1.87)", button: 999, city: 9, cost: 500, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 500},
		{name: "Have Your Associate Help With The Show's Production (2.2)", button: 1020, city: 9, cost: 500, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 500},
		{name: "Eliminate The Boy's Toughest Competition (2.13)", button: 1021, city: 9, cost: 500, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 500},
		{name: "Ensure That He Has A Place In The Finals (2.07)", button: 1022, city: 9, cost: 500, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 500},
		{name: "Rig The Results To Have A Guaranteed Win (2.25)", button: 1023, city: 9, cost: 500, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 500},
		{name: "Travel To The Next Country Where The Stakes Are Higher (2.19)", button: 1024, city: 9, cost: 500, tab: 131, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 500},
{name: "Secret District \"NightCap\""},
		{name: "Accept New Job Assigned To You [2.02]", button: 882, city: 8, cost: 486, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 980},
		{name: "Head To The Specified Location [2.03]", button: 883, city: 8, cost: 540, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1320},
		{name: "Look For Disloyal Associate [2.23]", button: 884, city: 8, cost: 594, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
		{name: "Join Him To Avoid Any Suspicion [2.22]", button: 885, city: 8, cost: 648, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1550},
		{name: "Get Distracted [2.06]", button: 886, city: 8, cost: 756, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1320},
		{name: "Realize Your Associate Has Slipped Away [1.97]", button: 887, city: 8, cost: 702, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
		{name: "Get Ready To Finish The Job[2.22]", button: 888, city: 8, cost: 648, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1670},
		{name: "Be Lured Into Backroom [2.33]", button: 889, city: 8, cost: 864, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2010},
		{name: "Become The Target Of Your Associates Assigned Job [2.19]", button: 890, city: 8, cost: 972, tab: 120, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2130}
		{name: "Secret District \"Exotic Charm\""},
{name: "Strike A Smuggling Deal With A Zookeeper (1.96)", button: 987, city: 7, cost: 648, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1268},
{name: "Gain Access To Exotic Animal Files (2.13)", button: 988, city: 7, cost: 594, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1268},
{name: "Create A Demand And Ensure Supply (1.73)", button: 989, city: 7, cost: 864, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1498},
{name: "Pick Up The Latest Package (2.13)", button: 990, city: 7, cost: 648, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1383},
{name: "Find That You Have Been Cheated (2.13)", button: 991, city: 7, cost: 756, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1613},
{name: "Make Use Of Your Deadly Reptile Collection (1.84)", button: 992, city: 7, cost: 972, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1786},
{name: "Bribe A Delivery Boy (2.04)", button: 993, city: 7, cost: 1296, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
{name: "Fake A Special Delivery (2.3)", button: 994, city: 7, cost: 1026, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2362},
{name: "Collect More Than Just Your Share (2.07)", button: 995, city: 7, cost: 972, tab: 130, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2016},
		{name: "Secret District \"Case Dismissed\""},
		{name: "Attend Government Official's Hearing (2.13)", button: 969, city: 9, cost: 540, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1152},
		{name: "Learn That He Is Worth More Than You Were Told (1.94)", button: 970, city: 9, cost: 594, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1152},
		{name: "Make A Deal With Plaintiff's Lawyer (2.06)", button: 971, city: 9, cost: 756, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1556},
		{name: "Offer The Official A Chance To Be Free (2.05)", button: 972, city: 9, cost: 702, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
		{name: "Use Your Inside Cop To Convey Your Conditions (2.31)", button: 973, city: 9, cost: 648, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1498},
		{name: "Receive Confirmation That Your Conditions Were Met (2.23)", button: 974, city: 9, cost: 594, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1325},
		{name: "Give The Signal To The Plaintiff's Lawyer (1.93)", button: 975, city: 9, cost: 864, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1671},
		{name: "Ensure Official Gets His Money's Worth (2.25)", button: 976, city: 9, cost: 972, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2189},
		{name: "Leave With Official's End Of The Bargain (2.19)", button: 977, city: 9, cost: 1026, tab: 128, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2247},
{name: "Secret District \"Pay-To-Play\" \"That\'s A Wrap\""},
{name: "Offer Your Movie Script To The Boss (2.37)", button: 873, city: 9, cost: 486, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1152},
{name: "Procure Boss's Investment (2.23)", button: 874, city: 9, cost: 594, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1325},
{name: "Start Production (2.22)", button: 875, city: 9, cost: 648, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
{name: "Refuse Boss's Demand To Change Your Script (2.06)", button: 876, city: 9, cost: 756, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1556},
{name: "Plot Your Escape (2.23)", button: 877, city: 9, cost: 594, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1325},
{name: "Knock Out The Boss With A Prop (2.05)", button: 878, city: 9, cost: 702, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
{name: "Take Him For What He's Worth (2.21)", button: 879, city: 9, cost: 756, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1671},
{name: "Do Away With The Boss's Body (2.33)", button: 880, city: 9, cost: 864, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2016},
{name: "Tweak The Script For A Better Ending (2.19)", button: 881, city: 9, cost: 972, tab: 119, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2132}	
{name: "Secret District \"Banking Turns\""},
		{name: "Call Upon The Best Guys In Town For Your New 'Mission' (2.13)", button: 978, city: 8, cost: 648, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1383},
{name: "Make Arrangements To Carry Out The Finest Bank Robbery (1.98)", button: 979, city: 8, cost: 756, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1498},
{name: "Eliminate All Obstacles Before Making An Entrance (2.06)", button: 980, city: 8, cost: 810, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1671},
{name: "Set Up Explosives Along The Walls Of The Bank (2.13)", button: 981, city: 8, cost: 648, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1383},
{name: "Threaten Bankers With A Radio Controlled Bomb (2.37)", button: 982, city: 8, cost: 972, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2304},
{name: "Run Out Of The Bank With The Stolen Money (2.2)", button: 983, city: 8, cost: 810, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1786},
{name: "Realize That You Have Been Double-Crossed (2.07)", button: 984, city: 8, cost: 864, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1786},
{name: "Make A Run For It With Your Share (2.43)", button: 985, city: 8, cost: 972, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2362},
{name: "Show Your Partners Who's Got The Last Laugh (2.34)", button: 986, city: 8, cost: 1134, tab: 129, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
		{name: "Secret District \"Pay-To-Play\" \"The Decaffeination\""},
{name: "Make Deal With The Plantation Owner [2.03]", button: 864, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1099},
{name: "Start Seasoned Coffee Operation [2.23]", button: 865, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1329},
{name: "Muscle Out Your Competition [1.90]", button: 866, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1329},
{name: "Begin Smuggling The Goods [1.90]", button: 867, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1449},
{name: "Defend Truck From Kingpin Highwaymen [2.22]", button: 868, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1449},
{name: "Eliminate Highwaymen [1.73]", button: 869, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1389},
{name: "Get Offer For Buyout From Caffeine Kingpin [2.31]", button: 870, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1449},
{name: "Offer HIM A Buyout And Promise Protection [2.19]", button: 871, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2139},
{name: "Force Him To Entrust His Property To You [2.19]", button: 872, city: 7, cost: 1026, tab: 118, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2249}	

		{name: "Secret District \"Rock In Rio\""},
		{name: "Sneak Into The Carnival Dressing Room (1.96)", button: 960, city: 7, cost: 648, tab: 127, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1269}, 
		{name: "Take Out A Carnival Participant (2.13)", button: 961, city: 7, cost: 594, tab: 127, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1269}, 
		{name: "Fill In Her Position At The Carnival (1.90)", button: 962,city: 7,cost: 756,tab: 127,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1449}, 
		{name: "Locate Esmeralda's Float (2.23)", button: 963,city: 7,cost: 594,tab: 127,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1329}, 
		{name: "Dance Your Way Towards The Float (1.83)", button: 964,city: 7,cost: 756,tab: 127,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1389}, 
		{name: "Enter The Float As Part Of The Act (1.80)", button: 965,city: 7,cost: 864,tab: 127,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1559}, 
		{name: "Claim The Cinco-Diamante To Be Yours (1.93)", button: 966,city: 7,cost: 864,tab: 127,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1679}, 
		{name: "Leave Esmeralda De Maxixe Defenseless (2.19)", button: 967,city: 7,cost: 1029,tab: 127,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2249}, 
		{name: "Enjoy The Parade 200 Carats Richer (2.19)", button: 968,city: 7,cost: 972,tab: 127,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2139},	
		{name: "Secret District \"Pay-To-Play\" \"Slaughterhouse\""},
		{name: "Break Into The Longhorn Stockades (2.13)", button: 855, city: 8, cost: 486, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1037},
		{name: "Take Care Of Cattle Ranchers (2.13)", button: 856, city: 8, cost: 540, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1152},
		{name: "Create A Distraction To Enter The Slaughterhouse (2.23)", button: 857, city: 8, cost: 594, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1325},
		{name: "Meet With The Boss Of The Slaughterhouse (2.22)", button: 858, city: 8, cost: 648, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
		{name: "Suggest A Partnership With The Boss (2.23)", button: 859, city: 8, cost: 594, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1325},
		{name: "Slaughter The Bossman Upon His Refusal (2.13)", button: 860, city: 8, cost: 648, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1383},
		{name: "Prosecute Your Trespassers (2.22)", button: 861, city: 8, cost: 648, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
		{name: "Clear The Slaughterhouse Of Any Bodies (2.33)", button: 862, city: 8, cost: 864, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2016},
		{name: "Establish A New Method Of Smuggling Substances (2.19)", button: 863, city: 8, cost: 972, tab: 117, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2132}		
		{name: "Secret District \"Barbershop Quartet\""},
		{name: "Sell The Barbershop To High-Sky Brown (2.35)", button: 950, city: 8, cost: 540, tab: 126, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1269}, 
		{name: "Discover That The Shop Is Now A Gentleman's Club (2.22)", button: 951, city: 8, cost: 648, tab: 126, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1449}, 
		{name: "Fight Brown's Thugs While Trying To Enter The Shop (2.06)", button: 952,city: 8,cost: 756,tab: 126,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1559}, 
		{name: "Go To Brown's Office And Buy The Shop Back (2.04)", button: 953,city: 8,cost: 648,tab: 126,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1329}, 
		{name: "Attack Brown Upon His Refusal (1.83)", button: 954,city: 8,cost: 756,tab: 126,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1389}, 
		{name: "Escape Brown's Office Before His Bodyguard Kills You (1.93)", button: 955,city: 8,cost: 864,tab: 126,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1679}, 
		{name: "Storm Into The Gentleman's Club With Your Crew (2.07)", button: 956,city: 8,cost: 864,tab: 126,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1789}, 
		{name: "Eliminate All The Henchmen In The Joint (2.19)", button: 957,city: 8,cost: 972,tab: 126,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2139}, 
		{name: "Kill High-Sky Brown And Take Over His Adult Empire (2.08)", button: 958,city: 8,cost: 1139,tab: 126,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2369},		
		{name: "Secret District \"Pay-To-Play\" \"On Your Mark\""},
		{name: "Arrange To Sell Juice To Athletes [2.03]",button: 110,city: 9,cost: 540,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1099}, 
		{name: "Collect Your Take From Your Associate [2.25]",button: 111,city: 9,cost: 486,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1099}, 
		{name: "Follow Your Associate [2.05]",button: 112,city: 9,cost: 702,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1449}, 
		{name: "Identify The Undercover Police Officer [2.13]",button: 113,city: 9,cost: 756,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1619}, 
		{name: "Silence The Police Officer [2.23]",button: 114,city: 9,cost: 594,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1329}, 
		{name: "Take Your Goods [2.22]",button: 115,city: 9,cost: 648,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1449}, 
		{name: "Attend Your Associates Event [2.13]",button: 116,city: 9,cost: 702,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1499}, 
		{name: "Eliminate Your Associate [2.19]",button: 117,city: 9,cost: 972,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2139}, 
		{name: "Rally For The Next Sports Meet [2.08]",button: 118,city: 9,cost: 1029,tab: 102,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2139}		*/
);

var DroneXStaminaMap = new Array(
		{name: "Vegas"},
//		{name: "Run A Visiting Gang Boss Out [2.08]", button: 23, city: 5, cost: 96, tab: 3, isFobbing: true, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: false, isTheXP: 200},
		{name: "Question Some Meth Heads [2.23]", button: 72, city: 5, cost: 120, tab: 8, isFobbing: true, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: false, isTheXP: 267, isArena: false},
		{name: "Eliminate A Hill Supplier [2.26]", button: 54, city: 5, cost: 128, tab: 6, isFobbing: true, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: false, isTheXP: 289, isArena: false},
		{name: "Other"},
		{name: "Robbing", button: "0", city: 1, cost: 50, tab: 5, isFobbing: false, isRobbing: true, isFighting: false, isGroupPeople: false, isHopper: false, isArena: false},
		{name: "Fighting"},
		{name: "Fight List Fighting", button: 0, city: 1, cost: 75, tab: 1, isFobbing: false, isRobbing: false, isFighting: true, isGroupPeople: false, isHopper: false, isArena: false},
		{name: "Fight Specific Opponents", button: 0, city: 1, cost: 75, tab: 1, isFobbing: false, isRobbing: false, isFighting: false, isGroupPeople: true, isHopper: false, isArena: false},
		{name: "MWLists", button: 0, city: 1, cost: 75, tab: 1, isFobbing: false, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: true, isArena: false},
		{name: "Arena"},		
		{name: "Spartacus", button: "0", city: 1, cost: spartacusCost(), tab: 5, isFobbing: false, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: false, isArena: true}
); 

function spartacusCost(){
	try{
		var s = document.getElementById("spartacus_arenatype");
		var arenaName = s.options[s.selectedIndex].value;
		if(arenaName==="sw"){
			return 20;
		}
		else if(arenaName==="lw"){
			return 100;
		}
		else if(arenaName==="hw"){
			return 500;
		}
	}
	catch(e){}
	return 500;
}

var BUBT = 6;
var overloadskillpointblocker = 0;
var attpts = 0;
var defpts = 0;
var healthpts = 0;
var NRGpts = 0;
var Stapts = 0;
var Restarter = new Array('false','true');
var V = [];
var JBN = new Array('3','4','5','6','7','8','9','10');
var SBN = new Array('3','4','5','6','7','8','9','10');
var SpendEnergyOrStamina = new Array('energy','stamina','toe2toe','jnrg','jstam');
var WhichSkill = new Array('attack','defense','max_health','max_energy','max_stamina');
var rref = new Array('3000','4000','5000','6000','7000','8000');
var rjref = new Array('800','1000','1500','2000','2500','3000');
var plref = new Array('2000','3000','4000','5000','6000','7000','8000');
var rres = new Array('60000','300000','450000','600000','1200000');
var ris = new Array('187','250','500','750','1000','2000');
var aref = new Array('500','777','1000','1500','2000');
var fic = new Array('1','5','7','8','9','10');
var ric = new Array('1','5','7','8','9','10');
var RS = new Array('false','true');
var Bcount = new Array('1','2','3');
var HumanMinute;
var robCiti;
var restartburstJT = 2800;
var restartburstST = 2800;
var fn;
var blitz;
var bhk;
var bhhk;
var crewposted = 0;
var BBlock = 0;
var Diced = 0;
var Dkilled = 0;
var XPENA;
var XPA;
var xp2ena;
var xp2gotab;
var xp2gocity;
var xp2gobutton;
var xp2gojob;
var LondonIsNo = 0;
var ChicagoIsNo = 0;
var BrazilIsNo = 0;
var xpison = 0;
var dontmesswith = 0;
var stamuntill;
var stamratio;
var mytrigger;
var AutostartStopped = false;
var user_list_selector = 0; 
var FRS = false;
var HRS = false;
var meepvar = 0;
var jobt = 0;
var stamt = 0;
var HNY = 0;
var dah = 0;
var http = 'http://';
if (/https/.test(document.location)) {
	http = 'https://';
}
var zserver = 'facebook';
if (/facebook-ca2/.test(document.location.href)) {
   zserver = 'facebook-ca2';
}
var preurl = http+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?';
var mytimestampin = 0;
var mytimestampout = 0;
var FUUUUUUU = 0;
var ittybitty = 0;
var selectedgroupvalue;
var last_level = 0; 
var lastitem = 'Unknown levelup bonus';
var lastimg = 'http://mwfb.static.zgncdn.com/mwfb/graphics/levelUpBonus/lvlup_gold_feed.png';
var lastpost = {};
var access_token;
var link = 'http://apps.facebook.com/inthemafia/track.php?zy_track=feed&sendkey=&next_controller=index&next_action=levelUpBonusClaim&next_params=%7B%22friend_id%22%3A%22p%7C'+User.id.substr(2)+'%22%7D&ref=nf';
var should_post_level_up_on_start = false;
var content=document.getElementById('content_row');
var popup = '<div id="poop_up" style="position: absolute; z-index: auto; display:none"></div>';
var config_html = '';

var drone_html = 
	'<div class="messages" style="background: url(' + Drone.Images.BGJICZCI + ') no-repeat; background-size: 100%; border: 3px solid #a99e9e;-moz-border-radius: 10px 10px 10px 10px; border-radius: 10px 10px 10px 10px; margin:5px">'+
	'<div>' +
	'<p align="left" style="margin-top:-1px;">&nbsp;' + Drone.iLike + '</p>' +
	'<p align="right" style="margin-top:-38px; margin-right:-6px; margin-bottom:-4px;">' +
	'<a id="DroneXHome" class="sexy_button_new short gold" TARGET="_blank" href="http://www.mrsimy0.net/Mafia"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif" style="vertical-align:text-top;"><font>Drone.&#12324; ' + Drone.Version + '</font></span></span></a>' +
	'&nbsp;<a id="DroneXDonate" TARGET="_blank" href="http://www.mrsimy0.net/Mafia/donate.html" class="sexy_button_new short black"><span><span><span class="cash"></span></span></span></a>' +
	'&nbsp;<a id="killzdrone" class="sexy_button_new short green"><span><span>Running</span></span></a>' +
	'&nbsp;<a id="logclose" class="sexy_button_new short black" ><span><span><img src="'+Drone.Images.Exit+'"></span></span></a>&nbsp;' +
	'</p>' +
	'</div>' +
	'<br>'+
	'<div width="100%">' +
	'<div id="mydronestats" style="width:100%">' +
	'<div>'+
	'<div style="float:left"><span id="IRJ">Jobs Done&nbsp;:<span id="JobsDone">0</span></span><span id="IRV" style="display:none">Fobs Done&nbsp;:<span id="FobsDone">0</span></span>'+
	'<span id="IRA" style="display:none">Arenas Joined:&nbsp;<span id="ArenasJoined">0</span></span></div>'+
	'<div style="float:right">Ratios&nbsp;:<img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif"><span id="nrg_ratio_reqd">0</span>&nbsp;&nbsp;<img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"><span id="sta_ratio_reqd">0</span>&nbsp;&nbsp;<img src="' + Drone.Images.En2xp + '"><span id="comb_ratio_reqd" class="more_in">0</span></div><br>' +
	'</div>'+
	'<div style="clear:both">'+
	'<div style="float:left">In Action&nbsp;&nbsp;&nbsp;:<span id="ActiRes" class="">Some Job Here</span></div>'+
	'<div style="float:right">Fighting&nbsp;:<img src="' + Drone.Images.Iced + '" title="Iced">&nbsp;:&nbsp;<span id="icedsome">0</span>&nbsp;&nbsp;<img src="' + Drone.Images.Killed + '" title="Killed">&nbsp;:&nbsp;<span id="killedsome">0</span></div><br>' +
	'</div>'+
	'<div style="clear:both">'+
	'<div style="float:left"><span id="IRR" style="display:none">Robbing In&nbsp;:<span id="RobCiti" class="more_in">0</span>&nbsp;&nbsp;Boards Cleared&nbsp;:&nbsp;<span id="Bcleared">0</span></span></div>'+
	'<div style="float:right"><span id="SBTD" style="display:none">Bandit Timer is: <span id="SBT">0:00</span></span> Bandits Killed : <font class="more_in">0</font></div>'+
	'</div>'+
	'<div style="clear:both">'+
	'<div style="float:left"><span id="IRS" style="display:none">Time Started:&nbsp;<span id="ClockedIn">0</span> Time Finished:&nbsp;<span id="ClockedOut"></span></span></div>' +
	'<div style="float:right">Levelups&nbsp;:<span class="gold_star" title="Levelups"></span><span id="Levelscleared">0</span></div>'+
	'</div>'+
	'</div>'+
	'<div>' +
	'<table>'+
	'<tr>'+
			'<td width="63px" valign="top"><a href="#" id="loot_show">Loot</a></td>'+
            '<td width="1px" valign="top">:</td>' + 
            '<td id="loot_log" valign="top" colspan="2">Levelup Loot Log</td>'+
        '</tr>'+		
		'<tr id="iFl" style="display:none">'+
			'<td width="63px" valign="top"><a href="#" id="Flog_show">FightLog</a></td>'+
			'<td width="1px" valign="top">:</td>' + 
			'<td id="iskl" valign="top" colspan="2">Ice/Kill Log<br></td>'+
		'</tr>'+
		'<tr>'+
			'<td width="63px" valign="top">Status&nbsp;</td>'+'<td width="1px" valign="top">:</td><td colspan="2"><span id="status">Drone Loaded...</span></td>'+
		'</tr>'+
		'<tr>'+
			'<td width="63px" valign="top"><a href="#" id="log_show">Log</a> &nbsp;&nbsp;<input type="text" id="log_size" value="5" class="sexy_input" style="width:16px"></input></td>' + 
			'<td width="1px" valign="top">:</td>' + 
			'<td id="true_log" colspan="2">Drone Loaded...</td>' + 
	'</tr>'+
	'</table>'+
	'</div>'+
	'<div id="gxRDivS" style="display:none"></div>' +
	'</div>';

var loot_item=[],loot_count,loot_log,l_log='';
var loot_img;
var total_loot=0;
var posted_level_up = false;

String.prototype.untag = function() { return this.replace(/<[^>]*>/g, ''); };
Array.prototype.isAvoid = function (value) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == value) {
			return true;
		}
	}
	return false;
};


window.onbeforeunload = function(){
	if(Drone.StoreThis.RemoveLevelUpPost){
		try_delete_last_post();
	}	
};


/********************************************************************************
 * 							Create Drone Screens								*
 ********************************************************************************/


function create_div() {
	if(document.getElementById('gxDiv')) {
		document.getElementById('gxDiv').innerHTML = config_html;
	} else {
		var gxDiv=document.createElement("div");
		gxDiv.id = 'gxDiv';
		content.insertBefore(gxDiv, content.firstChild);
		document.getElementById('gxDiv').innerHTML = config_html;
	}
}

function create_runningdiv() {
	$('#gxDiv').remove();
	if(document.getElementById('gxRDiv')) {
		return;
	} else {
		var gxRDiv=document.createElement("div");
		gxRDiv.id = 'gxRDiv';
		var rdiv=document.getElementById('final_wrapper');
		rdiv.insertBefore(gxRDiv, rdiv.firstChild);
		document.getElementById('gxRDiv').innerHTML = drone_html;
		//TODO: This might add spartacus if the user used to have spartacus selected as 2nd choice but now
		//only uses one stamina option (which isn't spartacus). I can't find if a second stamina option is used in StoreThis.
		if(Drone.StoreThis.PrimaryStaminaJobInfo==10 || Drone.StoreThis.SecondryStaminaJobInfo==10){
			add_spartacus();
		}
	}
}

function add_spartacus(){
	try_remove_div_with_id('spartacus_div');
	try_remove_div_with_id('spartacus_main');
	var rdiv=document.getElementById('gxRDivS');
	var spartacus_div=document.createElement("div");
	spartacus_div.id = 'spartacus_div';
	rdiv.insertBefore(spartacus_div, rdiv.firstChild);
	document.getElementById('spartacus_div').innerHTML = spocklet_html;
	
	//TODO: find out of these functions need to be called when adding spartacus a second time. If they don't you can call them from create_runningdiv after adding spartacus.
	create_handler();
	loadStats(); // mafia att, def and inventory
	
	//Make sure restart and check stamina is set to false in Spartacus:
	document.getElementById("spartacus_restart").checked = false;
	document.getElementById("spartacus_restart_stam").checked = false;
	document.getElementById("spartacus_check_stam").checked = false;
	
	document.getElementById("spartacus_toggletable").onclick = function () {
		$('#spartacus_table').toggle();
		return false;
	};	
	document.getElementById("spartacus_togglepowerups").onclick = function () {
	    toggle_spartacus_putih();
		$('#spartacus_powerups_table').toggle();
		return false;
	};
	document.getElementById("spartacus_togglelog").onclick = function () {
		$('#spartacus_logsp').toggle();
		return false;
	};
}

function toggle_spartacus_putih(){
    spartacus_powerups_table_is_hidden = !spartacus_powerups_table_is_hidden;
}

var spartacus_powerups_table_is_hidden = false;

function try_remove_div_with_id(id){
	try{
		var elem = document.getElementById(id);
		if(elem != null){
			elem.parentNode.removeChild(elem);
		}
	}
	catch(e){}
}

JobberCheck = function(n){
	if (Drone.StoreThis.JobberCheck != n){
		Drone.StoreThis.JobberCheck = n;
		writeSettings();
	}

	switch(parseInt(n)){
	case 0:
		$('#RatioJobRow').hide();
		$('#SecondryJobRow').hide();   
		$('#NormalUntillJobRow').hide();
		Drone.JobOptions.RatioingJob = false;
		Drone.JobOptions.NormalUntillJob = false;
		break;
	case 1:
		$('#RatioJobRow').show();
		$('#SecondryJobRow').show();
		$('#NormalUntillJobRow').hide();
		Drone.JobOptions.RatioingJob = true;
		Drone.JobOptions.NormalUntillJob = false;
		break;
	case 2:
		$('#RatioJobRow').hide();
		$('#SecondryJobRow').show();          
		$('#NormalUntillJobRow').show();
		Drone.JobOptions.RatioingJob = false;
		Drone.JobOptions.NormalUntillJob = true;
		break;
	}
};

StaminaCheck = function(n){
	if (Drone.StoreThis.StaminaCheck != n){
		Drone.StoreThis.StaminaCheck = n;
		writeSettings();
	}
	switch(parseInt(n)){
	case 0:
		$('#RatioStamRow').hide();
		$('#SecondryStamRow').hide();   
		$('#NormalUntillStamRow').hide();
		Drone.JobOptions.RatioStam = false;
		Drone.JobOptions.NormStamUntil = false;
		Drone.Check.Morethan = false;
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		break;
	case 1:
		$('#RatioStamRow').show();
		$('#SecondryStamRow').show();
		$('#NormalUntillStamRow').hide();
		Drone.JobOptions.RatioStam = true;
		Drone.JobOptions.NormStamUntil = false;
		Drone.Check.Morethan = true;
		if(DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isGroupPeople||DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').show();
		}
		if(DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isHopper||DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').show();
		}
		break;
	case 2:
		$('#RatioStamRow').hide();
		$('#SecondryStamRow').show();          
		$('#NormalUntillStamRow').show();
		Drone.JobOptions.RatioStam = false;
		Drone.JobOptions.NormStamUntil = true;
		Drone.Check.Morethan = true;
		if(DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isGroupPeople||DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').show();
		}
		if(DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isHopper||DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').show();
		}
		break;
	}
};

PrimaryEnergySelector = function (n) {
	if (Drone.StoreThis.PrimaryEnergyJobInfo != n) {
		Drone.StoreThis.PrimaryEnergyJobInfo = n;
		writeSettings();
	}
	Drone.Check.tmpvaz=parseInt(n);
};

SecondryEnergySelector = function (n) {
	if (Drone.StoreThis.SecondryEnergyJobInfo != n) {
		Drone.StoreThis.SecondryEnergyJobInfo = n;
		writeSettings();
	}
	Drone.Check.tmpvaz=parseInt(n);
};

PrimaryStaminaSelector = function (n) {
	if (Drone.StoreThis.PrimaryStaminaJobInfo != n) {
		Drone.StoreThis.PrimaryStaminaJobInfo = n;
		writeSettings();
	}
	switch (parseInt(n)) {
	case 0:
		FRS = false;
		HRS = false;
		if(!Drone.Check.Morethan && !FRS){
			$('#FightingRow').hide();
		}	
		if(!Drone.Check.Morethan && !HRS){
			$('#HopperRow').hide();
		}
		Drone.Check.tmpvaz = 0;
		break;
	case 1:
		FRS = false;
		HRS = false;
		if(!Drone.Check.Morethan && !FRS){
			$('#FightingRow').hide();
		}	
		if(!Drone.Check.Morethan && !HRS){
			$('#HopperRow').hide();
		}
		Drone.Check.tmpvaz = 1;
		break;
	case 2:
		FRS = false;
		HRS = false;
		if(!Drone.Check.Morethan && !FRS){
			$('#FightingRow').hide();
		}	
		if(!Drone.Check.Morethan && !HRS){
			$('#HopperRow').hide();
		}
		Drone.Check.tmpvaz = 2;
		break;
	case 3:			
		FRS = false;
		HRS = false;
		if(!Drone.Check.Morethan && !FRS){
			$('#FightingRow').hide();
		}	
		if(!Drone.Check.Morethan && !HRS){
			$('#HopperRow').hide();
		}
		Drone.Check.tmpvaz = 3;
		break;
	case 4:
		FRS = false;
		HRS = false;
		if(!Drone.Check.Morethan && !FRS){
			$('#FightingRow').hide();
		}	
		if(!Drone.Check.Morethan && !HRS){
			$('#HopperRow').hide();
		}
		Drone.Check.tmpvaz = 4;
		break;
	case 5:
		FRS = false;
		HRS = false;
		if(!Drone.Check.Morethan && !FRS){
			$('#FightingRow').hide();
		}	
		if(!Drone.Check.Morethan && !HRS){
			$('#HopperRow').hide();
		}
		Drone.Check.tmpvaz = 5;
		break;
	case 6:
		FRS = false;
		HRS = false;
		if(!Drone.Check.Morethan && !FRS){
			$('#FightingRow').hide();
		}	
		if(!Drone.Check.Morethan && !HRS){
			$('#HopperRow').hide();
		}
		Drone.Check.tmpvaz = 6;
		break;
	case 7:
		FRS = true;
		HRS = false;
		if(!Drone.Check.Morethan && !HRS){
			$('#HopperRow').hide();
		}
		document.getElementById("FightingRow").style.display = '';
		Drone.Check.tmpvaz = 7;
		break;
	case 8:
		FRS = false;
		HRS = true;
		if(!Drone.Check.Morethan && !FRS){
			$('#FightingRow').hide();
		}
		document.getElementById("HopperRow").style.display = '';
		Drone.Check.tmpvaz = 8;	
		break;
	}
};

SecondryStaminaSelector = function (n) {
	if (Drone.StoreThis.SecondryStaminaJobInfo != n) {
		Drone.StoreThis.SecondryStaminaJobInfo = n;
		writeSettings();
	}
	switch (parseInt(n)) {
	case 0:
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		FRSs = false;
		HRSs = false;
		Drone.Check.tmpvaz = 0;
		break;
	case 1:
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		FRSs = false;
		HRSs = false;
		Drone.Check.tmpvaz = 1;
		break;
	case 2:
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		FRSs = false;
		HRSs = false;
		Drone.Check.tmpvaz = 2;
		break;
	case 3:			
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		FRSs = false;
		HRSs = false;
		Drone.Check.tmpvaz = 3;
		break;
	case 4:
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		FRSs = false;
		HRSs = false;
		Drone.Check.tmpvaz = 4;
		break;
	case 5:
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		FRSs = false;
		HRSs = false;
		Drone.Check.tmpvaz = 5;
		break;
	case 6:
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		FRSs = false;
		HRSs = false;
		Drone.Check.tmpvaz = 6;
		break;
	case 7:
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper){
			$('#HopperRow').hide();
		}
		document.getElementById("FightingRow").style.display = '';
		FRSs = true;
		HRSs = false;
		Drone.Check.tmpvaz = 7;
		break;
	case 8:
		if(!DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople){
			$('#FightingRow').hide();
		}
		document.getElementById("HopperRow").style.display = '';
		FRSs = false;
		HRSs = true;
		Drone.Check.tmpvaz = 8;			
		break;
	}
};

BanditXPCheck = function(n){
	if (Drone.StoreThis.BanditXPCheck != n){
		Drone.StoreThis.BanditXPCheck = n;
		writeSettings();
	}
	switch(parseInt(n)){
	case 0:
		Drone.StoreThis.BanditGamblerXP = false;
		Drone.StoreThis.BanditElapsedTimerXP = 4;
		break;
	case 1:
		Drone.StoreThis.BanditGamblerXP = true;
		Drone.StoreThis.BanditElapsedTimerXP = 1;
		break;
	case 2:
		Drone.StoreThis.BanditGamblerXP = true;
		Drone.StoreThis.BanditElapsedTimerXP = 2;
		break;
	case 3:
		Drone.StoreThis.BanditGamblerXP = true;
		Drone.StoreThis.BanditElapsedTimerXP = 3;
		break;
	}
};

DXSkillSelector = function (n) {
	if (Drone.StoreThis.DXSkillSelector != n) {
		Drone.StoreThis.DXSkillSelector = n;
		writeSettings();
	}

	switch (parseInt(n)) {
	case 0:
		Drone.StoreThis.DXSkillIsTrue = false;
		Drone.StoreThis.SkillSimple = false;
		Drone.StoreThis.SkillAllocate = false;
		$('#SkillPointRow').hide();
		$('#SkillPointRowAllocate').hide();
		break;
	case 1:
		Drone.StoreThis.DXSkillIsTrue = true;	
		Drone.StoreThis.SkillAllocate = false;
		Drone.StoreThis.SkillSimple = true;
		$('#SkillPointRowAllocate').hide();
		$('#SkillPointRow').show();  
		break;
	case 2:
		Drone.StoreThis.DXSkillIsTrue = true;
		Drone.StoreThis.SkillSimple = false;
		Drone.StoreThis.SkillAllocate = true;
		$('#SkillPointRow').hide(); 				
		$('#SkillPointRowAllocate').show(); 
		break;
	}
};

BanditCSHCheck = function(n){
	if (Drone.StoreThis.BanditCSHCheck != n){
		Drone.StoreThis.BanditCSHCheck = n;
		writeSettings();
	}
	switch(parseInt(n)){
	case 0:
		Drone.StoreThis.BanditGamblerCSH = false;
		Drone.StoreThis.lolzatcash = false;
		Drone.StoreThis.BanditElapsedTimerCash = 4;
		break;
	case 1:
		Drone.StoreThis.BanditGamblerCSH = true;
		Drone.StoreThis.lolzatcash = false;
		Drone.StoreThis.BanditElapsedTimerCash = 1;
		break;
	case 2:
		Drone.StoreThis.BanditGamblerCSH = true;
		Drone.StoreThis.lolzatcash = false;
		Drone.StoreThis.BanditElapsedTimerCash = 2;
		break;
	case 3:
		Drone.StoreThis.BanditGamblerCSH = true;
		Drone.StoreThis.lolzatcash = false;
		Drone.StoreThis.BanditElapsedTimerCash = 3;
		break;
	case 4:
		Drone.StoreThis.BanditGamblerCSH = false;
		Drone.StoreThis.lolzatcash = true;
		Drone.StoreThis.BanditElapsedTimerCash = 4;
		break;
	}
};

function Settings() {
	ASPC();
	popupTitle = 'Drone CFG';
	myPop(popupTitle);
}

function create_config_html(){
	config_html = popup + '<div class="messages" style="background: url('+Drone.Images.BGJICZCI+'); border: 3px solid #a99e9e;-moz-border-radius: 7px;margin:5px">'+
	'<div><span style="float: left; width: 40%; text-align: left;">'+Drone.iLike+'</span><span style="float: center; width: 40%; text-align: right;"><font size="5" color="white"> Drone.&#12324;</font><font size="1" color="white"></font><span id="SettingsNoti">No Settings Detected</span></span><span style="float:right; width: 28%; text-align: right;">'+Drone.Version+' - <a href="http://mrsimy0.net/Mafia/donate.html" target="_blank">Donate</a> - <img width="16" height="16" title="Close" src="'+Drone.Images.Stop+'" id="close">'+

	'</span></div>'+
	'<div>'; 
	config_html += '&nbsp;Energy:<br>&nbsp;<select id="DXPrimaryEnergyOpt" onChange="PrimaryEnergySelector(this.selectedIndex)">';
	for (i = 0; i < DroneXJobMap.length; i++) {
		//if(i > 65){
		//	config_html += '<option style="background: url(http://mrsimy0.net/Imgs/rp_icon_old.png) no-repeat left;padding-left:20px;" value="' + i + '">' + DroneXJobMap[i].name + "</option>";
		//}else{
			config_html += '<option value="' + i + '">' + DroneXJobMap[i].name + "</option>";
		//}
	}
	config_html += '</select>&nbsp;&nbsp;<select id="ENNRN" onChange="JobberCheck(this.selectedIndex)">'+
	'<option value="0" href="#" id="NormJob">Normal Click</option>'+
	'<option value="1" href="#" id="RatioJob">Untill Ratio</option>'+
	'<option value="2" href="#" id="NormJobUntil">Normal Untill</option>'+
	'</select>&nbsp;&nbsp;'+
	'<span id="RatioJobRow" style="display:none">'+  
	'is <input style="resize:none;width:35px;" value="'+Drone.StoreThis.RatioingJobValue+'" id="postformid1">'+
	'</span>'+
	'<span id="NormalUntillJobRow" style="display:none">'+
	'<input style="resize:none;width:40px;" value="'+Drone.StoreThis.NormalUntillValue+'" id="postformid2"> Energy Left.'+
	'</span>';   
	config_html += '<span id="SecondryJobRow" style="display:none">'+		
	'<br>&nbsp;Secondry:<br>&nbsp;<select id="DXSecondryEnergyOpt" onChange="SecondryEnergySelector(this.selectedIndex)">';
	for (i = 0; i < DroneXJobMap.length; i++) {
		//if(i > 65){
		//	config_html += '<option style="background: url(http://mrsimy0.net/Imgs/rp_icon_old.png) no-repeat left;padding-left:20px;" value="' + i + '">' + DroneXJobMap[i].name + "</option>";
		//}else{
			config_html += '<option value="' + i + '">' + DroneXJobMap[i].name + "</option>";
	//	}
	}
	config_html += '</select>'+	
	'</span>';			
	config_html += '<br>&nbsp;Stamina:<br>&nbsp;<select id="DXPrimaryStaminaOpt" onChange="PrimaryStaminaSelector(this.selectedIndex)">';
	for (i = 0; i < DroneXStaminaMap.length; i++) {
		config_html += '<option value="' + i + '">' + DroneXStaminaMap[i].name + "</option>";
	}
	config_html += '</select>&nbsp;&nbsp;<select id="STANRN" onChange="StaminaCheck(this.selectedIndex)">'+
	'<option value="0" href="#" id="NormStam">Normal Click</option>'+
	'<option value="1" href="#" id="RatioStam">Untill Ratio</option>'+
	'<option value="2" href="#" id="NormStamUntil">Normal Untill</option>'+
	'</select>&nbsp;&nbsp;'+
	'<span id="RatioStamRow" style="display:none">'+  
	'is <input style="resize:none;width:35px;" value="'+Drone.StoreThis.RatioingStamValue+'" id="postformid3">'+
	'</span>'+

	'<span id="NormalUntillStamRow" style="display:none">'+
	'<input style="resize:none;width:40px;" value="'+Drone.StoreThis.NormalStamUntillValue+'" id="postformid4"> Stamina Left.'+
	'</span>';		
	config_html += '<span id="SecondryStamRow" style="display:none">'+
	'<br>&nbsp;Secondry:<br>&nbsp;<select id="DXSecondryStaminaOpt" onChange="SecondryStaminaSelector(this.selectedIndex)">';
	for (i = 0; i < DroneXStaminaMap.length; i++) {
		config_html += '<option value="' + i + '">' + DroneXStaminaMap[i].name + "</option>";
	}
	config_html += '</select>'+	
	'</span>'+

	'<span id="FightingRow" style="display:none">'+  
	'<br style="line-height: 25px;">'+ 
	'<div>'+ 
	'<span style="float: left; width: 25%; text-align: left;">'+ 
	'&nbsp;Enter User FBID\'s here<br>&nbsp;(one id per line)*'+ 
	'</span>'+ 
	'<span style="float: center; width: 1%; text-align: midle;"></span>'+ 
	'<span style="float: center; width: 10%; text-align: right;">'+ 
	'<textarea class="sexy_input" id="DXWTK">' + Drone.StoreThis.WhoToKill + '</textarea>'+ 
	'</span>'+ 
	'</div>'+
	'</span>'+
	'<span id="HopperRow" style="display:none">'+  
	'<br style="line-height: 25px;">'+ 
	'&nbsp;Attack Bucket ID &nbsp;<input value="' + Drone.StoreThis.hopperid + '"type="text" style="resize:none;width:270;" id="postformid7">'+ 
	'</span>'+

	'<div style="text-align:right;vertical-align:top;">'+'<span id="ASO"><font size="1">*May contain errorz, if they occur please report them on my <a href="http://www.facebook.com/pages/GuessX-Scripts/131414080285469" target="_blank">page</a>. Special thanks to <a href="http://screepts.com/" target="_blank">Lucifer</a>.  </font></span><a class="sexy_button_new short black impulse_buy" id="dronecfg" href="#"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png"></span></span></a>'+'&nbsp;&nbsp;<span id="ASN"><a href="#" id="start" class="sexy_button_new short green"><span><span>Start</span></span></a></span><span id="AST" style="display:none"><a href="#" id="AutoStop" class="sexy_button_new short red"><span><span>Stop</span></span></a></span></div>'+
	'</div></div>';
}

function myPop(popupId, popupTitle, shouldClose) {
	var myweirdstyles = '<style type="text/css" media="all">'+
	'#header ul {list-style: none; padding: 0.5em; margin: 0;}'+
	'#header li {float: left; background: #c60; margin: 0 2px 0 0; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px;}'+
	'#header a {display: block; background:  top left no-repeat;color: #ffc;text-decoration: none;padding: 0.8em 1em 0.25em;}'+
	'#header a:hover {color: white; background: blue; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px;}'+
	'#header #selected {font-weight: bold;}'+
	'#header #selected a {color: white;	}'+
	'#mycontents {padding: .5em;}'+
	'#contents {clear: both; color: white; padding: 1em; border: 0px solid grey;-moz-border-radius-bottomleft: 4px; border-bottom-left-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; -moz-border-radius-bottomright: 4px; border-bottom-right-radius: 4px;}'+
	'p {margin: 0 0 1em 0;}'+
	'</style>';
	'<div style="padding: 0px 15px 0px 15px;">When out of resources:<select id="DSRestart"><option value="0">Let me know!</option><option value="1">Restart!</option></select>'+
	'<br style="line-height: 25px;">Restart in&nbsp;<select id="DSRestartIn"><option value="0">1 Minute</option><option value="1">5 Minutes</option><option value="2">7 Minutes 30 Seconds</option><option value="3">10 Minutes</option><option value="4">20 Minutes</option></select>&nbsp;<font size="1">*Will only work if restarting is enabled above</font>'+
	'<br style="line-height: 25px;">Spend:<select id="DSSpendWhich"><option value="0">Energy First</option><option value="1">Stamina First</option><option value="2">Toe to Toe</option></select>'+
	'<br style="line-height: 25px;">Apply Skillpoints: <select id="DSSpendSkills"><option value="0">No!</option><option value="1">Attack</option><option value="2">Defense</option><option value="3">Energy</option><option value="4">Stamina</option></select>'+
	'<br style="line-height: 25px;">Robbing Refresh Rate&nbsp;<select id="DSRRR"><option value="0">3 Seconds</option><option value="1">4 Seconds</option><option value="2">5 Seconds</option><option value="3">6 Seconds</option><option value="4">7 Seconds</option><option value="5">8 Seconds</option></select>'+
	'<br style="line-height: 25px;">RepeatJob Refresh Rate&nbsp;<select id="DSRJRR"><option value="0">0.80</option><option value="1">1 Second</option><option value="2">1.5 Seconds</option><option value="3">2 Seconds</option><option value="4">2.5 Seconds</option><option value="5">3 Seconds</option></select>'+
	'<br style="line-height: 25px;">Pageload Rate&nbsp;<select id="DSPR"><option value="0">2 Seconds</option><option value="1">3 Seconds</option><option value="2">4 Seconds</option><option value="3">5 Seconds</option><option value="4">6 Seconds</option><option value="5">7 Seconds</option><option value="6">8 Seconds</option></select>'+
	'<br style="line-height: 25px;">Fight in&nbsp;<select id="DSFC"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option><option value="5">South Africa</option></select>&nbsp;Attack Speed&nbsp;<select id="DSAS"><option value="0">Fastest</option><option value="1">Kinda Fast</option><option value="2">Medium</option><option value="3">Slow</option><option value="4">I R Snail!</option></select>&nbsp;Use Bursts&nbsp;<input type="checkbox" id="UseBursts">&nbsp;Bursts&nbsp;<select id="DSBurstCount"><option value="0">1</option><option value="1">2</option><option value="2">3 (Max)</option></select>'+
	'<br style="line-height: 25px;">Rob in&nbsp;<select id="DSRC"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option><option value="5">South Africa</option></select>&nbsp;Rob Individual Speed&nbsp;<select id="DSRIS"><option value="0">0.15</option><option value="1">0.25</option><option value="2">0.50</option><option value="3">0.75</option><option value="4">1.00</option><option value="5">2.00</option></select>&nbsp;Use Robsquads&nbsp;<select id="DSRS"><option value="0">No!</option><option value="1">Yes!</option></select>'+
	'<br style="line-height: 25px;">Vegas Fobbing Options:&nbsp;&nbsp;Mafia Size&nbsp;<input id="DSVFMS" type="integer" value="501" style="resize:none;width:25px;">&nbsp;Mafia Level&nbsp;<input id="DSVFML" type="integer" value="35000" style="resize:none;width:40px;">'+
	'<br style="line-height: 25px;">Heal Thres Hold&nbsp;<input id="DSHTH" type="integer" value="500" style="resize:none;width:35px;">&nbsp;AutoBank Above 10k&nbsp;<input type="checkbox" id="Autobank">&nbsp;(Except NY & Las Vegas)'+
	'<br style="line-height: 30px;">Attempt to level account if short by just a little&nbsp;<input type="checkbox" id="LevelMeUp">'+
	'<br style="line-height: 30px;">Bandits: (Boxs must be ticked if using Teh Gambler)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killxp">&nbsp;Kill XP Bandit&nbsp;| Teh Gambler: <select id="XPBanO" onChange="BanditXPCheck(this.selectedIndex)"><option value="0" href="#" id="xpcheck0">Don\'t Gamble</option><option value="1" href="#" id="xpcheck1">Kill with 1 minute to go</option><option value="2" href="#" id="xpcheck2">Kill with 2 minutes to go</option><option value="3" href="#" id="xpcheck3">Kill with 3 minutes to go</option>'+
	'</select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killcsh">&nbsp;Kill Cash Bandit&nbsp;| Teh Gambler: <select id="CSHBanO" onChange="BanditCSHCheck(this.selectedIndex)"><option value="0" href="#" id="cshcheck0">Don\'t Gamble</option><option value="1" href="#" id="cshcheck1">Kill with 1 minute to go</option><option value="2" href="#" id="cshcheck2">Kill with 2 minutes to go</option><option value="3" href="#" id="cshcheck3">Kill with 3 minutes to go</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killjb">&nbsp;Kill Job Bandit&nbsp;'+
	'<br><center><a class="sexy_button_new short red" href="#" id="resetconfig"><span><span>Reset Config</span></span></a>&nbsp;<a id="savedcfg" href="#" class="sexy_button_new short green"><span><span>SAVE</span></span></a></center></div></span>'+
	'</div>'+
	'<br />'+
	'</div></span>' + '</center>' + '</div>' + '</div>'; 
	var popup = '<div id="' + popupId + '" class="pop_box" style="background: url('+Drone.Images.BGJICZCI+'); position:absolute;top:100px;left:top: 130px; left: 50px;display: block;z-index:999999;">' + '<a id="myPop_Close" href="#" class="pop_close" onclick="document.getElementById(\'popup_fodder\').removeChild(document.getElementById(this.parentNode.id))"></a>' + '<div style="z-index:99999" class="mini_EP_info_pop">' + '<span style="position:relative;top:5px"><h3 style="text-align:center;">Drone.&#12324; Config</h3><hr>'+
	'<div id="header">' +

	'<ul>' +
	'<li id="li__tab1" style="background: grey;"><a>Jobbing</a></li>' +
	'	<li id="li__tab2" style="background: orange;"><a>Fighting</a></li>' +
	'	<li id="li__tab3" style="background: orange;"><a>Robbing</a></li>' +
	'<li id="li__tab4" style="background: orange;"><a>Bandits</a></li>' +
	'<li id="li__tab5" style="background: orange;"><a>Spending</a></li>' +
	'<li id="li__tab6" style="background: orange;"><a>Restart</a></li>' +
	'<li id="li__tab7" style="background: orange;"><a>MISC</a></li>' +
	'<li id="li__tab8" style="background: orange;"><a>Level Ups</a></li>' +	
	'</ul>' +
	'<br>'+
	'</div>' +

	'<div id="mycontents">' +
	'<div id="contents" style="width: 90%">' + 
	'<div id="__tab1">'+
	'<p>RepeatJob Refresh Rate&nbsp;<select id="DSRJRR"><option value="0">0.80</option><option value="1">1 Second</option><option value="2">1.5 Seconds</option><option value="3">2 Seconds</option><option value="4">2.5 Seconds</option><option value="5">3 Seconds</option></select>'+
	'<br style="line-height: 30px;">Use Job Bursts&nbsp;<input type="checkbox" id="JBRTS">&nbsp;<span id="Jobburstsrow" style="display: none;"><select id="JBOS"><option value="0">3x</option><option value="1">4x</option><option value="2">5x</option><option value="3">6x</option><option value="4">7x</option><option value="5">8x</option><option value="6">9x</option><option value="7">10x</option></select></span>&nbsp;<span class="more_in"><font size="1">Please be sensible, to many will cause accounts to be flagged</font></span>'+
	'<br style="line-height: 30px;">Vegas Fobbing Options:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mafia Size&nbsp;<input id="DSVFMS" type="integer" value="501" style="resize:none;width:25px;"><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mafia Level&nbsp;<input id="DSVFML" type="integer" value="35000" style="resize:none;width:40px;">'+
	'<br style="line-height: 30px;">Use StamJob Bursts&nbsp;<input type="checkbox" id="SBRTS">&nbsp;<span id="Stamburstsrow" style="display: none;"><select id="FBOS"><option value="0">3x</option><option value="1">4x</option><option value="2">5x</option><option value="3">6x</option><option value="4">7x</option><option value="5">8x</option><option value="6">9x</option><option value="7">10x</option></select></span>&nbsp;<span class="more_in"><font size="1">Please be sensible, to many will cause accounts to be flagged</font></span>'+
	'</p>'+
	'</div>'+

	'<div id="__tab2" style="display: none; ">'+
	'<p>Fight in&nbsp;<select id="DSFC"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option><option value="5">South Africa</option></select>'+
	'<br style="line-height: 30px;">Attack Speed&nbsp;<select id="DSAS"><option value="0">Fastest</option><option value="1">Kinda Fast</option><option value="2">Medium</option><option value="3">Slow</option><option value="4">I R Snail!</option></select>'+
	'<br style="line-height: 30px;">Use Bursts&nbsp;<input type="checkbox" id="UseBursts">&nbsp;Bursts&nbsp;<select id="DSBurstCount"><option value="0">1</option><option value="1">2</option><option value="2">3 (Max)</option></select>'+
	'<br style="line-height: 25px;">Heal Thres Hold&nbsp;<input id="DSHTH" type="integer" value="500" style="resize:none;width:35px;">&nbsp;</p>'+
	'</div>'+

	'<div id="__tab3" style="display: none; ">'+
	'<p>Robbing Refresh Rate&nbsp;<select id="DSRRR"><option value="0">3 Seconds</option><option value="1">4 Seconds</option><option value="2">5 Seconds</option><option value="3">6 Seconds</option><option value="4">7 Seconds</option><option value="5">8 Seconds</option></select>'+
	'<br style="line-height: 25px;">Rob in&nbsp;<select id="DSRC"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option><option value="5">South Africa</option></select>'+
	'<br style="line-height: 30px;">Rob Individual Speed&nbsp;<select id="DSRIS"><option value="0">0.15</option><option value="1">0.25</option><option value="2">0.50</option><option value="3">0.75</option><option value="4">1.00</option><option value="5">2.00</option></select>'+
	'<br style="line-height: 30px;">Use Robsquads&nbsp;<select id="DSRS"><option value="0">No!</option><option value="1">Yes!</option></select></p>'+
	'</div>'+

	'<div id="__tab4" style="display: none; ">'+
	'<p>Bandits: (Boxs must be ticked if using Teh Gambler)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killxp">&nbsp;Kill XP Bandit&nbsp;| Teh Gambler: <select id="XPBanO" onChange="BanditXPCheck(this.selectedIndex)"><option value="0" href="#" id="xpcheck0">Don\'t Gamble</option><option value="1" href="#" id="xpcheck1">Kill with 1 minute to go</option><option value="2" href="#" id="xpcheck2">Kill with 2 minutes to go</option><option value="3" href="#" id="xpcheck3">Kill with 3 minutes to go</option>'+
	'</select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killcsh">&nbsp;Kill Cash Bandit&nbsp;| Teh Gambler: <select id="CSHBanO" onChange="BanditCSHCheck(this.selectedIndex)"><option value="0" href="#" id="cshcheck0">Don\'t Gamble</option><option value="1" href="#" id="cshcheck1">Kill with 1 minute to go</option><option value="2" href="#" id="cshcheck2">Kill with 2 minutes to go</option><option value="3" href="#" id="cshcheck3">Kill with 3 minutes to go</option><option value="4" href="#" id="cshcheck4">Keep Jobbing Thru it</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="killjb">&nbsp;Kill Job Bandit</p>'+
	'</div>'+

	'<div id="__tab5" style="display: none; ">'+
	'<p>Spend:<select id="DSSpendWhich"><option value="0">Energy First</option><option value="1">Stamina First</option><option value="2">Toe to Toe</option><option value="3">Only Energy</option><option value="4">Only Stamina</option></select>'+
	'<br style="line-height: 25px;">Apply Skillpoints: <select id="DXSpendSkills" onChange="DXSkillSelector(this.selectedIndex)">'+
	'<option value="0" href="#" id="NormJob">No!</option>'+
	'<option value="1" href="#" id="RatioJob">Yes!</option>'+
	'<option value="1" href="#" id="RatioJob">Yes & Allocate!</option>'+
	'</select>'+'&nbsp;&nbsp;<span id="SkillPointRow" style="display: none;"><select id="DSSpendSkills"><option value="0">Attack</option><option value="1">Defense</option><option value="2">Health</option><option value="3">Energy</option><option value="4">Stamina</option></select></span>'+
	'<span id="SkillPointRowAllocate" style="display: none;">'+
	'<br><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-attack.gif"/>&nbsp;<input value="0" style="resize:none;width:13px;text-align:right" id="fieldd1">&nbsp;&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-defense.gif"/>&nbsp;<input value="0" style="resize:none;width:13px;text-align:right" id="fieldd2">'+
	'&nbsp;&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-health.gif"/>&nbsp;<input value="0" style="resize:none;width:13px;text-align:right" id="fieldd3">'+
	'<br>'+ '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif"/>&nbsp;<input value="0" style="resize:none;width:13px;text-align:right" id="fieldd4">&nbsp;&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"/>&nbsp;<input value="0" style="resize:none;width:13px;text-align:right" id="fieldd5"></span>'+

	'</p>'+
	'</div>'+

	'<div id="__tab6" style="display: none; ">'+
	'<p>When out of resources:<select id="DSRestart"><option value="0">Let me know!</option><option value="1">Restart!</option></select>'+
	'<br style="line-height: 25px;">Restart in&nbsp;<select id="DSRestartIn"><option value="0">1 Minute</option><option value="1">5 Minutes</option><option value="2">7 Minutes 30 Seconds</option><option value="3">10 Minutes</option><option value="4">20 Minutes</option></select>&nbsp;<font size="1">*Will only work if restarting is enabled above</font></p>'+
	'</div>'+

	'<div id="__tab7" style="display: none; ">'+
	'<p>Pageload Rate&nbsp;<select id="DSPR"><option value="0">2 Seconds</option><option value="1">3 Seconds</option><option value="2">4 Seconds</option><option value="3">5 Seconds</option><option value="4">6 Seconds</option><option value="5">7 Seconds</option><option value="6">8 Seconds</option></select>'+
	'<br style="line-height: 30px;">AutoBank Above&nbsp;<input type="checkbox" id="Autobank">&nbsp;(Except NY & Las Vegas)<br style="line-height: 30px;">Attempt to level account if short by just a little&nbsp;<input type="checkbox" id="LevelMeUp"><br style="line-height: 30px;">Learn Energy Reqs?&nbsp;<input type="checkbox" id="IrLearning">&nbsp;<span class="more_in"><font size="1">This learns your energy reqs if you havent mastered districts Brazil, Chicago & London</font></span>'+
	'<br style="line-height: 30px;">Autopost for crew&nbsp;<input type="checkbox" id="APFC">&nbsp;<span class="more_in"><font size="1">When under 18, Autoposting can cause issues on some accounts. Disable if you experience them</font></span><br style="line-height: 30px;">Autostart&nbsp;<input type="checkbox" id="autoruning" ><span class="more_in"><font size="1">(Autoruns when MW starts, will only work if you have GM version installed)</font></span>'+
	'<br style="line-height: 30px;">Load arena page when stuck for 6 minutes&nbsp;<input type="checkbox" id="load_arena_page">&nbsp;'+
	'<span class="more_in"><font size="1">Kills Drone, use only with the autoload version of Drone!</font></span>'+
	'</p>'+
	'</div>'+

	'<div id="__tab8" style="display: none; ">'+
	'<p>&nbsp;Post Level up bonus:&nbsp;'+
	'<select id="post_level_up"><option>never</option><option>to my wall</option>'+
	'<option>as a new post</option><option>as a comment</option></select>'+

	'<span id="select_group"><br style="line-height: 30px;">&nbsp;&nbsp;&nbsp;in group:&nbsp;<span id="aan_promo_groups">Loading groups...</span></span>'+
	'<span id="select_post"><br style="line-height: 30px;">&nbsp;&nbsp;&nbsp;to post:&nbsp;<span id="aan_promo_posts">Loading posts...</span></span>'+
	'<span id="warning_permissions"><br style="line-height: 30px;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="more_in"><font size="2">*If lists are blank it requires FB Permissions, to get these click here --></font></span><a class="sexy_button_new short orange" href="#" id="getDronePerms"><span><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXZwQWcAAAAQAAAAEABcxq3DAAABUUlEQVQ4y52TMS8EURSFv4nR2LEYWsUWej+ATtBpSDQSUSgldEKHQoOWQpQqiXI1IvsHlBKdgkSxiQ22eO+ep5jM2mWHZG81Jznn5Jz77kQhBOaWdwI9TPXyIIpmlrbD5PRsL3ruazfEAObEW/29kGhmND8/WjgZLDOUJshELBPOhDcVGgwnfWyuzpMOlwDYPaniTJhEbBLmDTMrNFhbnGqJ80TmDUnEUp6g2CAXH1/c8fzaAOhM4Jzw/neFz49GB354fAJgoFTGOSEFYilgpq4VTg9WuuKNvSvMlFVwzuOc4X1xhZ/jveGcYabsGb1Z1x2s714CcLa/3IFzzY8d/J+gneOcvu+gKMEvgzZOK8FoWmKiMkKj3v+vQWV8rPVdThOaL4PZDmQB/XGJ+bRzZIGgQByUiZOhUqHw8PwWoIMjy+4gCiEwvbDV0+9cuz6KvgDVmeooGa+dswAAACV0RVh0Y3JlYXRlLWRhdGUAMjAxMC0wNC0xM1QxOTo0NjoyMCswMDowMLs82X8AAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMy8wOeispIwAAAAldEVYdG1vZGlmeS1kYXRlADIwMTAtMDQtMTNUMTk6NDY6MjArMDA6MDDkja9LAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAAal6VFh0WE1MOmNvbS5hZG9iZS54bXAAAHja1VLLitswFN3nKy7qtrYezozHwvZQEkIppAyTQEt3siV7TKIHsgZr8vVd5NFMKF0UuuhZXs7j3sMtH6MT7U4FaFQ/mAoBAIJBVujb3Zqs3UK9DJ8PXm0OX7ftYdcWEj3WszLyqJ1WQUDUezPyWCEhbaO4GblWQWAEkUftwq5Cn6RtFHxfP8HCegXzlCYtyeYwv09Zzor8/iNsRIAvwgDLgRGSA2OcUj6ncAKqZwBQetnx5+XqlOllV6GXEBzHeJqmdMpS63tMi6LAhGHGEi+7ZHwzQcTEjB+OJmefpRpbP7gwWANedlw09jVUCM3gCqfjhLsEmTEV0jYqba3GUThMU4IvzgBQRuH4wisRrN9au6+P568GrybrdyMsNlmJb0m/06ulCKpmhBQJyRKWb+kdZw88oz+u9EfSjXxt5dC9XcmLhDxsWcZpxslZfkU694JvivnbwmR76cu9+n1qfY9li9VeaWXCiGlK33cmW95Zr0WoBy16hZ3pS/xr+Mf9jtPn5aqelfjyl/W7tf4V/vuQn8/A+zhjKi18AAAAAElFTkSuQmCC"></span></span></a></span>'+
	'<br style="line-height: 30px;">&nbsp;<span id="post_bonuses_with">Post bonuses with:&nbsp;'+
	'<select id="post_on_item"><option>3 attack or 3 defense</option><option>any attack or defense</option>'+
	'<option>attack, defense or a reward point</option><option>any item</option></select>'+
	'<br>&nbsp;&nbsp;<span id="remove_post_span"><input type="checkbox" id="remove_post_cb">&nbsp;Remove post on next level up.</span>'+
	'<br style="line-height: 30px;">&nbsp;Your level up bonus tinyurl:&nbsp; <input type="text" id="tinyurl" style="width:240px">'+
	'<br style="line-height: 30px;">&nbsp;<span class="more_in"><font size="2">*To get a shorter link if you post your level up as a comment. IE tinyurl</font></span>'+
	'<br style="line-height: 30px;">&nbsp;Pause on bonuses with:&nbsp;'+
	'<select id="pause_on_item"><option>never pause for bonus</option><option>3 attack or 3 defense</option><option>any attack or defense</option>'+
	'<option>attack, defense or a reward point</option><option value="any">any item</option></select>'+
	'<br>&nbsp;Pause on level <input type="text" id="pause_on_level" value="never" style="width:40px"><br><span class="more_in"><font size="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Special thanks to chAos for the coding of this part</font></span></p>'+
	'</div>'+

	'</div>'+
	'<center>'+'<a id="savedcfg" href="#" class="sexy_button_new short green"><span><span>SAVE</span></span></a></center><br>'+
	'</div></div> </div>'; 
	document.getElementById('popup_fodder').innerHTML += myweirdstyles+popup;
	if (shouldClose) {
		setTimeout(function () {
			document.getElementById('popup_fodder').removeChild(document.getElementById(popupId));
		}, shouldClose);
	};
//	Thanks for the shortened code
//	for(var i=1; i<9; i++){
//		$('#li__tab'+i).addEventListener("click", function(){_tab("__tab" + i);}, false);
//	}
	document.getElementById('li__tab1').addEventListener("click", function(){_tab("__tab1");}, false);
	document.getElementById('li__tab2').addEventListener("click", function(){_tab("__tab2");}, false);
	document.getElementById('li__tab3').addEventListener("click", function(){_tab("__tab3");}, false);
	document.getElementById('li__tab4').addEventListener("click", function(){_tab("__tab4");}, false);
	document.getElementById('li__tab5').addEventListener("click", function(){_tab("__tab5");}, false);
	document.getElementById('li__tab6').addEventListener("click", function(){_tab("__tab6");}, false);
	document.getElementById('li__tab7').addEventListener("click", function(){_tab("__tab7");}, false);
	document.getElementById('li__tab8').addEventListener("click", function(){_tab("__tab8");}, false);
	$('#getDronePerms').click(function(){
		GetPostToGroup();
	});

	$('#savedcfg').click(function(){
		closeZpopup();
	});    
	$('#XPBanO option:eq('+Drone.StoreThis.BanditXPCheck+')').prop('selected', true);
	BanditXPCheck(Drone.StoreThis.BanditXPCheck);
	$('#CSHBanO option:eq('+Drone.StoreThis.BanditCSHCheck+')').prop('selected', true);
	BanditCSHCheck(Drone.StoreThis.BanditCSHCheck);	
	$('#DXSpendSkills option:eq(' + Drone.StoreThis.DXSkillSelector + ')').prop('selected', true);
	DXSkillSelector(Drone.StoreThis.DXSkillSelector);
	document.getElementById("DSRestart").selectedIndex = Drone.StoreThis.Restart;
	document.getElementById("DSSpendWhich").selectedIndex = Drone.StoreThis.UseWhatFirst;
	document.getElementById("DSSpendSkills").selectedIndex = Drone.StoreThis.Spending;
	document.getElementById("DSRRR").selectedIndex = Drone.StoreThis.RobbingPageRefresh;
	document.getElementById("DSRJRR").selectedIndex = Drone.StoreThis.RepeatJobSpeed;
	document.getElementById("DSPR").selectedIndex = Drone.StoreThis.PageRefresh;
	document.getElementById("DSRestartIn").selectedIndex = Drone.StoreThis.RestartIn;
	document.getElementById("DSRIS").selectedIndex = Drone.StoreThis.RobbingSlotSpeed;
	document.getElementById("DSAS").selectedIndex = Drone.StoreThis.AttackSpeed;
	document.getElementById("DSFC").selectedIndex = Drone.StoreThis.FightCity;
	document.getElementById("JBOS").selectedIndex = Drone.StoreThis.JobBurstsCount;
	document.getElementById("FBOS").selectedIndex = Drone.StoreThis.StamBurstsCount;
	document.getElementById("DSRC").selectedIndex = Drone.StoreThis.RobCity;
	document.getElementById("DSRS").selectedIndex = Drone.StoreThis.RobSquads;
	document.getElementById("DSVFMS").value = Drone.StoreThis.opponentMafiaMax;
	document.getElementById("DSVFML").value = Drone.StoreThis.opponentLevelMax;
	document.getElementById("DSHTH").value = Drone.StoreThis.Health;
	document.getElementById("DSBurstCount").selectedIndex = Drone.StoreThis.Bursts;
	document.getElementById('JBRTS').addEventListener("click", function(){JBChanger();}, false);
	document.getElementById('SBRTS').addEventListener("click", function(){JSBChanger();}, false);
	document.getElementById("fieldd1").value = Drone.StoreThis.MasterAttV;
	document.getElementById("fieldd2").value = Drone.StoreThis.MasterDefV;
	document.getElementById("fieldd3").value = Drone.StoreThis.MasterHeaV;
	document.getElementById("fieldd4").value = Drone.StoreThis.MasterNRGV;
	document.getElementById("fieldd5").value = Drone.StoreThis.MasterStaV;
	
	document.getElementById("DSFC").options[1].disabled = "disabled";
	document.getElementById("DSRC").options[1].disabled = "disabled";
	//document.getElementById("DSRC").options[5].disabled = "disabled";
	
	if (Drone.StoreThis.BurstsOn) {
		document.getElementById("UseBursts").checked = true;
	}
	if (Drone.StoreThis.LevelMeUpOi) {
		document.getElementById("LevelMeUp").checked = true;
	}
	if (Drone.StoreThis.ABank) {
		document.getElementById("Autobank").checked = true;
	}
	if (Drone.StoreThis.JobBursts) {
		document.getElementById("JBRTS").checked = true;
		$('#Jobburstsrow').show();
	}
	if (Drone.StoreThis.StamBursts) {
		document.getElementById("SBRTS").checked = true;
		$('#Stamburstsrow').show();
	}				
	if (Drone.StoreThis.xp) {
		document.getElementById("killxp").checked = true;
	}
	if (Drone.StoreThis.csh) {
		document.getElementById("killcsh").checked = true;
	}
	if (Drone.StoreThis.jb) {
		document.getElementById("killjb").checked = true;
	}
	if (Drone.StoreThis.AutopostingCrew) {
		document.getElementById("APFC").checked = true;
	}	

	if (Drone.StoreThis.isAutoRun) {
		document.getElementById("autoruning").checked = true;
	}
/*	if (Drone.StoreThis.AmLearning) {
		document.getElementById("IrLearning").checked = true;
	}*/
	document.getElementById("load_arena_page").checked = Drone.StoreThis.LoadArenaPage;

	document.getElementById("post_level_up").selectedIndex = Drone.StoreThis.PostLevelUp;
	document.getElementById("remove_post_cb").checked = Drone.StoreThis.RemoveLevelUpPost;
	document.getElementById("post_on_item").selectedIndex = Drone.StoreThis.PostOnItem;
	document.getElementById("pause_on_item").selectedIndex = Drone.StoreThis.PauseOnItem;
	document.getElementById("pause_on_level").value = Drone.StoreThis.PauseOnLevel;
	document.getElementById("tinyurl").value = Drone.StoreThis.Tinyurl;

	init_level_up_config();
	$('#post_level_up').bind('click',function() {
		init_level_up_config();
	});

	setTimeout(read_groups,500);
}

function initialize_drone_startscreen(){
	if(Drone.StoreThis.hazseen){
		document.getElementById("SettingsNoti").style.display = 'none';
	}else{
		document.getElementById("SettingsNoti").style.display = '';
		$('#SettingsNoti').effect("pulsate", { times:4 }, 750);
	}

	$('#SettingsNoti').animate({ color: "white" }, 1000, "swing" ,function() { $('#SettingsNoti').animate({ color: "black" }, 1000); });

	$('#close').click(function(){
		ClearIVLS();
		Drone.Running.Paused = true;
		$('#gxDiv').remove();
	});    

	document.getElementById("DXPrimaryEnergyOpt").options[0].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[7].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[8].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[9].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[10].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[11].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[12].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[13].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[14].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[20].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[24].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[37].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[46].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[55].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[66].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[77].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[88].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[99].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[110].disabled = "disabled";
	//SD district title
	//SD district
/*	document.getElementById("DXPrimaryEnergyOpt").options[56].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[57].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[58].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[59].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[60].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[61].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[62].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[63].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[64].disabled = "disabled"; */
	//Pay to play SD Title	
	//Pay to pay district	
/*	document.getElementById("DXPrimaryEnergyOpt").options[66].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[67].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[68].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[69].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[70].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[71].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[72].disabled = "disabled";
	document.getElementById("DXPrimaryEnergyOpt").options[73].disabled = "disabled";	*/
	//secondry
	document.getElementById("DXSecondryEnergyOpt").options[0].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[7].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[8].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[9].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[10].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[11].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[12].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[13].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[14].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[20].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[24].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[37].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[46].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[55].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[65].disabled = "disabled";	
	document.getElementById("DXSecondryEnergyOpt").options[77].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[88].disabled = "disabled";
document.getElementById("DXSecondryEnergyOpt").options[99].disabled = "disabled";
document.getElementById("DXSecondryEnergyOpt").options[110].disabled = "disabled";
	//SD district title
	//SD district
/*	document.getElementById("DXSecondryEnergyOpt").options[56].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[57].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[58].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[59].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[60].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[61].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[62].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[63].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[64].disabled = "disabled"; */
	//Pay to play SD Title
	//Pay to pay district
/*	document.getElementById("DXSecondryEnergyOpt").options[66].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[67].disabled = "disabled"; 
	document.getElementById("DXSecondryEnergyOpt").options[68].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[69].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[70].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[71].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[72].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[73].disabled = "disabled";
	document.getElementById("DXSecondryEnergyOpt").options[74].disabled = "disabled";*/
	//stamina
	document.getElementById("DXPrimaryStaminaOpt").options[0].disabled = "disabled";
	document.getElementById("DXPrimaryStaminaOpt").options[1].disabled = "disabled";
	document.getElementById("DXPrimaryStaminaOpt").options[2].disabled = "disabled";
	document.getElementById("DXPrimaryStaminaOpt").options[3].disabled = "disabled";
	document.getElementById("DXPrimaryStaminaOpt").options[5].disabled = "disabled";
	document.getElementById("DXPrimaryStaminaOpt").options[9].disabled = "disabled";
	document.getElementById("DXSecondryStaminaOpt").options[0].disabled = "disabled";
	document.getElementById("DXSecondryStaminaOpt").options[1].disabled = "disabled";
	document.getElementById("DXSecondryStaminaOpt").options[2].disabled = "disabled";	
	document.getElementById("DXSecondryStaminaOpt").options[3].disabled = "disabled";
	document.getElementById("DXSecondryStaminaOpt").options[5].disabled = "disabled";	
	document.getElementById("DXSecondryStaminaOpt").options[9].disabled = "disabled";

	$('#DXPrimaryEnergyOpt option:eq(' + Drone.StoreThis.PrimaryEnergyJobInfo + ')').prop('selected', true);
	PrimaryEnergySelector(Drone.StoreThis.PrimaryEnergyJobInfo);
	$('#DXSecondryEnergyOpt option:eq(' + Drone.StoreThis.SecondryEnergyJobInfo + ')').prop('selected', true);
	SecondryEnergySelector(Drone.StoreThis.SecondryEnergyJobInfo);
	$('#ENNRN option:eq('+Drone.StoreThis.JobberCheck+')').prop('selected', true);
	JobberCheck(Drone.StoreThis.JobberCheck);	

	$('#DXPrimaryStaminaOpt option:eq(' + Drone.StoreThis.PrimaryStaminaJobInfo + ')').prop('selected', true);
	PrimaryStaminaSelector(Drone.StoreThis.PrimaryStaminaJobInfo);
	$('#DXSecondryStaminaOpt option:eq(' + Drone.StoreThis.SecondryStaminaJobInfo + ')').prop('selected', true);
	SecondryStaminaSelector(Drone.StoreThis.SecondryStaminaJobInfo);	
	$('#STANRN option:eq('+Drone.StoreThis.StaminaCheck+')').prop('selected', true);
	StaminaCheck(Drone.StoreThis.StaminaCheck);



	document.getElementById("start").onclick=GoTime;
	document.getElementById("dronecfg").onclick=Settings;
	document.getElementById("AutoStop").onclick=ASPC;

	if(Drone.StoreThis.isAutoRun){
		document.getElementById('ASO').innerHTML = TimeStampMe()+'Autostarting in 10 seconds.';
		document.getElementById("ASN").style.display = 'none';
		document.getElementById("AST").style.display = '';
		setTimeout(stopitnow, 10000);
	}
}

function stopitnow(){
	if(AutostartStopped){
		try{
			document.getElementById('ASO').innerHTML = '<font size="1">*May contain errorz, if they occur please report them on my <a href="http://www.facebook.com/pages/GuessX-Scripts/131414080285469" target="_blank">page</a>. Special thanks to <a href="http://screepts.com/" target="_blank">Lucifer</a>.  </font>';
			document.getElementById("ASN").style.display = '';
			document.getElementById("AST").style.display = 'none';
		}catch(err){}
	}else{
		GoTime();
	}
}

function init_level_up_config(){
	var postTo = document.getElementById("post_level_up").selectedIndex;

	if(postTo<2){
		document.getElementById("select_group").hidden = true;
		document.getElementById("select_post").hidden = true;
		document.getElementById("warning_permissions").hidden = true;
	}
	else if(postTo==2){
		document.getElementById("select_group").hidden = false;
		document.getElementById("select_post").hidden = true;	
		document.getElementById("warning_permissions").hidden = false;		
	}
	else if(postTo==3){
		document.getElementById("select_group").hidden = false;
		document.getElementById("select_post").hidden = false;	
		document.getElementById("warning_permissions").hidden = false;			
	}
}


function JBChanger() {
	$('#Jobburstsrow').toggle();
	return;
}

function JSBChanger() {
	$('#Stamburstsrow').toggle();
	return;
}

function _tab(__tab) {
	document.getElementById("__tab1").style.display = 'none';
	document.getElementById("__tab2").style.display = 'none';
	document.getElementById("__tab3").style.display = 'none';
	document.getElementById("__tab4").style.display = 'none';
	document.getElementById("__tab5").style.display = 'none';
	document.getElementById("__tab6").style.display = 'none';
	document.getElementById("__tab7").style.display = 'none';
	document.getElementById("__tab8").style.display = 'none';
	document.getElementById('li__tab1').setAttribute("class", "");
	document.getElementById("li__tab2").setAttribute("class", "");
	document.getElementById("li__tab3").setAttribute("class", "");
	document.getElementById("li__tab4").setAttribute("class", "");
	document.getElementById("li__tab5").setAttribute("class", "");
	document.getElementById("li__tab6").setAttribute("class", "");
	document.getElementById("li__tab7").setAttribute("class", "");
	document.getElementById("li__tab8").setAttribute("class", "");
	document.getElementById('li__tab1').setAttribute("style", "background: orange");
	document.getElementById("li__tab2").setAttribute("style", "background: orange");
	document.getElementById("li__tab3").setAttribute("style", "background: orange");
	document.getElementById("li__tab4").setAttribute("style", "background: orange");
	document.getElementById("li__tab5").setAttribute("style", "background: orange");
	document.getElementById("li__tab6").setAttribute("style", "background: orange");
	document.getElementById("li__tab7").setAttribute("style", "background: orange");
	document.getElementById("li__tab8").setAttribute("style", "background: orange");
	document.getElementById(__tab).style.display = 'block';
	document.getElementById('li'+__tab).setAttribute("class", "active");
	document.getElementById('li'+__tab).setAttribute("style", "background: grey;");
}

function doOptReset(){
	document.getElementById("DSRestart").selectedIndex = 0;
	document.getElementById("DSSpendWhich").selectedIndex = 0;
	document.getElementById("DSSpendSkills").selectedIndex = 0;
	document.getElementById("DSRRR").selectedIndex = 4;
	document.getElementById("DSRJRR").selectedIndex = 1;
	document.getElementById("DSPR").selectedIndex = 5;
	document.getElementById("DSRestartIn").selectedIndex = 3;
	document.getElementById("DSRIS").selectedIndex = 0;
	document.getElementById("DSAS").selectedIndex = 2;
	document.getElementById("DSFC").selectedIndex = 0;
	document.getElementById("DSRC").selectedIndex = 0;
	document.getElementById("DSRS").selectedIndex = 0;
	document.getElementById("DSVFMS").value = 501;
	document.getElementById("DSVFML").value = 35000;
	document.getElementById("DSHTH").value = 500;
	document.getElementById("DSBurstCount").selectedIndex = 2;
	document.getElementById("UseBursts").checked = true;
	document.getElementById("LevelMeUp").checked = false;
	document.getElementById("Autobank").checked = false;
	document.getElementById("JBRTS").checked = false;
	document.getElementById("killxp").checked = true;
	document.getElementById("killcsh").checked = true;
	document.getElementById("killjb").checked = true;
	document.getElementById("APFC").checked = false;
	document.getElementById("autoruning").checked = false;
//	document.getElementById("IrLearning").checked = false;
	document.getElementById("load_arena_page").checked = false;
	Drone.StoreThis.hazseen = false;
}

function closeZpopup(){
	Drone.StoreThis.hazseen = true;
	if(Drone.StoreThis.SkillAllocate){
		Drone.StoreThis.MasterAttV = parseInt(document.getElementById("fieldd1").value);
		Drone.StoreThis.MasterDefV = parseInt(document.getElementById("fieldd2").value);
		Drone.StoreThis.MasterHeaV = parseInt(document.getElementById("fieldd3").value);
		Drone.StoreThis.MasterNRGV = parseInt(document.getElementById("fieldd4").value);
		Drone.StoreThis.MasterStaV = parseInt(document.getElementById("fieldd5").value);
		if(Drone.StoreThis.DXSkillIsTrue && Drone.StoreThis.MasterAttV+Drone.StoreThis.MasterDefV+Drone.StoreThis.MasterHeaV+Drone.StoreThis.MasterNRGV+Drone.StoreThis.MasterStaV < 5){
			_tab("__tab5");
			alert('Skillpoint Numbers must all add up to 5!');
			return;
		}
		else if(Drone.StoreThis.DXSkillIsTrue && Drone.StoreThis.MasterAttV+Drone.StoreThis.MasterDefV+Drone.StoreThis.MasterHeaV+Drone.StoreThis.MasterNRGV+Drone.StoreThis.MasterStaV > 5){
			document.getElementById("fieldd1").value = 0;
			document.getElementById("fieldd2").value = 0;
			document.getElementById("fieldd3").value = 0;
			document.getElementById("fieldd4").value = 0;
			document.getElementById("fieldd5").value = 0;
			_tab("__tab5");
			alert('Numbers must not be above 5! Have reset numbers!');
			return;
		}
	}

	Drone.StoreThis.Restart = document.getElementById("DSRestart").selectedIndex;
	Drone.StoreThis.JobBurstsCount = document.getElementById("JBOS").selectedIndex;
	Drone.StoreThis.StamBurstsCount = document.getElementById("FBOS").selectedIndex;
	Drone.StoreThis.UseWhatFirst = document.getElementById("DSSpendWhich").selectedIndex;
	Drone.StoreThis.Spending = document.getElementById("DSSpendSkills").selectedIndex;
	Drone.StoreThis.RobbingPageRefresh = document.getElementById("DSRRR").selectedIndex;
	Drone.StoreThis.RepeatJobSpeed = document.getElementById("DSRJRR").selectedIndex;
	Drone.StoreThis.PageRefresh = document.getElementById("DSPR").selectedIndex;
	Drone.StoreThis.RestartIn = document.getElementById("DSRestartIn").selectedIndex;
	Drone.StoreThis.RobbingSlotSpeed = document.getElementById("DSRIS").selectedIndex;
	Drone.StoreThis.AttackSpeed = document.getElementById("DSAS").selectedIndex;
	Drone.StoreThis.FightCity = document.getElementById("DSFC").selectedIndex;
	Drone.StoreThis.RobCity = document.getElementById("DSRC").selectedIndex;
	Drone.StoreThis.RobSquads = document.getElementById("DSRS").selectedIndex;
	Drone.StoreThis.opponentMafiaMax = parseInt(document.getElementById("DSVFMS").value);
	Drone.StoreThis.opponentLevelMax = parseInt(document.getElementById("DSVFML").value);
	Drone.StoreThis.Health = parseInt(document.getElementById("DSHTH").value);
	Drone.StoreThis.Bursts = document.getElementById("DSBurstCount").selectedIndex;

	if (document.getElementById('UseBursts').checked) {
		Drone.StoreThis.BurstsOn = true;
	}else{
		Drone.StoreThis.BurstsOn = false;
	}

	if (document.getElementById('LevelMeUp').checked) {
		Drone.StoreThis.LevelMeUpOi = true;
	}else{
		Drone.StoreThis.LevelMeUpOi = false;
	}
	if (document.getElementById('Autobank').checked) {
		Drone.StoreThis.ABank = true;
	}else{
		Drone.StoreThis.ABank = false;
	}

	if (document.getElementById("JBRTS").checked) {
		Drone.StoreThis.JobBursts = true;
	}else{
		Drone.StoreThis.JobBursts = false;
	}		
	if (document.getElementById("SBRTS").checked) {
		Drone.StoreThis.StamBursts = true;
	}else{
		Drone.StoreThis.StamBursts = false;
	}		

	if (document.getElementById('killxp').checked) {
		Drone.StoreThis.xp = true;
	}else{
		Drone.StoreThis.xp = false;
	}
	if (document.getElementById('killcsh').checked) {
		Drone.StoreThis.csh = true;
	}else{
		Drone.StoreThis.csh = false;
	}
	if (document.getElementById('killjb').checked) {
		Drone.StoreThis.jb = true;
	}else{
		Drone.StoreThis.jb = false;
	}
	if (document.getElementById("APFC").checked) {
		Drone.StoreThis.AutopostingCrew = true;
	}else {
		Drone.StoreThis.AutopostingCrew = false;
	}
	if (document.getElementById("autoruning").checked) { 
		Drone.StoreThis.isAutoRun = true;
	}else {
		Drone.StoreThis.isAutoRun = false;
	}
/*	if (document.getElementById("IrLearning").checked) {
		Drone.StoreThis.AmLearning = true;
	}else {
		Drone.StoreThis.AmLearning = false;
	}*/

	Drone.StoreThis.LoadArenaPage = document.getElementById("load_arena_page").checked;
	Drone.StoreThis.PostLevelUp = document.getElementById("post_level_up").selectedIndex;
	Drone.StoreThis.RemoveLevelUpPost = document.getElementById("remove_post_cb").checked;
	Drone.StoreThis.PostOnItem = document.getElementById("post_on_item").selectedIndex;
	Drone.StoreThis.PauseOnItem = document.getElementById("pause_on_item").selectedIndex;
	Drone.StoreThis.PauseOnLevel = document.getElementById("pause_on_level").value;
	Drone.StoreThis.Tinyurl = document.getElementById("tinyurl").value;

	if(Drone.StoreThis.PostLevelUp > 1){
		var grouplist = document.getElementById("aan_promo_selectable");
		//Fix for autostart version of drone. Groups can't be read after a refresh thus getting selected index gives an exception
		if(grouplist != null){
			Drone.StoreThis.PostToGroupWithID = grouplist.options[grouplist.selectedIndex].value;
		}	
	}

	if(Drone.StoreThis.PostLevelUp > 2){
		var postlist = document.getElementById("aan_promo_selectablepost");
		if(postlist != null){
			Drone.StoreThis.CommentToPostWithID = postlist.options[postlist.selectedIndex].value;
		}		
	}

	writeSettings();

	document.getElementById('popup_fodder').removeChild(document.getElementById('Drone CFG'));
}

function ASPC(){
	AutostartStopped = true;
	document.getElementById('ASO').innerHTML = '<font size="1">*May contain errorz, if they occur please report them on my <a href="http://www.facebook.com/pages/GuessX-Scripts/131414080285469" target="_blank">page</a>. Special thanks to <a href="http://screepts.com/" target="_blank">Lucifer</a>.  </font>';
	document.getElementById("ASN").style.display = '';
	document.getElementById("AST").style.display = 'none';
	return;
}


function writeSettings(){
	storage.setItem("DroneXWS", JSON.stringify(Drone.StoreThis));
}

function readSettings(){
	if (!storage.getItem("DroneXWS")) { 
		writeSettings();
	} else {

		tempsettings = JSON.parse(storage.getItem("DroneXWS"));
		if( Object.keys(tempsettings).length != Object.keys(Drone.StoreThis).length ) { 
			writeSettings();
		} else{
			Drone.StoreThis = tempsettings;
		}
	}
}


function initialize_storage(){
	//Localstorage
	try {
		if (localStorage.getItem) {
			storage = localStorage;
		}
		else if (window.localStorage.getItem) {
			storage = window.localStorage;
		}
	}
	catch(e) {}
}


/********************************************************************************
 * 							Top level + start/stop								*
 ********************************************************************************/


function GoTime() {
	var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	try{
		var jrv = parseFloat(document.getElementById("postformid1").value);
		var srv = parseFloat(document.getElementById("postformid3").value);
		Drone.StoreThis.RatioingJobValue = jrv.toPrecision(3);
		Drone.StoreThis.NormalUntillValue = parseInt(document.getElementById("postformid2").value);
		Drone.StoreThis.RatioingStamValue = srv.toPrecision(3);
		Drone.StoreThis.NormalStamUntillValue = parseInt(document.getElementById("postformid4").value);
		if(DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isGroupPeople && DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople && Drone.Check.Morethan){
			alert('Fighting two different people is disabled, please change one of the Stamina options.');
			return;
		}
		if(DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isFighting && DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isFighting && Drone.Check.Morethan){
			alert('Fighting in two different places is disabled, please change one of the Stamina options.');
			return;
		} 
		if(document.getElementById('DXWTK').value.length == 0 && (DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isGroupPeople||DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople)) {
			alert('Please enter target IDs');
			return;
		}
		Drone.StoreThis.WhoToKill = $('#DXWTK').val().split('\n');
		if(document.getElementById('DXWTK').value.length > 0 && (DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isGroupPeople||DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isGroupPeople)) {
			Drone.Fighterx.user_list = document.getElementById('DXWTK').value.split('\n');
			Drone.Fighterx.user_names = document.getElementById('DXWTK').value.split('\n');
		}
		user_list_selector = 0;
		if(document.getElementById('postformid7').value.length == 0 && (DroneXStaminaMap[Drone.StoreThis.SecondryStaminaJobInfo].isHopper||DroneXStaminaMap[Drone.StoreThis.PrimaryStaminaJobInfo].isHopper)) {
			alert('Please enter MW List Bucket ID');
			return;
		}
		Drone.StoreThis.hopperid = document.getElementById('postformid7').value;
	}catch(err){}
	writeSettings();
	if(rres[Drone.StoreThis.RestartIn] == 60000){
		HumanMinute = 1;
	}
	else if(rres[Drone.StoreThis.RestartIn] == 300000){
		HumanMinute = 5;
	}
	else if(rres[Drone.StoreThis.RestartIn] == 450000){
		HumanMinute = 7.5;
	}
	else if(rres[Drone.StoreThis.RestartIn] == 600000){
		HumanMinute = 10;
	}
	else if(rres[Drone.StoreThis.RestartIn] == 1200000){
		HumanMinute = 20;
	}
	if(ric[Drone.StoreThis.RobCity] == 1){
		robCiti = 'New York';
	}
	else if(ric[Drone.StoreThis.RobCity] == 5){
		robCiti = 'Las Vegas';
	}
	else if(ric[Drone.StoreThis.RobCity] == 7){
		robCiti = 'Brazil';
	}
	else if(ric[Drone.StoreThis.RobCity] == 8){
		robCiti = 'Chicago';
	}
	else if(ric[Drone.StoreThis.RobCity] == 9){
		robCiti = 'London';
	}
	else if(ric[Drone.StoreThis.RobCity] == 10){
		robCiti = 'South Africa';
	}
	if(JBN[Drone.StoreThis.JobBurstsCount] <= 5){
		restartburstJT = 2800;
	}else if(JBN[Drone.StoreThis.JobBurstsCount] > 5){
		restartburstJT = 3200;
	}
	if(SBN[Drone.StoreThis.StamBurstsCount] <= 5){
		restartburstST = 2800;
	}else if(SBN[Drone.StoreThis.StamBurstsCount] > 5){
		restartburstST = 3500;
	}
	setTimeout(offon,500);
}

function offon() {
	selectedgroupvalue = Drone.StoreThis.PostToGroupWithID;
	selectedpostvalue = Drone.StoreThis.CommentToPostWithID;
	create_runningdiv();
	document.getElementById("killzdrone").onclick = function () {
		meepvar = 0;
		jobt = 0;
		stamt = 0;
		if (Drone.Running.Paused) {
			Drone.Running.Paused = false;
			if(should_post_level_up_on_start){
				should_post_level_up_on_start = false;
				try_autopost();
			}
			GoTime();
			document.getElementById("killzdrone").setAttribute("class", "sexy_button_new short green");
			document.getElementById("killzdrone").innerHTML = "<span><span>Running</span></span>";
		} else {
			ClearIVLS();
			Drone.Running.Paused = true;
			var pause_msg;
			if(run){
			    pause_msg = 'Pausing after arena finishes..';
			}
			else {
			    pause_msg = 'Drone Paused..';
			}
			logmsg(pause_msg, 'status');
			logmsg(pause_msg, 'true_log');
			document.getElementById("killzdrone").setAttribute("class", "sexy_button_new short red");
			document.getElementById("killzdrone").innerHTML = "<span><span>Stopped</span></span>";
			return;
		}
	};	
	if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isFobbing){
		document.getElementById("IRV").style.display = '';
		document.getElementById("IRJ").style.display = 'none';
		document.getElementById("iFl").style.display = 'none';
	}else{
		document.getElementById("IRV").style.display = 'none';
		document.getElementById("IRJ").style.display = '';
		document.getElementById("IRA").style.display = 'none';
		document.getElementById("gxRDivS").style.display = 'none';
	}
	if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isRobbing){
		document.getElementById("IRR").style.display = '';
		document.getElementById("iFl").style.display = 'none';
	}else{
		document.getElementById("IRR").style.display = 'none';
		document.getElementById("IRA").style.display = 'none';
		document.getElementById("gxRDivS").style.display = 'none';
	} 
	if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isArena){
		document.getElementById("IRA").style.display = '';
		document.getElementById("gxRDivS").style.display = '';
		document.getElementById("IRJ").style.display = 'none';
	}
	else{
		document.getElementById("IRJ").style.display = '';
		document.getElementById("IRA").style.display = 'none';
		document.getElementById("gxRDivS").style.display = 'none';
	}
	if(Restarter[Drone.StoreThis.Restart] == 'true'){
		document.getElementById("IRS").style.display = 'none';
	}else{
		document.getElementById("IRS").style.display = '';
	}

	document.getElementById("log_show").onclick = function () {
		$('#true_log').toggle();
		return false;
	};		

	document.getElementById("Flog_show").onclick = function () {
		$('#iskl').toggle();
		return false;
	};

	document.getElementById("loot_show").onclick = function(){
		$('#loot_log').toggle();
		return false;
	};

	$('#logclose').click(function(){
		if(Drone.StoreThis.RemoveLevelUpPost){
			try_delete_last_post();
		}
		ClearIVLS();
		Drone.Running.Paused = true;
		$('#gxRDiv').remove();
	});	
	TimedMessage('Starting Drone', 'status', 4);
	logmsg('Drone Loaded..', 'true_log');
	document.getElementById('RobCiti').innerHTML = robCiti;
	if(mytimestampin == 0){
		mytimestampin = 1;
		document.getElementById('ClockedIn').innerHTML = Drone.Check.Started;
	}
	if(Drone.StoreThis.LoadArenaPage){
		arenaPageCheckerId=Math.random();
		loadArenaPageChecker(arenaPageCheckerId);
	}
	
	checkit();		
}	

var lastLevel = 0;
var lastXPToLevel = 0;
var arenaPageCheckerId;

function loadArenaPageChecker(id){
	if(id===arenaPageCheckerId){
		try{
			//read XP to level
			var cLevel = parseInt(document.getElementById('user_level').innerHTML);
			var cXP = parseInt(document.getElementById('exp_to_next_level').innerHTML);
			
			//Only check if we gained xp and save current xp if the xp to level and xp to level was read correctly.
			if(!Drone.Running.Paused && cLevel == lastLevel && (lastXPToLevel - cXP < 200)){
				//Load arena, we seem to be stuck	
				if(Drone.StoreThis.RemoveLevelUpPost){
					try_delete_last_post();
				}
				setTimeout(function(){document.getElementById("arena_nav").click();},1000);
			}	
			else{
				lastLevel = cLevel;
				lastXPToLevel = cXP;
			}		
		}
		catch(e){}
		finally{
			//Check again in 6 minutes
			setTimeout(function(){loadArenaPageChecker(id);},6*60*1000);		
		}
	}
}


function ClearIVLS(){
	ittybitty = 0;
	meepvar = 0;
	clearInterval(Drone.Fighterx.AttackInterval);
	clearInterval(Drone.Fighterx.FLInterval);
	clearInterval(Drone.SpeedCFG.healInterval);
	clearInterval(Drone.SpeedCFG.startkilling);
	clearTimeout(Drone.Fighterx.FightWatchDogTimout);
	clearTimeout(Drone.Check.MLInt);
}

//
//{name: "New York"},
//{name: "Fight a Haitian Gang [1.60]", button: 17, city: 1, cost: 5, tab: 3, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 8},
//{name: "Repel the Yakuza [1.81]", button: 29, city: 1, cost: 11, tab: 5, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 20},
//{name: "Muscle in on a Triad Operation [1.95]", button: 65, city: 1, cost: 40, tab: 8, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 78},
//{name: "Settle a Beef... Permanently  [1.9167]", button: 69, city: 1, cost: 36, tab: 9, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 69},
//{name: "Make Arrangements for a Visiting Don [1.9167]", button: 74, city: 1, cost: 36, tab: 9, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 69},
//{name: "Travel to the Old Country [1.9565]", button: 76, city: 1, cost: 46, tab: 9, isOldCity: true, isUsingButton: false, isVegas: false, isTheXP: 90},
//{name: "Vegas"},
//{name: "Move The Take Out Of Town [1.96]", button: 40, city: 5, cost: 108, tab: 5, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 212},
//{name: "Stash The Take [1.99]", button: 44, city: 5, cost: 165, tab: 5, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 328},
//{name: "Rescue A Hotelier [1.97]", button: 50, city: 5, cost: 86, tab: 5, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 169},
//{name: "Nab A High Tech Prototype [2.03]", button: 68, city: 5, cost: 158, tab: 7, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 321},
//{name: "Dig Up Links To Halloran And A Meth Ring  [2.07]", button: 73, city: 5, cost: 165, tab: 8, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 342},
//{name: "Verify Halloran's Arrival At The Dam [2.03]", button: 77, city: 5, cost: 158, tab: 8, isOldCity: false, isUsingButton: false, isVegas: true, isTheXP: 321},
//{name: "Brazil"},
//{name: "Run a Collection Plate Con [1.38]", button: 9, city: 7, cost: 82, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 113},
//{name: "Assassinate a Politician at a Museum Gala [1.47]", button: 11, city: 7, cost: 115, tab: 1, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 169},
//{name: "Give Chase to the Neo-Imperium [1.98]", button: 59, city: 7, cost: 756, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1500},
//{name: "Bribe a Taubate Prison Worker [2.22]", button: 87, city: 7, cost: 648, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1430},
//{name: "Assassinate the Neo-Imperium's Primary Heads [2.19]", button: 95, city: 7, cost: 810, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1770},
//{name: "Chicago"},
//{name: "Secure Hooch to Sell in Your Joint [2.14]", button: 10, city: 8, cost: 324, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 692},
//{name: "Case Warehouses on North Side [2.13]", button: 12, city: 8, cost: 378, tab: 2, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 807},
//{name: "Flee the Scene Before the Police Arrive [1.96]", button: 48, city: 8, cost: 1350, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
//{name: "London Districts 3-8"},
//{name: "Approach The Police With Leads [2.05]", button: 19, city: 9, cost: 702, tab: 3, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1440},
//{name: "Run The Racket [1.98]", button: 32, city: 9, cost: 1134, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2240},
//{name: "Pay Off Your Debts [1.99]", button: 38, city: 9, cost: 1180, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2360},
//{name: "Run Your Empire [2.24]", button: 39, city: 9, cost: 1080, tab: 5, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2420},
//{name: "Ambush The Convoy Transporting The Gang Boss [2.09]", button: 43, city: 9, cost: 1240, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2590},
//{name: "Forge The Reports [2.18]", button: 45, city: 9, cost: 1350, tab: 6, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2930},
//{name: "Chase Down Your Son's Kidnappers [2.23]", button: 52, city: 9, cost: 1188, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
//{name: "Sneak Into The Manor [2.19]", button: 53, city: 9, cost: 1026, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2240},
//{name: "Retire To The Isle Of Wight [2.23]", button: 56, city: 9, cost: 1240, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2760},
//{name: "Investigate The Trail Of The Puzzle Box [2.25]", button: 58, city: 9, cost: 972, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2180},
//{name: "Steal The Puzzle Box [2.13]", button: 61, city: 9, cost: 1240, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
//{name: "Fight Off The Police [2.28]", button: 62, city: 9, cost: 1188, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2700},
//{name: "London District 9"},
//{name: "Set Up A Drug Racket From Your Kebab Shop (2.19)", button: 65, city: 9, cost: 972, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2132},
//{name: "Expand The Business With Turkish Smugglers' Help (2.19)", button: 66, city: 9, cost: 1026, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2247},
//{name: "Reap The Benefits (2.23)", button: 67, city: 9, cost: 1242, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2765},
//{name: "Suspect Foul Play (2.19)", button: 68, city: 9, cost: 1080, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2362},
//{name: "Silence Your Disloyal Associates (2.13)", button: 69, city: 9, cost: 1242, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
//{name: "Pretend To Be A Survivor (2.13)", button: 70, city: 9, cost: 1188, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2535},
//{name: "Get Compensation From Insurance Company (2.05)", button: 71, city: 9, cost: 1350, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2765},
//{name: "Open Various Branches Across London But Beware (2.05)", button: 72, city: 9, cost: 1404, tab: 9, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2880},
//{name: "London District 10"},
//{name: "Queue Up At The Grande Stadium For The Game (2.13)", button: 73, city: 9, cost: 972, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2132},
//{name: "Enjoy The Game At Rival Team's Cost (2.25)", button: 74, city: 9, cost: 972, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2247},
//{name: "Go To A Pub To Celebrate Your Team's Win (2.23)", button: 75, city: 9, cost: 1188, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2765},
//{name: "Poke Your Team's Victory In Rival Fans' Faces (2.23)", button: 76, city: 9, cost: 1242, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2362},
//{name: "Defend Yourself From The Rival's Fans (2.23)", button: 77, city: 9, cost: 1188, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2650},
//{name: "Make A Run For It And Hide (2.19)", button: 78, city: 9, cost: 1080, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2535},
//{name: "Speak To Your Uncle With Connections (2.22)", button: 79, city: 9, cost: 1296, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2765},
//{name: "Make The Club Pay For Their Disrespect (2.23)", button: 80, city: 9, cost: 1242, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2880},
//{name: "Secret District \"Round \& Round\""},
//{name: "Highjack The Bus Depot (2.03)", button: 940, city: 9, cost: 540, tab: 125, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1095}, 
//{name: "Smuggle In Illegal Substances (2.04)", button: 941, city: 9, cost: 648, tab: 125, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 1325}, 
//{name: "Broaden Your Clientele (1.90)", button: 942,city: 9,cost: 756,tab: 125,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1440}, 
//{name: "Refuse Rivals Offer (2.33)", button: 943,city: 9,cost: 594,tab: 125,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1383}, 
//{name: "Learn That The Cops Are Onto You (2.22)", button: 944,city: 9,cost: 648,tab: 125,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1440}, 
//{name: "Get Death Threats From Rival (2.06)", button: 945,city: 9,cost: 756,tab: 125,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1556}, 
//{name: "Allow Rival To Buy You Out (2.07)", button: 946,city: 9,cost: 564,tab: 125,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1786}, 
//{name: "Divert All Evidence To Rival (2.19)", button: 947,city: 9,cost: 972,tab: 125,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2132}, 
//{name: "Escape Scott Free (2.19)", button: 948,city: 9,cost: 1029,tab: 125,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2247},		
//{name: "Secret District \"Pay-To-Play\" \"Obelisk of Sao Paulo\""},
//{name: "Receive Upfront Payments [2.13]",button: 900,city: 7,cost: 540,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1152}, 
//{name: "Get Intel On Your Targets [2.22]",button: 901,city: 7,cost: 702,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1556}, 
//{name: "Let An Old Man Rest [1.93]",button: 902,city: 7,cost: 864,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1671}, 
//{name: "Visit The Burial Site [2.22]",button: 903,city: 7,cost: 648,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1440}, 
//{name: "Dodge Miss Mausoleum [2.06]",button: 904,city: 7,cost: 756,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1556}, 
//{name: "Set Up Position On The Obelisk [2.20]",button: 905,city: 7,cost: 864,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1901}, 
//{name: "Wait For The Procession [2.13]",button: 906,city: 7,cost: 702,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 1498}, 
//{name: "Assassinate The Second Target [2.19]",button: 907,city: 7,cost: 972,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2132}, 
//{name: "Fight Your Way Out Of The Obelisk [2.19]",button: 908,city: 7,cost: 1089,tab: 116,isOldCity: false,isUsingButton: true, isVegas: false, isTheXP: 2362}	


function TravelMeepMeep(){ 
	if(!Drone.Running.Paused && meepvar == 0){
		meepvar = 1;
		logmsg('Flying to NY!..', 'status');
		logmsg('Attempting a levelup..', 'true_log');
		ittybitty = 0;
		do_ajax('inner_page','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=1&tab=9', 1, 1, 0, 0);
		setTimeout(DoIttyBittyLevelr,plref[Drone.StoreThis.PageRefresh]);
	}
}

function DoIttyBittyLevelr(){
	if(Drone.Running.Paused){
		return;
	}
	if(ittybitty == 0){
		ittybitty = 1;
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		var actulevel = $('#user_level').text();
		if (actulevel != Drone.CurrentLevel){
			ittybitty = 0;
			meepvar = 0;
			logmsg('Levelup Attempt Successful..', 'true_log');
			setTimeout(JobTravelr,3500);
			return;
		}
		if(DoesIHaveEnergy > (dontmesswith+10)){
			meepvar = 0;
			ittybitty = 0;
			logmsg('Levelup Attempt Successful..', 'true_log');	
			setTimeout(JobTravelr, 2000);
			return;
		}
		if(DoesIHaveEnergy <= 35){
			ittybitty = 0;
			meepvar = 0;
			logmsg('Levelup Failed, Retrying Stamina..', 'true_log');
			setTimeout(StaminaTravelr,3500);
			return;
		}
		if (/These loot drops are needed for this job/.test(document.body.innerHTML)) {
			if(mytimestampout == 0){
				mytimestampout = 1;
				document.getElementById('ClockedOut').innerHTML = Drone.Check.Finished;
			}
			turnthebutton();				
			logmsg('Not enough consumables..', 'status');
			logmsg('Not enough consumables..', 'true_log');
			return;
		}
		if (/You do not have enough cash to do this job/.test(document.body.innerHTML)) {
			if(mytimestampout == 0){
				mytimestampout = 1;
				document.getElementById('ClockedOut').innerHTML = Drone.Check.Finished;
			}
			turnthebutton();
			logmsg('Not enough cash..', 'status');
			logmsg('Not enough cash..', 'true_log');
			return;		
		}
		if (/There are no secret districts currently open!/.test(document.body.innerHTML)) {
			if(mytimestampout == 0){
				mytimestampout = 1;
				document.getElementById('ClockedOut').innerHTML = Drone.Check.Finished;
			}
			turnthebutton();
			logmsg('Secret District Appears to of gone walkies..', 'status');
			logmsg('Secret District Appears to of gone walkies..', 'true_log');
			return;		
		}
		var onMarketPlace = document.evaluate('//div[contains(@class, "marketplace_controller")]//a[contains(., "ALL ITEMS")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
		if(onMarketPlace > 0){
			logmsg('Marketplace Tab, Why i go here..', 'status');
			logmsg('Marketplace Tab, Why i go here..', 'true_log');
			meepvar = 0;
			ittybitty = 0;
			setTimeout(JobTravelr, 3000);
			return;
		}
		var tabtest = document.evaluate('//li[contains(@class, "tab_on")]//a[contains(., "Boss")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
		if (tabtest == 0){
			meepvar = 0;
			ittybitty = 0;
			logmsg('Zynga issues, refreshing tab', 'true_log');
			setTimeout(TravelMeepMeep, 3500);
			return;
		}else{
			logmsg('Settling a Beef... Permanently...', 'status');
			logmsg('Repeating Job.. Attempting a Levelup', 'true_log');
			$('#city_job_69 > .job_action > a').click();
			setTimeout(ittyresetr,900);
			setTimeout(DoIttyBittyLevelr,1200);
		}
	}
}

function ittyresetr(){
	ittybitty = 0;
}


function resetxpjumper(){
	LondonIsNo = 0;
	ChicagoIsNo = 0;
	BrazilIsNo = 0;
	xpison = 0;
}


function ResetR() {
	Drone.Check.AmAwake = false;
	Drone.Check.AmRobbing = false;
}


function CloseDoopidPopup() {
	var actulevel = $('#user_level').text();
	if (actulevel != Drone.CurrentLevel && Drone.Check.GiveMeAPause == 0){
		Drone.Check.GiveMeAPause = 1;
		Drone.CurrentLevel = $('#user_level').text();
//		var mylvlmath = (Drone.CurrentLevel-Drone.StartLevel);
//		document.getElementById('Levelscleared').innerHTML = mylvlmath;
		setTimeout(mehleveler, 5000);
		grab_bonus();
	}
	if($('.pop_bg').length>0){
		$('.pop_bg').each( function(){
			var id = this.id;
			MW.Popup.hide( id.substr( id.lastIndexOf("_") +1 ) );
		});
	}
}	

function mehleveler(){
	Drone.Check.GiveMeAPause = 0;
}

function grab_bonus() {
	request('xw_controller=levelUpBonus&xw_action=addBonusItem&xw_city='+Drone.Check.ActiveCity+'&mwcom=1&no_load=1&xw_client_id=8',function(page){
		if (page.indexOf('ERROR 500: response never closed')!=-1) {
			return;
		} else {
			var data=JSON.parse(page.replace(/^(\s\d\s+)/,''));
			temp='';
			loot_log = [];
			temp = data.bonusName;
			temp = temp.replace(/A MYSTERY SHIPMENT CONTAINING /g,'');
			tehcount = 1;
			if(temp.match(/2 ANIMAL FEEDS/g)){
				tehcount = 2;
				temp = temp.replace(/^\d+\s+/,'');
			}else if(temp.match(/5 ANIMAL FEEDS/g)){
				tehcount = 5;
				temp = temp.replace(/^\d+\s+/,'');
			}
			temp = temp.replace(/A /g,'');
			temp = temp.replace(/AN /g,'');
			temp = temp.replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});
			loot_img = data.bonusImage;
			lastitem = data.bonusName;
			lastimg = data.bonusImage;
			Add_to_loot(temp,tehcount,loot_img);
			loot_log[loot_log.length] =  '<img src="'+loot_img+'" style="width: 20px; height: 20px;"></img> '+temp;
			logmsg('You Leveled to '+Drone.CurrentLevel+', You received: '+temp+'', 'true_log');
			var mylvlmath = (Drone.CurrentLevel-Drone.StartLevel);
			document.getElementById('Levelscleared').innerHTML = mylvlmath;
			if(Drone.StoreThis.RemoveLevelUpPost){
				try_delete_last_post();
			}

			var pause = (shouldPauseLevelUp(temp) || Drone.CurrentLevel === Drone.StoreThis.PauseOnLevel);
			var post = shouldPostLevelUp(temp);

			//Is set to true in try_autopost if posting succeeds.
			posted_level_up=false;

			if(post){
				if(pause){
					should_post_level_up_on_start = true;
				}
				else{			
					try_autopost();								
				}			
			}
			if(pause && !Drone.Paused){
				document.getElementById('killzdrone').click();
			}
		}
	});
};	

function shouldPostLevelUp(bonus){
	if(Drone.StoreThis.PostLevelUp==0){
		return false;
	}
	if(bonus.match(/3 Attack/i) || bonus.match(/3 Defense/i)){
		return true;
	}
	if(bonus.match(/Attack/i) || bonus.match(/Defense/i)){
		return Drone.StoreThis.PostOnItem>=1;
	}
	if(bonus.match(/Reward Point/i)){
		return Drone.StoreThis.PostOnItem>=2;
	}
	return Drone.StoreThis.PostOnItem==3;
}

function shouldPauseLevelUp(bonus){
	if(Drone.StoreThis.PauseOnItem==0){
		return false;
	}
	if(bonus.match(/3 Attack/i) || bonus.match(/3 Defense/i)){
		return true;
	}
	if(bonus.match(/Attack/i) || bonus.match(/Defense/i)){
		return Drone.StoreThis.PauseOnItem>=2;
	}
	if(bonus.match(/Reward Point/i)){
		return Drone.StoreThis.PauseOnItem>=3;
	}
	return Drone.StoreThis.PauseOnItem==4;		
}


function Add_to_loot(loot,count,img){
	total_loot+=count;
	if(loot_item.length <= 0){
		loot_item[loot_item.length]=new Array(loot,count,img);
	}
	else{
		for(i=0; i<loot_item.length; i++){
			if(loot == loot_item[i][0]){
				loot_item[i][1]+=count;
				break;
			}
			else if(i==loot_item.length-1){
				loot_item[loot_item.length]=new Array(loot,count,img);
				break;
			}
		}
	}
	loot_item.sort();
	document.getElementById('loot_log').innerHTML = '';
	loot_item.reverse();
	try{
		l_log = '';
		for(l=(loot_item.length-1); l>=0; l--){
			l_log += '<span class="good">'+loot_item[l][1]+'x</span> <img src="'+loot_item[l][2]+'" style="width:20px; height:20px" onmouseout="this.style.width=\'20px\';this.style.height=\'20px\';" onmouseover="this.style.width=\'40px\';this.style.height=\'40px\';"></img> '+loot_item[l][0]+'<br>';
		}
		document.getElementById('loot_log').innerHTML = l_log;
	}
	catch(err){alert(err);}
}	


function RatioChecker() { 
	var CurrentNRG = parseInt(document.getElementById('user_energy').innerHTML);
	var CurrentSTAM = parseInt(document.getElementById('user_stamina').innerHTML);
	var CurrentXP2LVL = parseInt(document.getElementById('exp_to_next_level').innerHTML);
	var NRGRATIOMATH = (CurrentXP2LVL/CurrentNRG);
	var STAMRATIOMATH = (CurrentXP2LVL/CurrentSTAM);
	var combinedEn2xp = (CurrentXP2LVL/(CurrentNRG+CurrentSTAM));
	Drone.Check.CurrentEnergyRatio = NRGRATIOMATH.toFixed(2);
	Drone.Check.CurrentStamRatio = STAMRATIOMATH.toFixed(2);
	Drone.Check.CombinedRatios = combinedEn2xp.toFixed(2);
	document.getElementById('nrg_ratio_reqd').innerHTML = NRGRATIOMATH.toFixed(2);
	document.getElementById('sta_ratio_reqd').innerHTML = STAMRATIOMATH.toFixed(2);
	document.getElementById('comb_ratio_reqd').innerHTML = combinedEn2xp.toFixed(2);
}

function request(url, handler, errorhandler) {
	var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
	if (url.indexOf('cb=') == -1) {
		url += '&cb='+User.id+timestamp;
	}
	if (url.indexOf('tmp=') == -1) {
		url += '&tmp='+timestamp;
	}
	User.clicks++;
	var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
	};
	$.ajax({
		type: "POST",
		url: preurl+url,
		data: params,
		cache: false,
		success: handler,
		error: errorhandler
	});
}	

function UpdateCashInHand(){
	Currcity = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper').className)[1];
	switch (parseInt(Currcity)) {
	case 1:
		Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_nyc').innerHTML.replace(/,/g, '').replace(/\$/g, '');
		break;
	case 2:
		Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_cuba').innerHTML.replace(/,/g, '').replace(/C\$/g, '');
		break;
	case 3:
		Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_moscow').innerHTML.replace(/,/g, '').replace(/R\$/g, '');
		break;
	case 4:
		Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_bangkok').innerHTML.replace(/,/g, '').replace(/B\$/g, '');
		break;
	case 5:
		Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_vegas').innerHTML.replace(/,/g, '').replace(/V\$/g, '');
		break;
	case 6:
		Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_italy').innerHTML.replace(/,/g, '').replace(/L\$/g, '');
		break;
	case 7:
		Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_brazil').innerHTML.replace(/,/g, '').replace(/BRL\$/g, '');
		break;
	case 8:
		ModifyChicagoSign = document.getElementById('user_cash_chicago').innerHTML.replace(/,/g, '');
		Drone.BankInfo.cash_in_hand = ModifyChicagoSign.substring(1);
		break;
	case 9:
		ModifyLondnSign = document.getElementById('user_cash_london').innerHTML.replace(/,/g, '');
		Drone.BankInfo.cash_in_hand = ModifyLondnSign.substring(1);
		break;
		
	}
}

function checkit(){
    if(Drone.Paused){
        return;
    }

	//If you move this to before 'if (Drone.StoreThis.Restart){' Drone will do jobs while in an arena (when you selected to use stamina first).
	if(run){
		meepvar = 0;
		jobt = 0;
		stamt = 0;
		logmsg('Waiting for spartacus to finish.', 'status');
		return;
	}
	var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
    var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	
	if(DoesIHaveEnergy < DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost && DoesIHaveStamina < DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost){
		logmsg('Are we out of resources? Refreshing to make sure.', 'status');
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&tab=0', 1, 1, 0, 0);
		setTimeout(checkit_out_of_resources,3000);
	}
	else if(SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
		setTimeout(JobTravelr, 3500);
		return;
	} else if(SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'jnrg'){
		if(DoesIHaveEnergy > DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
			setTimeout(JobTravelr, 3500);
			return;
		} else {
			turnthebutton();
			logmsg('Spent all energy Stopped..', 'status');
			logmsg('Spent all energy stopping..', 'true_log');
			return;
		}
	} else if(SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'stamina' && DoesIHaveStamina > DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost){
		setTimeout(StaminaTravelr, 3500);
		return;
	} else if(SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'jstam'){
		if(DoesIHaveStamina > DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost){
			setTimeout(StaminaTravelr, 3500);
			return;
		} else {
			turnthebutton();
			logmsg('Spent all stamina Stopped..', 'status');
			logmsg('Spent all stamina stopping..', 'true_log');
			return;
		}
	} else{
		if (DoesIHaveEnergy < DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost) {
			setTimeout(StaminaTravelr, 3500);
			return;
		} else {
			setTimeout(JobTravelr, 3500);
			return;
		}
	}
}

function checkit_out_of_resources(){
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
    if(DoesIHaveEnergy < DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost && DoesIHaveStamina < DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost){
       if(Drone.StoreThis.LevelMeUpOi && DoesIHaveEnergy >= 36){
		    dontmesswith = DoesIHaveEnergy;
		    meepvar = 0;
		    jobt = 0;
		    stamt = 0;
		    setTimeout(TravelMeepMeep,3500);
		    return;
	    }
	    if (Drone.StoreThis.Restart){
		    setTimeout(JobTravelr,rres[Drone.StoreThis.RestartIn]); 
		    meepvar = 0;
		    jobt = 0;
		    stamt = 0;
		    logmsg('Out of resources..', 'status');
		    logmsg('Restarting in '+HumanMinute+' minutes..', 'true_log');
		    return;
	    }
	    if(mytimestampout == 0){
		    mytimestampout = 1;
		    document.getElementById('ClockedOut').innerHTML = Drone.Check.Finished;
	    }
	    turnthebutton();
	    logmsg('Out of resources..', 'status');
	    logmsg('Out of resources..', 'true_log');
    }
    else{
	    logmsg('Not out of resources..', 'status');
	    setTimeout(checkit,500);
    }
}

function turnthebutton(){
	meepvar = 0;
	jobt = 0;
	stamt = 0;
	if (Drone.Running.Paused) {
		Drone.Running.Paused = false;
		GoTime();
		document.getElementById("killzdrone").setAttribute("class", "sexy_button_new short green");
		document.getElementById("killzdrone").innerHTML = "<span><span>Running</span></span>";
		return;
	} else {
		ClearIVLS();
		Drone.Running.Paused = true;
		document.getElementById("killzdrone").setAttribute("class", "sexy_button_new short red");
		document.getElementById("killzdrone").innerHTML = "<span><span>Stopped</span></span>";
		return;
	}
}


/********************************************************************************
 * 									Stamina										*
 ********************************************************************************/

function DoStaminaJob(){
	var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	spendSkillsChkr();
	if(Drone.Running.Paused){
		return;
	}
	jobt = 0;
	stamt = 0;
	UpdateCashInHand();
	if(Drone.StoreThis.ABank){
		BastardTehBanker();
	}
	RatioChecker();
	if(DoesIHaveStamina < DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost){
		setTimeout(checkit,3500);
		return;
	}
	if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost) {
		setTimeout(checkit,3500);
		return;
	}
	if(Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.NormStamUntil == true){
		if (DoesIHaveStamina <= Drone.StoreThis.NormalStamUntillValue && Drone.JobOptions.NormStamUntil == true){
			logmsg('Switching to secondry stamina job...', 'true_log');
			logmsg('Switching to secondry stamina job...', 'status');			
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			Drone.JobOptions.DoExtraStam++;
			stamuntill = DoesIHaveStamina;
			travelToStaminaCity();
			setTimeout(StaminaTravelr, 3500);
			return;
		}
	}else if(Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.RatioStam == true){
		if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){
			logmsg('Switching to secondry stamina job...', 'true_log');
			logmsg('Switching to secondry stamina job...', 'status');			
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			Drone.JobOptions.DoExtraStam++;
			stamratio = Drone.Check.CombinedRatios;
			travelToStaminaCity();
			setTimeout(StaminaTravelr, 3500);
			return;
		}
	}	
	if(Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true){
		if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue){
			logmsg('Switching back to primary stamina job...', 'true_log');
			logmsg('Switching back to primary stamina job...', 'status');
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			travelToStaminaCity();
			setTimeout(StaminaTravelr, 3500);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}else if(Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true){
		if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue){			
			logmsg('Switching back to primary stamina job...', 'true_log');
			logmsg('Switching back to primary stamina job...', 'status');
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			travelToStaminaCity();
			setTimeout(StaminaTravelr, 3500);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}

	if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isGroupPeople){
		HNY = 0;
		dah = 0;
		Drone.SpeedCFG.healInterval = setInterval(DoAutoHeal, 5000);
		Drone.SpeedCFG.startkilling = setInterval(IceCheckEm, 15000);
		IceCheckEm();
		return;
	}
	if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isFighting){
		HNY = 0;
		dah = 0;
		HitTehfLs();
		return;
	}
	if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isHopper){
		HNY = 0;
		dah = 0;
		hopper();
		return;
	}
	dostaminajobnow();
	CloseDoopidPopup();
}

function travelToStaminaCity(){
	if(!DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isArena){
		var destination = DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].city;
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;destination='+destination+'&amp;nextParams=&amp;menu=travel', 1, 1, 0, 0); 
	}
}

function dostaminajobnow(){
	if (DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isFobbing) {
		var DoesIHaveExp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
		if(bhhk == 1){
			var Wording = $('#side_container').text();
			var FindItNow = /You won the fight!/g;
			var Annnnd = FindItNow.test(Wording);
			if(Annnnd == true){
				var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
				if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost * SBN[Drone.StoreThis.StamBurstsCount] <= DoesIHaveStamina && DoesIHaveExp > DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isTheXP * SBN[Drone.StoreThis.StamBurstsCount] && Drone.StoreThis.StamBursts){
					for (var i=0; i < SBN[Drone.StoreThis.StamBurstsCount]; i++) {
						fn();
					}
					Drone.updateStats(SBN[Drone.StoreThis.StamBurstsCount], 'FobsDone');
					logmsg('Doing Job..', 'status');
					logmsg('Repeating Job.. Using Bursts (x'+SBN[Drone.StoreThis.StamBurstsCount]+')', 'true_log');
					setTimeout(DoStaminaJob, restartburstST);
					return;
				}else{
					Drone.updateStats(1, 'FobsDone');
					logmsg('Doing Job..', 'status');
					logmsg('Repeating Job..', 'true_log');
					fn();
					setTimeout(DoStaminaJob,1000);
					return;
				}
			}else{
				bhhk = 0;
				bhk = 0;
			}
		}
		if(bhk == 1){
			fn();
			Drone.updateStats(1, 'FobsDone');
			logmsg('Doing Job..', 'status');
			logmsg('Repeating Job..', 'true_log');
			bhhk = 1;
			setTimeout(DoStaminaJob,3000);
			return;
		}else{
			bhk = 0;
		}				
		if(blitz == 1){
			var Wording = $('#side_container').text();
			var FindItNow = /You won the fight!/g;
			var Annnnd = FindItNow.test(Wording);
			if(Annnnd == true){
				fn();
				Drone.updateStats(1, 'FobsDone');
				logmsg('Doing Job..', 'status');
				logmsg('Repeating Job..', 'true_log');
				bhk = 1;
				setTimeout(DoStaminaJob,1000);
				return;
			}else{
				blitz = 0;
			}
		}
		targetElts = $x('.//a[contains(@onclick,"doFightJob('+DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].button+'")]');
		numTargets = targetElts.length;
		if(numTargets == 0){
			logmsg('Reloading Vegas tab..', 'true_log');
			setTimeout(StaminaTravelr, 2000);
			return;
		}
		if(numTargets){
			var OppName, OppSize, OppLevel;
			var smallestMafia = Drone.StoreThis.opponentMafiaMax;
			var lowestLevel = Drone.StoreThis.opponentLevelMax;
			var foundOpp = false;
			for(i=0;i<numTargets;i++){
				targetParent = targetElts[i].parentNode.parentNode;
				parentNoTags = targetParent.innerHTML.untag();
				if (parentNoTags.match(/(.+?)\s+(.+?)\s+(.+?)\s+Fight/i)) {
					OppName = RegExp.$1;
					OppSize = parseInt(RegExp.$2);
					OppLevel = parseInt(RegExp.$3);
				} else {
					OppNameElt = xpathFirst('.//dt[@class="name"]//span[@class="player_data"]', targetParent);
					if(OppNameElt) OppName = OppNameElt.innerHTML.untag();
					OppSizeElt = xpathFirst('.//dd[@class="group_size"]//span[@class="player_data"]', targetParent);
					if(OppSizeElt) OppSize = parseInt(OppSizeElt.innerHTML.untag());
					OppLevelElt = xpathFirst('.//dd[@class="level"]//span[@class="player_data"]', targetParent);
					if(OppLevelElt) OppLevel = parseInt(OppLevelElt.innerHTML.untag());
				}
				if((OppSize !=0 && OppLevel != 0) && (OppSize < smallestMafia || (OppSize == smallestMafia && OppLevel < lowestLevel)) ){
					OppTarget = targetElts[i];
					OppTargetParent = targetParent;
					smallestMafia = OppSize;
					lowestLevel = OppLevel;
					foundOpp = true;
				} else {}
			}
			if(foundOpp){
				logmsg('Doing Job..', 'status');
				logmsg('Repeating Job..', 'true_log');
				Drone.updateStats(1, 'FobsDone');
				fn = new Function(OppTarget.getAttribute('onclick'));
				fn();
				blitz = 1;
				setTimeout(DoStaminaJob,2500);
				return;
			} else {

				do_ajax ('inner_page', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination='+DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].city+'&tab='+DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].tab+'', 1, 1, 0, 0);	
				setTimeout(DoStaminaJob,plref[Drone.StoreThis.PageRefresh]);
				logmsg('No targets found refreshing tab..', 'status');
				return;
			}
		}

	} 
	else if (DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isFighting) {
	}
	else if (DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isRobbing){ 
		if(Drone.Check.AmRobbing){
			return;
		}
		Drone.Check.AmRobbing = true;
		var tabtest = document.evaluate('//li[contains(@class, "tab_on")]//a[contains(., "Robbing")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
		if (tabtest == 0){
			setTimeout(StaminaTravelr,plref[Drone.StoreThis.PageRefresh]);
			Drone.Check.AmRobbing = false;
			return;
		}
		var spreecount = parseInt($('#call_sprees_left').text());
		if(spreecount > 0 && RS[Drone.StoreThis.RobSquads] == 'true'){
			logmsg('Robbing the board with Robsquads..', 'status');
			logmsg('Robbing the board with Robsquads..', 'true_log');
			document.getElementById("oneClickRobAll").click();
			setTimeout(RefreshMe, rref[Drone.StoreThis.RobbingPageRefresh]);
			setTimeout(ResetR,2850);
			return;
		}
		var slotcount = 8;
		for (var i=8; i >=0; i--) {
			setTimeout("do_ajax('','remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=1&slot="+slotcount+"', 1, 0, RobbingController.preRob(2), RobbingController.rob);",i*ris[Drone.StoreThis.RobbingSlotSpeed]);
			slotcount--;
		}
		setTimeout(RefreshMe, rref[Drone.StoreThis.RobbingPageRefresh]);
		setTimeout(ResetR,2850);
		logmsg('Robbing the board..', 'status');
		logmsg('Robbing the board..', 'true_log');
	}
	else if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isArena){
		document.getElementById("IRA").style.display = '';
		document.getElementById("gxRDivS").style.display = '';
		document.getElementById("IRV").style.display = 'none';
		document.getElementById("IRJ").style.display = 'none';
	    document.getElementById("iFl").style.display = 'none';
			
		if(document.getElementById("spartacus_main")!=null){
			drone_join_arena();
		}
		else{
			add_spartacus();
			setTimeout(drone_join_arena,5000);
		}
	}
}

function drone_join_arena(){
	if(!run) {
	    Drone.updateStats(1, 'ArenasJoined');
		run = true;
		check_stamina(join_arena);
		logmsg('Joined arena.', 'true_log');
		setTimeout(checkit,2500);
	} 
}

function RefreshMe() {
	try{
		var IsEveryoneDeadYet = document.evaluate("//a[@id=\"rob_refresh_cost\"]//span//span[contains(string(),'Refresh: 0')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		if (IsEveryoneDeadYet.snapshotLength >= 1) {
			CloseDoopidPopup();
			setTimeout(DoStaminaJob, plref[Drone.StoreThis.PageRefresh]);
			do_ajax ('inner_page', 'remote/html_server.php?xw_controller=robbing&xw_action=refresh', 1, 1, 0, 0);
			Drone.Check.BoardsCleared++;
			document.getElementById('Bcleared').innerHTML = Drone.Check.BoardsCleared;
			logmsg('Refreshing the board..', 'status');
		} else {
			DoStaminaJob();
		}
	} catch(err){}
}


function xpathFirst(p, c) { 
	return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}


function StaminaTravelr(){
	if(Drone.Running.Paused){
		return;
	}
	if(stamt == 0){
		stamt = 1;
		Drone.Check.GiveMeAPause = 0;
		resetxpjumper();
		if (document.getElementsByClassName("bandit-eliminate-btn").length > 0) {
			var a = document.getElementsByClassName("sexy_button_new sexy_button_new short red impulse_buy")[0];
			if (!a) {
				setTimeout(JobTravelr, 3000);
				return;
			}
			try{
				var nqued = $('#btn_queue').text();
				var anqued = nqued.substring(2);
				if ($(".bandit-desc").text() == "XP Bandit" && anqued > 0 ) {
					logmsg('Someone tried to fly out with not killing the XP Bandit!', 'true_log');
					logmsg('Annihilated him..Hopefully', 'true_log');
					clearInterval(DroneXtimer);
					FUUUUUUU = 0;
					a.click();
					setTimeout(JobTravelr, 6000);
					return;
				}
				if(anqued == 0){
					logmsg('No crew to kill the bandit!!!', 'true_log');
					logmsg('Leaving him there..', 'true_log');
				}
			}catch (err){}
		}
		if(!DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isArena){
			logmsg('Traveling..', 'status');
			logmsg('Traveling..', 'true_log');
		}
		bhhk = 0;
		ClearIVLS();
		ResetR();		
		CloseDoopidPopup();
		document.getElementById('ActiRes').innerHTML = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_stamina_16x16.png">' +DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].name;
		document.getElementById("SBTD").style.display = 'none';
		if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isFobbing){
			document.getElementById("IRV").style.display = '';
			document.getElementById("IRJ").style.display = 'none';
			document.getElementById("iFl").style.display = 'none';
		    document.getElementById("IRA").style.display = 'none';
			document.getElementById("gxRDivS").style.display = 'none';
			do_ajax ('inner_page', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination='+DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].city+'&tab='+DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].tab+'', 1, 1, 0, 0);
		} else if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isGroupPeople){
			do_ajax("inner_page", "remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=9&destination="+fic[Drone.StoreThis.FightCity]+"&from=stats&zone=1&user=" + Drone.Fighterx.user_list[user_list_selector], 1, 1, 0, 0);
		} else if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isFighting){
			document.getElementById("iFl").style.display = '';
			do_ajax("inner_page", "remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=9&destination="+fic[Drone.StoreThis.FightCity]+"&from=fight", 1, 1, 0, 0);
		} else if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isHopper){
			document.getElementById("iFl").style.display = '';
			do_ajax("inner_page", "remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=9&destination="+fic[Drone.StoreThis.FightCity]+"&from=fight", 1, 1, 0, 0);
		} else{
			document.getElementById("iFl").style.display = 'none';
			if(!DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isArena){
				do_ajax ('inner_page', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&destination='+ric[Drone.StoreThis.RobCity]+'&from=robbing&zone=1&nextParams=&menu=travel', 1, 1, 0, 0);
			}
			
		} 
		setTimeout(DoStaminaJob,plref[Drone.StoreThis.PageRefresh]);
	}
}


function hopper() {
	if(Drone.Running.Paused){
		return;
	}	
	Drone.Fighterx.AttackInterval = setInterval(Fighter, aref[Drone.StoreThis.AttackSpeed]);
	Drone.SpeedCFG.healInterval = setInterval(DoAutoHeal, 5000);	  
	loadNextHopper();
	Drone.Check.MLInt = setInterval(Hopperlist, 4000);
}


function Hopperlist() {
	if(Drone.Running.Paused){
		return;
	}
	if(/This player is currently part of your mafia/.test(document.body.innerHTML)){
		closeFightPop();
		logmsg('User in your Mafia, skipped..', 'true_log');
	}
	if (commonFightCheck()){return;}
	if ((document.getElementsByClassName("impulse_buy_prompt contextual").length > 0) || (document.evaluate('//li[contains(@class, "tab_on tab_middle")]//a[contains(., "Fighters")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength == 0)) {
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&tab=0', 1, 1, 0, 0);
		return;
	}
	else{
		logmsg('Fetching next Hopper target..', 'status');
		Drone.Check.livelinkindex++;
		loadNextHopper();
	}
}

function loadNextHopper() {
	if(Drone.Running.Paused){
		return;
	}
	if (Drone.Check.livelinkindex >= Drone.Check.livelinks.length) {
		logmsg('Fetching Hopper targets..', 'status');
		Drone.Check.livelinkindex = 0;
		Drone.Check.livelinks = [];
		getLiveHopper();
		setTimeout(loadHopperTarget, 1500);
	} else {
		loadHopperTarget();
	}
}

function getLiveHopper() {
	if(Drone.Running.Paused){
		return;
	}
	logmsg('Getting bucket ID '+ Drone.StoreThis.hopperid +'..', 'status');
	$.getJSON("http://mwlists.com/_api/_getlive.php?bucket=" + Drone.StoreThis.hopperid + "&authid=6aBaJrKahGYVpL9B&callback=?", function (data) {
		var stuff = eval(data);
		for (i = 0; i < stuff.length; i++) {
			if (stuff[i].mwid != "none") {
				Drone.Check.livelinks[Drone.Check.livelinks.length] = stuff[i].mwid;
			}
		}
	});
}

function loadHopperTarget() {
	if(Drone.Running.Paused){
		return;
	}
	for (var i = Drone.Check.livelinkindex; i <= Drone.Check.livelinks.length; i++) {
		if (!Drone.Fighterx.umwavoidlist.isAvoid(Drone.Check.livelinks[i])) break;
		Drone.Check.livelinkindex++;
	}
	if (Drone.Check.livelinkindex < Drone.Check.livelinks.length) {
		var fightlist = document.getElementsByClassName("action");
		fightlist[1].firstElementChild.href = fightlist[1].firstElementChild.href.replace(/opponent_id=p%7C\d+/,"opponent_id="+Drone.Check.livelinks[Drone.Check.livelinkindex]);
		logmsg('Attacking..', 'true_log');	
		fightlist[1].firstElementChild.click();
	} else {
		logmsg('Gone thru them all..', 'true_log');
	}
}

function IceCheckEm() {
	if (isFightPopOpen()) {
		return;
	}
	if(Drone.Running.Paused){
		return;
	}
	UpdateCashInHand();		
	if(Drone.StoreThis.ABank){
		BastardTehBanker();
	}
	if (document.getElementsByClassName("impulse_buy_prompt contextual").length > 0) {
		StaminaTravelr();
		return;
	}
	health = parseInt(document.getElementById("user_health").innerHTML);
	if (health < Drone.StoreThis.Health) {
		return;
	}
	RatioChecker();
	var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	if(Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.NormStamUntil == true){
		if (DoesIHaveStamina <= Drone.StoreThis.NormalStamUntillValue && Drone.JobOptions.NormStamUntil == true){
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam++;
			return;
		}
	}else if(Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.RatioStam == true){
		if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){		
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam++;
			return;
		}
	}	
	if(Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true){
		if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue){
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}else if(Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true){
		if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue){			
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}
	if(Drone.JobOptions.DoExtraStam == 1){
		if(DoesIHaveStamina > (stamuntill+10)){
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
		if(Drone.Check.CombinedRatios > stamratio){
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}
	if(DoesIHaveStamina < DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost){
		setTimeout(checkit,3500);
		return;
	}
	if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost) {
		setTimeout(checkit,3500);
		return;
	}
	if (/This mafia member was not found/.test(document.body.innerHTML)) {
		logmsg('MW Hid the profile, giz a second i reload it', 'status');
		logmsg('MW Hid the profile, giz a second i reload it', 'true_log');
		setTimeout(StaminaTravelr,3500);
		return;
	}
	var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
	var tabtest = document.evaluate('//div[contains(@id, "tab_container")]//a[contains(., "Profile")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
	if(tabtest > 0){
		logmsg('Ice Checking them..', 'status');
		var hitlist_url;
		var ATag = document.getElementsByTagName('a');
		Drone.Fighterx.user_names[user_list_selector] = /levels">\((.*?)\)/.exec(document.body.innerHTML)[1];
		var ineedpid = 'p|' + /user=p\|(\d+)'.+>Profile/.exec(document.body.innerHTML)[1];
		Drone.Fighterx.target_name = /levels">\((.*?)\)/.exec(document.body.innerHTML)[1];
		for(var i=0; i<ATag.length; i++){
			if (hit=/xw_controller=hitlist&xw_action=set&xw_city=(\d+).*?tmp=([a-z0-9]+).*?cb=([a-z0-9]+).*?target_pid=(\d+).*?mwzy_token=([a-f0-9]+)/.exec(ATag[i].href)){
				hitlist_url = 'remote/html_server.php?xw_controller=hitlist&xw_action=set&xw_city='+hit[1]+'&tmp='+hit[2]+'&cb='+hit[3]+'&xw_person='+userid.substr(2, userid.length)+'&target_pid='+hit[4]+'&mwzy_token='+hit[5]+'&xw_client_id=8';
			}
		}
		mytrigger = document.getElementById("btn_attack_" + ineedpid.replace("|", ""));
		requestHL(hitlist_url);
	} else {
		StaminaTravelr();
	}
}	

function requestHL(url, handler, errorhandler) {
	Currcity = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper').className)[1];
	url = url.replace('remote/', '');
	User.clicks++;
	var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_city': Currcity,
			'clicks': User.clicks,
			'update': false
	};
	var ajax_error = 0;

	function process_ajax() {
		$.ajax({
			type: "POST",
			url: url,
			data: params,
			cache: false,
			timeout: 20000,
			success: function (e) {
			if (/is already dead or too weak!/.test(e)) {
				clearInterval(Drone.SpeedCFG.startkilling);
				logmsg(''+Drone.Fighterx.target_name+' is tooooooooo dead/weak, next user..', 'true_log');
				next_user();
				return;
			} else {
				if (/The action was not able to be completed/.test(e)) {
					logmsg('Zynga packet error, fail action! retrying...', 'true_log');
					return;
				} else {
					if (/Sucker Punch/.test(document.body.innerHTML)) {
						logmsg('hitting '+Drone.Fighterx.target_name+'..', 'true_log');
						mytrigger.click();
						kill();
						return;
					}
				}
			}
		},
		error: function (e) {
			return;
		}
		});
	}
	process_ajax();
}

function kill(){
	var actulevel = $('#user_level').text();
	var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	if(Drone.Running.Paused){
		return;
	}		
	if (actulevel != Drone.CurrentLevel){
		setTimeout(StaminaTravelr,2500);
		return;
	}
	UpdateCashInHand();		
	if(Drone.StoreThis.ABank){
		BastardTehBanker();
	}
	if(Drone.JobOptions.DoExtraStam == 1){
		if(DoesIHaveStamina > (stamuntill+10)){
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
		if(Drone.Check.CombinedRatios > stamratio){
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}
	else if(Drone.JobOptions.DoExtraStam == 0){
		if(DoesIHaveStamina < stamuntill){
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam++;
			return;
		}
		if(Drone.Check.CombinedRatios < stamratio){
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam++;
			return;
		}
	}
	try{
		if (document.getElementById("fv2_defender_was_iced").style.display == "block"){
			setTimeout(closeFightPop,500);
			setTimeout(IceCheckEm,600);
			return;
		}
		if (document.getElementById("fv2_defender_overlay_stolen").style.display == "block"){
			setTimeout(closeFightPop,500);
			setTimeout(IceCheckEm,600);
			return;
		}
		if (document.getElementById("fv2_defender_overlay_iced").style.display == "block") {
			setTimeout(closeFightPop,500);
			setTimeout(IceCheckEm,600);
			++Diced;
			document.getElementById('icedsome').innerHTML = Diced;
			return;
		}
		if (document.getElementById("fv2_defender_overlay_killed").style.display == "block") {
			setTimeout(closeFightPop,500);
			setTimeout(IceCheckEm,600);
			++Dkilled;        
			document.getElementById('killedsome').innerHTML = Dkilled;
			return;
		}
	}catch(err){}
	health = parseInt(document.getElementById("user_health").innerHTML);
	DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	RatioChecker();
	if (health < Drone.StoreThis.Health) {
		setTimeout(kill,aref[Drone.StoreThis.AttackSpeed]);			
		return; 
	}
	if (DoesIHaveStamina <= 75) {
		setTimeout(closeFightPop,500);
		setTimeout(IceCheckEm,2500);
		return;
	}
	var myinfonowdammit = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper').className)[1];
	if (myinfonowdammit != fic[Drone.StoreThis.FightCity]){
		fightcitytravlr();
		return;
	}
	myi = $('#fightv2_poweratkbtn_boost_off').children('a');
	myi.click();
	setTimeout(kill,aref[Drone.StoreThis.AttackSpeed]);
	logmsg('Keeeeling '+Drone.Fighterx.target_name+'..', 'true_log');
}

function next_user() {
	if(Drone.Running.Paused){
		return;
	}
	user_list_selector++;
	if (user_list_selector >= Drone.Fighterx.user_list.length) {
		logmsg('Reached last member, reloading..', 'true_log');
		user_list_selector = 0;
		StaminaTravelr();
		return;
	}
	StaminaTravelr();
	logmsg('next user coming up..', 'true_log');
}

function HitTehfLs(){
	if(Drone.Running.Paused){
		return;
	}	
	logmsg('Attacking the Fight List..', 'status');
	Drone.Fighterx.FLInterval = setInterval(Fightlist, 5000);
	Drone.Fighterx.AttackInterval = setInterval(Fighter, aref[Drone.StoreThis.AttackSpeed]);
	Drone.SpeedCFG.healInterval = setInterval(DoAutoHeal, 5000);
	Fightlist();
}

function fightcitytravlr() {
	if(Drone.Running.Paused){
		return;
	}
	logmsg('Flying to Fightcity..', 'status');
	do_ajax ('inner_page', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&destination='+fic[Drone.StoreThis.FightCity]+'&from=index&nextParams=&menu=travel', 1, 1, 0, 0);
	setTimeout(StaminaTravelr,plref[Drone.StoreThis.PageRefresh]);
	return;
}

function isFightPopOpen() {
	if (document.getElementById("fv2_widget_wrapper")) {
		if (document.getElementById("fv2_widget_wrapper").style.display != "none") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function commonFightCheck(){
	if(Drone.Running.Paused){
		return;
	}	
	if (Drone.Fighterx.FightActionRunning || isFightPopOpen()) {
		return true;
	}else{
		return false;
	}
}		

function Fightlist() {
	if(Drone.Running.Paused){
		return;
	}
	RatioChecker();
	var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	if(Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.NormStamUntil == true){
		if (DoesIHaveStamina <= Drone.StoreThis.NormalStamUntillValue && Drone.JobOptions.NormStamUntil == true){
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam++;
			return;
		}
	}else if(Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.RatioStam == true){
		if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam++;
			return;
		}
	}	
	if(Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true){
		if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue){
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}else if(Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true){
		if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue){			
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}

	if(DoesIHaveStamina < DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost){
		setTimeout(checkit,3500);
		return;
	}
	if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost) {
		setTimeout(checkit,3500);
		return;
	}
	var i;
	if (commonFightCheck()){return;}
	if ((document.getElementsByClassName("impulse_buy_prompt contextual").length > 0) || (document.evaluate('//li[contains(@class, "tab_on tab_middle")]//a[contains(., "Fighters")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength == 0)) {
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&tab=0', 1, 1, 0, 0);
		return;
	}
	Drone.Fighterx.FightActionRunning = true;
	clearTimeout(Drone.Fighterx.FightWatchDogTimout);
	Drone.Fighterx.FightWatchDogTimout = setTimeout(resetfightaction, 15000);
	var fightlist = document.getElementsByClassName("action");
	var randomizer = Math.floor(Math.random() * (fightlist.length - 1)) + 1;
	var i_am_a = document.getElementsByClassName("fightbar_text")[0].innerHTML;
	if (/HUNTER/.test(i_am_a)) {
		i_am_a = "human";
	} else {
		i_am_a = "werewolf";
	}
	for (i = fightlist.length - randomizer; i > 1; i--) {
		var iced = fightlist[i].parentNode.firstElementChild.className;
		try{
			var they_are_a = /fighter is (werewolf|human)/.exec(fightlist[i].parentNode.firstElementChild.innerHTML)[1];}catch(err){var they_are_a = "human";}
			if ((iced != "fight_list_player_dead") && (i_am_a == "werewolf" || i_am_a != they_are_a)){
				break;
			}
	}
	logmsg('Attacking..', 'true_log');
	Drone.Fighterx.targetid = fightlist[i].firstElementChild.id.replace('btn_attack_p', 'p|');
	fightlist[i].firstElementChild.click();
	CloseDoopidPopup();
}			

function resetfightaction() {
	if(Drone.Running.Paused){
		return;
	}	
	Drone.Fighterx.FightActionRunning = false;
	closeFightPop();
}	

function closeFightPop() {
	if(Drone.Running.Paused){
		return;
	}	
	Drone.Fighterx.ajax = true;
	Drone.Fighterx.closing = false;
	CloseJS();
}	

function Fighter() {
	if(Drone.Running.Paused){
		return;
	}	
	RatioChecker();
	var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	if(Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.NormStamUntil == true){
		if (DoesIHaveStamina <= Drone.StoreThis.NormalStamUntillValue && Drone.JobOptions.NormStamUntil == true){
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam++;
			return;
		}
	}else if(Drone.JobOptions.DoExtraStam == 0 && Drone.JobOptions.RatioStam == true){
//		if (Drone.Check.CurrentStamRatio <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){
		if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingStamValue && Drone.JobOptions.RatioStam == true){
			Drone.JobOptions.StamPrimaryOrSecondary = "SecondryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam++;
			return;
		}
	}	
	if(Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.NormStamUntil == true){
		if (DoesIHaveStamina >= Drone.StoreThis.NormalStamUntillValue){
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}else if(Drone.JobOptions.DoExtraStam == 1 && Drone.JobOptions.RatioStam == true){
		if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingStamValue){
			Drone.JobOptions.StamPrimaryOrSecondary = "PrimaryStaminaJobInfo";
			setTimeout(StaminaTravelr, 2000);
			Drone.JobOptions.DoExtraStam--;
			return;
		}
	}

	if(DoesIHaveStamina < DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost){
		setTimeout(checkit,3500);
		return;
	}
	if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'energy' && DoesIHaveEnergy > DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost) {
		setTimeout(checkit,3500);
		return;
	}
	var times;
	var i;
	var health;
	UpdateCashInHand();		
	if(Drone.StoreThis.ABank){
		BastardTehBanker();
	}
	if (Drone.Fighterx.newfighton) {
		if (isFightPopOpen()) {
			var elem = document.getElementById("attacker_fight_status");
			if (!/Lost/.test(elem.innerHTML)) {
				elem = document.getElementsByClassName("sexy_button_new short red impulse_buy fightV2AttackBtn");
				if (document.getElementsByClassName("sexy_button_new short red impulse_batch_buy fightV2AttackBtn").length > 0) {
					elem = document.getElementsByClassName("sexy_button_new short red impulse_batch_buy fightV2AttackBtn")[1];
				}
				if (document.getElementById("fightv2_poweratkbtn_boost_on").style.display == 'block' || document.getElementById("fightv2_poweratkbtn_boost_off").style.display == 'block') {
					health = parseInt(document.getElementById('user_health').innerHTML);
					if (health < 30) {
						return;
					} 
					url = elem.href.replace('remote/', '');
					if (Drone.StoreThis.BurstsOn) {
						url = url.replace('click_amt=1', 'click_amt='+Bcount[Drone.StoreThis.Bursts]);
					}
					Bursts = 2;
					for(i=0;i<Bursts;i++){
						var client = new XMLHttpRequest();
						client.open("POST", url, true);
						client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
						client.setRequestHeader("Accept", "*/*");
						client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						client.send("ajax=1&liteload=1&sf_xw_user_id=" + Drone.Fighterx.xw_user + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
						client.onreadystatechange = function () {
							if (this.readyState == 4) {
								response = client.responseText;
								try {
									var msg = JSON.parse(response);
								} catch (err) {
									return;
								}

								if(!msg.fight_result) return;
								document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
								User.health = msg.user_fields.user_health;
								Drone.Check.CurrentHealth = msg.user_fields.user_health;
								FightV2.powerAttack(msg, this);
								parseNewFightResults(response);
								var PercentComplete = (/percent_complete":([\d]+),"/.exec(response))[1];
								document.getElementById("level_bar").setAttribute('style', 'overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: ' + PercentComplete + '%;');
								document.getElementById("exp_to_next_level").innerHTML = (/exp_to_next_level":([\d]+),/.exec(response))[1];
								document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
								document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
								document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
								document.getElementById("user_cash_london").innerHTML = 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£' + (/user_cash_london":"\\u00a3([\d,]+)"/.exec(response))[1];
								document.getElementById("user_cash_chicago").innerHTML = 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢' + (/user_cash_chicago":"\\u00a2([\d,]+)"/.exec(response))[1];
								document.getElementById("user_cash_southafrica").innerHTML = (/user_cash_southafrica":"([R \d,]+)"/.exec(response))[1];
								document.getElementById("user_stamina").innerHTML = (/user_stamina":([\d]+)/.exec(response))[1];
							}
						};
						return;
					}}
			}

			Drone.Fighterx.newfighton = false;
			if (!Drone.Fighterx.closing) {
				setTimeout(closeFightPop, 2500);
			}
			Drone.Fighterx.closing = true;
		}
	}
}

function parseNewFightResults(response) {
	if(Drone.Running.Paused){
		return;
	}	
	RatioChecker();
	var elem = document.getElementById("attacker_fight_status");
	if(!elem)return;
	var lost = /Lost/.test(elem.innerHTML);
	if (!lost) {
		if (!Drone.Fighterx.newfighton) {
			Drone.Fighterx.newfighton = true;
		}
	} else {
		Drone.Fighterx.newfighton = false;
		if (isFightPopOpen()) {
			setTimeout(closeFightPop, 2500);
		}
	}
	if (document.getElementById("fv2_defender_overlay_iced").style.display == 'block') {
		if ((/boost', 'link': '(.+?)'/.test(response))) {
			++Diced;
			document.getElementById('icedsome').innerHTML = Diced;
			publishDIce(response);

			return;
		}
	}
	if (document.getElementById("fv2_defender_overlay_killed").style.display == 'block') {
		if ((/boost', 'link': '(.+?)'/.test(response))) {
			++Dkilled;        
			document.getElementById('killedsome').innerHTML = Dkilled;
			publishDIce(response);

			return;

		}
	}
}	

function publishDIce(response) {
	var feed;
	if (/msg.fight_result =/.test(response)) {
		try{
			feed = /'feed_js': '(.+?)'/.exec(response)[0]; 
		} catch(err) {return;}
	} else {
		try {
			var msg = JSON.parse(response);
			feed = msg.fight_result.feed_js;
		} catch (err) {
			return;
		}
	}
	var needseval = /var feed = (.+?); MW\.Feed/.exec(feed)[1];
	needseval = '(' + needseval + ')';
	var mwfeed = eval(needseval);


	var description = mwfeed.description.replace("Get a free fight boost to ice your rivals.", "");
	description = description.replace("Get your free fight boost to ice your rivals.", "");
	description = description.replace(/Think you can do better.+/, "");
	description = description.replace(/Need help icing yours.+/, "");

	logmsg(description.replace(/Need to whack someone.+/, ""), 'iskl');
	return;
}

function DoAutoHeal() {
	if(Drone.Running.Paused){
		return;
	}
	if(dah >=1){
		return;
	}
	var triedalready = false;
	var b;
	var maxHealth = parseInt(document.getElementById('user_max_health').innerHTML);
	Drone.Check.CurrentHealth = parseInt(document.getElementById('user_health').innerHTML);
	if (Drone.Fighterx.tth <= 0 && parseInt(Drone.Check.CurrentHealth) < Drone.StoreThis.Health) {
		HealNY();
		triedalready = true;
	}
	var client = new XMLHttpRequest();
	client.open('POST', 'html_server.php?xw_controller=survey&xw_action=show_nps_survey', true);
	client.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	client.setRequestHeader('Accept', '*/*');
	client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	client.send("ajax=1&liteload=1&sf_xw_user_id=" + User.id + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
	client.onreadystatechange = function () {
		if (this.readyState == 4) {
			response = client.responseText;
			if (client.responseText.length > 15 && JSON.parse(client.responseText)) {
				var b = JSON.parse(client.responseText);
				document.getElementById('user_health').innerHTML = b.user_fields.user_health;
				document.getElementById('user_stamina').innerHTML = b.user_fields.user_stamina;
				document.getElementById('user_energy').innerHTML = b.user_fields.user_energy;
				Drone.Check.CurrentHealth = b.user_fields.user_health;
				User.health = b.user_fields.user_health;
			}
		}
	};
	if (triedalready == false && Drone.Fighterx.tth <= 0 && parseInt(Drone.Check.CurrentHealth) < Drone.StoreThis.Health) {
		HealNY();
	}
}

function HealNY() {
	if(Drone.Running.Paused){
		return;
	}
	if(HNY >= 1){
		return;
	}
	var b;
	var client = new XMLHttpRequest();
	client.open("POST", 'html_server.php?xw_controller=hospital&xw_action=heal&xcity=1', true);
	client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	client.send("ajax=1&liteload=1&sf_xw_user_id=" + User.id + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
	client.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (client.responseText.length > 15 && JSON.parse(client.responseText)) {
				var b = JSON.parse(client.responseText);
				document.getElementById('user_health').innerHTML = b.user_fields.user_health;
				Drone.Check.CurrentHealth = b.user_fields.user_health;
				User.health = b.user_fields.user_health;
				Drone.Fighterx.tth = b.waitHealTimer;
				if (Drone.Check.tthInt === 0) {
					Drone.Check.tthInt = setInterval(

							function () {
								Drone.Fighterx.tth--;
								if (Drone.Fighterx.tth <= 0) {
									clearInterval(Drone.Check.tthInt);
									Drone.Check.tthInt = 0;
								}
							},
							1000);
				}
				if (b.heal_success === 1) {
					logmsg('' + b.hospital_message+'', 'true_log');
				}
			}
		}
	};
}

function initialize_ajax_call_for_fights(){
	$("body").ajaxComplete(function (e, xhr, settings) {
		if(DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isFighting||DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].isHopper){
			var response = xhr.responseText;
			if (Drone.Fighterx.ajax) {
				Drone.Fighterx.ajax = false;
				return;
			}
			if (Drone.Fighterx.FightActionRunning) {
				Drone.Fighterx.FightActionRunning = false;
				clearTimeout(Drone.Fighterx.FightWatchDogTimout);
			}
			if (document.getElementById("attacker_fight_status")) {
				parseNewFightResults(response);
			}
		}
	});
}


/********************************************************************************
 * 									Energy										*
 ********************************************************************************/


function doenergyjobnow(){
	if(Drone.Check.AmAwake){
		return;
	}
	
	Drone.Check.AmAwake = true;
	setTimeout(ResetR,700);
	if(DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].isUsingButton) {
		var clickMe = document.getElementById('btn_dojob_' + DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button);
		if (clickMe == null){
			setTimeout(JobTravelr,plref[Drone.StoreThis.PageRefresh]);
			return;
		}
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		var DoesIHaveExp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		if(DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost * JBN[Drone.StoreThis.JobBurstsCount] <= DoesIHaveEnergy && DoesIHaveExp > DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].isTheXP * JBN[Drone.StoreThis.JobBurstsCount] && Drone.StoreThis.JobBursts){ 
			for (var i=0; i < JBN[Drone.StoreThis.JobBurstsCount]; i++) {
				clickMe.dispatchEvent(evt);
			}
			Drone.updateStats(JBN[Drone.StoreThis.JobBurstsCount], 'JobsDone');
			logmsg('Doing Job..', 'status');
			logmsg('Repeating Job.. Using Bursts (x'+JBN[Drone.StoreThis.JobBurstsCount]+')', 'true_log');
			setTimeout(PreJobChecker, restartburstJT);
			return;
		}else{
			Drone.updateStats(1, 'JobsDone');
			logmsg('Doing Job..', 'status');
			logmsg('Repeating Job..', 'true_log');
			clickMe.dispatchEvent(evt);
			setTimeout(PreJobChecker, rjref[Drone.StoreThis.RepeatJobSpeed]);
			return;
		}
	}
	Drone.updateStats(1, 'JobsDone');
	logmsg('Doing Job..', 'status');
	logmsg('Repeating Job..', 'true_log');
	if(DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].isOldCity) {
		$('#city_job_'+ DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button +' > .job_action > a').click();
		setTimeout(PreJobChecker, rjref[Drone.StoreThis.RepeatJobSpeed]);
		return;	
	} else {
		ExpertMapController.selectNode(DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button);
		MapController.panelButtonDoJob(DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button);
		setTimeout(PreJobChecker, rjref[Drone.StoreThis.RepeatJobSpeed]);
		return;
	}
}


function JobTravelr(){
	if(Drone.Running.Paused){
		return;
	}		
	if(jobt == 0){
		jobt = 1;
		Drone.Check.GiveMeAPause = 0;
		resetxpjumper();
		logmsg('Traveling..', 'status');
		logmsg('Traveling..', 'true_log');
		ClearIVLS();
		HNY++;
		dah++;
		document.getElementById("IRV").style.display = 'none';
		document.getElementById("IRJ").style.display = '';
	    document.getElementById("IRA").style.display = 'none';
		document.getElementById("gxRDivS").style.display = 'none';
		document.getElementById("SBTD").style.display = 'none';
		document.getElementById('ActiRes').innerHTML = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">' +DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].name;
		do_ajax('inner_page','remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination='+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].city+'&tab='+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].tab+'', 1, 1, 0, 0);
		setTimeout(PreJobChecker,plref[Drone.StoreThis.PageRefresh]);
		ResetR();
		CloseDoopidPopup();
	}
}

function PreJobChecker(){		
	jobt = 0;
	stamt = 0;
	if(Drone.Running.Paused){
		return;
	}
	if (/These loot drops are needed for this job/.test(document.body.innerHTML)) {
		if(mytimestampout == 0){
			mytimestampout = 1;
			document.getElementById('ClockedOut').innerHTML = Drone.Check.Finished;
		}
		turnthebutton();
		logmsg('Not enough consumables..', 'status');
		logmsg('Not enough consumables..', 'true_log');
		return;
	}
	if (/You do not have enough cash to do this job/.test(document.body.innerHTML)) {
		if(mytimestampout == 0){
			mytimestampout = 1;
			document.getElementById('ClockedOut').innerHTML = Drone.Check.Finished;
		}
		turnthebutton();
		logmsg('Not enough cash..', 'status');
		logmsg('Not enough cash..', 'true_log');
		return;		
	}
	if (/There are no secret districts currently open!/.test(document.body.innerHTML)) {
		if(mytimestampout == 0){
			mytimestampout = 1;
			document.getElementById('ClockedOut').innerHTML = Drone.Check.Finished;
		}
		turnthebutton();				
		logmsg('Secret District Appears to of gone walkies..', 'status');
		logmsg('Secret District Appears to of gone walkies..', 'true_log');
		return;		
	}
	if (/This mafia member was not found/.test(document.body.innerHTML)) {
		logmsg('MW Hid the profile, giz a second i reload it', 'status');
		logmsg('MW Hid the profile, giz a second i reload it', 'true_log');
		StaminaTravelr();
		return;
	}
	var onMarketPlace = document.evaluate('//div[contains(@class, "marketplace_controller")]//a[contains(., "ALL ITEMS")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
	if(onMarketPlace > 0){
		logmsg('Marketplace Tab, Why i go here..', 'status');
		logmsg('Marketplace Tab, Why i go here..', 'true_log');
		setTimeout(JobTravelr, 3000);
		return;
	}
	try{
		if(Drone.StoreThis.AmLearning && !DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].isOldCity && !DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].isVegas){
			var d;
			d = '';
			var mynuma = DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost;
			var myxpnum = DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].isTheXP;
			var energycostme = $('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button+' > .job_details.clearfix > .uses.clearfix > .energy').attr('current_value');
			var xppayme = $('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button+' > .job_details.clearfix > .pays.clearfix > .experience').attr('current_value');
			if(mynuma != energycostme){
				DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost = energycostme;
				DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].isTheXP = xppayme;
				d = 'Learnt new energy cost, energy cost per job is now '+energycostme+' & XP Payout is '+xppayme+'';
				logmsg(d, 'true_log');
			}
		}
	}catch(err){}
	var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	var DoesIHaveExp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
	spendSkillsChkr();
	UpdateCashInHand();
	RatioChecker();		
	if(Drone.StoreThis.ABank){
		BastardTehBanker();
	}
	try{	
		var hazbeenposted = $('#btn_crew_recruit').text();
		var tellmeNow = /Ask/g;
		var Annnnd = tellmeNow.test(hazbeenposted);
		if(parseInt(document.getElementById('btn_queue').childNodes[0].childNodes[0].childNodes[2].innerHTML) <= 18 && Annnnd && Drone.StoreThis.AutopostingCrew){
			if(crewposted == 0){
				crewposted = 1;
				logmsg('Crew was under 18, so have posted for some..', 'true_log');
				document.getElementById('btn_crew_recruit').click();
				setTimeout(crewpostr,8000);
			}
		}
	}catch(err){}
	if(FUUUUUUU == 1 && DoesIHaveEnergy < DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
		if($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0){
			setTimeout(checkit,3000);
			return;
		}
		logmsg('Attempting to kill bandit..', 'true_log');
		logmsg('Refreshing Tab..', 'true_log');
		clearInterval(DroneXtimer);
		$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
		FUUUUUUU = 0;
		setTimeout(checkit,6000);
		return;
	}
	if(DoesIHaveEnergy < DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
		setTimeout(checkit,3500);
		return;
	}
	if (SpendEnergyOrStamina[Drone.StoreThis.UseWhatFirst] == 'stamina' && DoesIHaveStamina > DroneXStaminaMap[Drone.StoreThis[Drone.JobOptions.StamPrimaryOrSecondary]].cost) {
		setTimeout(checkit,3500);
		return;
	}

	if(Drone.JobOptions.DoExtraJob == 0 && Drone.JobOptions.NormalUntillJob){
		if (DoesIHaveEnergy <= Drone.StoreThis.NormalUntillValue && Drone.JobOptions.NormalUntillJob){
			if(FUUUUUUU == 1){
				if($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0){
					setTimeout(JobTravelr,3000);
					return;
				}
				logmsg('Attempting to kill bandit..', 'true_log');
				logmsg('Refreshing Tab..', 'true_log');
				clearInterval(DroneXtimer);
				$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
				FUUUUUUU = 0;
				setTimeout(JobTravelr,6000);
				return;
			}
			logmsg('Switching to secondry job...', 'true_log');
			logmsg('Switching to secondry job...', 'status');
			Drone.JobOptions.JobPrimaryOrSecondary = "SecondryEnergyJobInfo";
			setTimeout(JobTravelr, 2000);
			Drone.JobOptions.DoExtraJob++;
			return;
		}
	}else if(Drone.JobOptions.DoExtraJob == 0 && Drone.JobOptions.RatioingJob){
		if (Drone.Check.CombinedRatios <= Drone.StoreThis.RatioingJobValue && Drone.JobOptions.RatioingJob){
			if(FUUUUUUU == 1){
				if($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0){
					setTimeout(JobTravelr,3000);
					return;
				}
				logmsg('Attempting to kill bandit..', 'true_log');
				logmsg('Refreshing Tab..', 'true_log');
				clearInterval(DroneXtimer);
				$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
				FUUUUUUU = 0;
				setTimeout(JobTravelr,6000);
				return;
			}
			logmsg('Switching to secondry job...', 'true_log');
			logmsg('Switching to secondry job...', 'status');
			Drone.JobOptions.JobPrimaryOrSecondary = "SecondryEnergyJobInfo";
			setTimeout(JobTravelr, 2000);
			Drone.JobOptions.DoExtraJob++;
			return;
		}
	}
	if(Drone.JobOptions.DoExtraJob == 1 && Drone.JobOptions.NormalUntillJob){
		if (DoesIHaveEnergy >= Drone.StoreThis.NormalUntillValue){
			if(FUUUUUUU == 1){
				if($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0){
					setTimeout(JobTravelr,3000);
					return;
				}
				logmsg('Attempting to kill bandit..', 'true_log');
				logmsg('Refreshing Tab..', 'true_log');
				clearInterval(DroneXtimer);
				$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
				FUUUUUUU = 0;
				setTimeout(JobTravelr,6000);
				return;
			}
			logmsg('Switching back to primary job...', 'true_log');
			logmsg('Switching back to primary job...', 'status');
			Drone.JobOptions.JobPrimaryOrSecondary = "PrimaryEnergyJobInfo";
			setTimeout(JobTravelr, 2000);
			Drone.JobOptions.DoExtraJob--;
			return;
		}
	}else if(Drone.JobOptions.DoExtraJob == 1 && Drone.JobOptions.RatioingJob){
		if (Drone.Check.CombinedRatios > Drone.StoreThis.RatioingJobValue){
			if(FUUUUUUU == 1){
				if($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0){
					setTimeout(JobTravelr,3000);
					return;
				}
				logmsg('Attempting to kill bandit..', 'true_log');
				logmsg('Refreshing Tab..', 'true_log');
				clearInterval(DroneXtimer);
				$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
				FUUUUUUU = 0;
				setTimeout(JobTravelr,6000);
				return;
			}
			logmsg('Switching back to primary job...', 'true_log');
			logmsg('Switching back to primary job...', 'status');
			Drone.JobOptions.JobPrimaryOrSecondary = "PrimaryEnergyJobInfo";
			setTimeout(JobTravelr, 2000);
			Drone.JobOptions.DoExtraJob--;
			return;
		}
	}
	if($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').length > 0){
		if($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0){
			setTimeout(JobTravelr,3000);
			return;
		}
		document.getElementById("SBTD").style.display = '';
		var sillyBTimer = dateFromString($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-timer').text());
//		logmsg('silly is:'+sillyBTimer, 'true_log');
		var texBandit = parseInt(stopnum);
//		logmsg('text is:'+texBandit, 'true_log');
		/*if(isNaN(texBandit)){
			sillyBTimer = 'Not detected';
			texBandit = parseInt(BUBT);
		}else{
			BUBT = sillyBTimer;
		}*/
		
		//document.getElementById('SBT').innerHTML = sillyBTimer;
//		document.getElementById('SBT').innerHTML = sillyBTimer;//.minutes+':'+sillyBTimer.seconds;
		if(parseInt(document.getElementById('btn_queue').childNodes[0].childNodes[0].childNodes[2].innerHTML) == 0 && Annnnd){
			TimedMessage('Got Bandits, but no crew.. Restarting', 'status', 305);
			logmsg('Got Bandits, but no crew..', 'true_log');
			setTimeout(JobTravelr,305000);
			return;
		}
		if (Drone.StoreThis.jb) {
			if ($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-desc').text() == "Job Bandit") {
				logmsg('Attempting to kill Job Bandit..', 'true_log');
				logmsg('Refreshing Tab..', 'true_log');
				clearInterval(DroneXtimer);
				FUUUUUUU = 0;
				$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
				setTimeout(JobTravelr, 6000);
				return;
			}
		}
		if (Drone.StoreThis.xp && Drone.StoreThis.BanditGamblerXP) {
			if (texBandit <= Drone.StoreThis.BanditElapsedTimerXP) {
				if ($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-desc').text() == "XP Bandit") {
					logmsg('Attempting to kill XP Bandit..', 'true_log');
					logmsg('Refreshing Tab..', 'true_log');
					clearInterval(DroneXtimer);
					FUUUUUUU = 0;
					$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
					setTimeout(JobTravelr, 6000);
					return;
				}
			} else {
				FUUUUUUU = 1;
				doenergyjobnow();
				return;
			}
		}
		if (Drone.StoreThis.csh && Drone.StoreThis.lolzatcash) {
			if ($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-desc').text() == "Cash Bandit") {
				FUUUUUUU = 0;
				doenergyjobnow();
				return;
			}
		}
		if (Drone.StoreThis.csh && Drone.StoreThis.BanditGamblerCSH) {
			if (texBandit <= Drone.StoreThis.BanditElapsedTimerCash) {
				if ($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-desc').text() == "Cash Bandit") {
					logmsg('Attempting to kill Cash Bandit..', 'true_log');
					logmsg('Refreshing Tab..', 'true_log');
					clearInterval(DroneXtimer);
					FUUUUUUU = 0;
					$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
					setTimeout(JobTravelr, 6000);
					return;
				}
			} else {
				FUUUUUUU = 1;
				doenergyjobnow();
				return;
			}
		}
		if (Drone.StoreThis.xp) {
			if ($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-desc').text() == "XP Bandit") {
				logmsg('Attempting to kill XP Bandit..', 'true_log');
				logmsg('Refreshing Tab..', 'true_log');
				clearInterval(DroneXtimer);
				FUUUUUUU = 0;
				$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
				setTimeout(JobTravelr, 6000);
				return;
			}
		}
		if (Drone.StoreThis.csh) {
			if ($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-desc').text() == "Cash Bandit") {
				logmsg('Attempting to kill Cash Bandit..', 'true_log');
				logmsg('Refreshing Tab..', 'true_log');
				clearInterval(DroneXtimer);
				FUUUUUUU = 0;
				$('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').click();
				setTimeout(JobTravelr, 6000);
				return;
			}
		} else {
			TimedMessage('You\'ve chosen not to kill any bandits, Restarting', 'status', 305);
			logmsg('Waiting the Bandit out..', 'true_log');
			setTimeout(JobTravelr, 305000);
			return;
		}
	}
	if($('#job-id-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.StoreThis[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').length == 0){
		document.getElementById("SBTD").style.display = 'none';
	}
	setTimeout(doenergyjobnow,50);
	CloseDoopidPopup();
}
var stopnum;
function dateFromString(str) {
//logmsg(str, 'true_log');
/*  var m = str.match(/(\d+):(\d+)/);
  return {
	minutes: m[1], 
	seconds: m[2]
	}

str.replace(/^(\d+:)?(\d+:)?(\d+)$/, function(m,a,b,c) {
	if (!a) return parseInt(c);
	else if (!b) return parseInt(a) +':'+ parseInt(c);
	else return parseInt(a) +':'+ parseInt(b) +':'+ parseInt(c);
});

:
*/
var time = str;
var re = /^(?:(?:(\d+):)?(\d+):)?(\d+)$/;
var aMatch = re.exec(time);
if(!aMatch){
	if(!DroneXtimer){
		document.getElementById('SBT').innerHTML = 'Not detected';
	}
}else{
//logmsg(aMatch, 'true_log');
	stopnum = aMatch[2];
    var seconds = (3600*aMatch[1]|0)+(60*aMatch[2]|0)+(aMatch[3]|0);
	clearInterval(DroneXtimer);
	Bandity(seconds);
	}
}

var DroneXtimer;
	function Bandity(seconds) {
		var delay = (seconds > 0)? delay = 1000 : delay = 100;
		var minutes = (parseInt(seconds/60) == 1) ? 0 : parseInt(seconds/60);
		if (minutes > 0) {
			document.getElementById('SBT').innerHTML = ' <span id="minutes">'+minutes+' minute'+(minutes==1?'':'s')+'</span> <span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>';
		}
		else {
			document.getElementById('SBT').innerHTML = ' <span id="minutes"></span><span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>';
		}
		DroneXtimer = setInterval(function(){
			if (seconds%60 == 0) {
				minutes--;
			}
			seconds--;
			if (document.getElementById('minutes')) {
				document.getElementById('minutes').innerHTML = (minutes > 0) ? minutes+' minute'+(minutes==1?'':'s') : '';
			}
			if (document.getElementById('seconds')) {
				document.getElementById('seconds').innerHTML = (seconds % 60)+' second'+(seconds==1 ? '' : 's');
			}
			else {
				clearInterval(DroneXtimer);
			}
			if (seconds <= 0) {
				clearInterval(DroneXtimer);
			}
		},delay);
	}

function xpjobber() {
	DoesIHaveEnergy = parseInt(document.getElementById("user_energy").innerHTML);
	var xp2a = parseInt(document.getElementById("exp_to_next_level").innerHTML);
	if (document.getElementsByClassName("bandit-eliminate-btn").length > 0) {
		logmsg('Bandits on the XP leveling..', 'true_log');
		var a = document.getElementsByClassName("sexy_button_new sexy_button_new short red impulse_buy")[0];
		if (!a) {
			setTimeout(JobTravelr, 3000);
			return;
		}
		try{
			var nqued = $('#btn_queue').text();
			var anqued = nqued.substring(2);
			if ($(".bandit-desc").text() == "XP Bandit" && anqued > 0 ) {
				logmsg('Someone tried to fly out with not killing the XP Bandit!', 'true_log');
				logmsg('Annihilated him..', 'true_log');
				a.click();
				setTimeout(JobTravelr, 6000);
				return;
			}
			if(anqued == 0){
				logmsg('No crew to kill the bandit!!!', 'true_log');
				logmsg('Leaving him there..', 'true_log');
			}
		}catch (err){}
	}
	if(DoesIHaveEnergy > (XPENA+10)){
		logmsg('SmartLevelup Attempt Successful..', 'true_log');	
		setTimeout(JobTravelr, 2000);
		return;
	}
	if(XPA > xp2a){
		logmsg('SmartLevelup Attempt Successful..', 'true_log');	
		setTimeout(JobTravelr, 2000);
		return;
	}
	if(DoesIHaveEnergy < xp2ena){
		logmsg('SmartLevelup Attempt FAIL!?', 'true_log');	
		setTimeout(JobTravelr, 2000);
		return;
	}
	var clickMe = document.getElementById('btn_dojob_' + xp2gojob);
	if (clickMe == null) {
		setTimeout(xptraveler, 6500);
		return;
	}
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	clickMe.dispatchEvent(evt);
	setTimeout(xpjobber, 1500);
}


function xptraveler() {
	if (document.getElementsByClassName("bandit-eliminate-btn").length > 0) {
		logmsg('Checking Passport..', 'true_log');
		var a = document.getElementsByClassName("sexy_button_new sexy_button_new short red impulse_buy")[0];
		if (!a) {
			setTimeout(JobTravelr, 3000);
			return;
		}
		logmsg('I can haz Passport!?', 'true_log');
		try{
			var nqued = $('#btn_queue').text();
			var anqued = nqued.substring(2);
			if ($(".bandit-desc").text() == "XP Bandit" && anqued > 0 ) {
				logmsg('Someone tried to fly out with not killing the XP Bandit!', 'true_log');
				logmsg('Annihilated him..', 'true_log');
				a.click();
				setTimeout(JobTravelr, 6000);
				return;
			}
			if(anqued == 0){
				logmsg('No crew to kill the bandit!!!', 'true_log');
				logmsg('Leaving him there..', 'true_log');
			}
		}catch (err){}
	}
	do_ajax("inner_page", "remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&from=job&zone=1&destination=" + xp2gocity + "&tab=" + xp2gotab, 1, 1, 0, 0);
	setTimeout(xpjobber,6900);
}



/********************************************************************************
 * 							Facebook: posting/groups/etc						*
 ********************************************************************************/



function GetPostToGroup() {
	FB.login(function (response) {read_groups();},{ "scope": "user_groups" });
}

function try_autopost(){
	try{
//		refresh_access_token();
		var postTo = Drone.StoreThis.PostLevelUp;
		
		if(postTo==1){
			sendwall();
		}
		else if(postTo==2){
			sendgroup();			
		}
		else if(postTo==3){
			sendcomment();
		}
	}
	catch(e){}	
}

function setPostedLevelUpTrue(){
	posted_level_up=true;
}

function sendgroup(){
	var message='Level '+Drone.CurrentLevel+' Promotion Bonus: '+lastitem;
	var caption = 'Reward: '+lastitem;
        facebook.init(function(){
                FB.api('/'+selectedgroupvalue+'/feed','post',{
                        method: 'send',
                        name: caption,
                        link: link,
                        picture: lastimg,
                        description: message
                },function(response){
                        if (!response || response.error) {
                        } else {
                                logmsg('Posted level up.', 'true_log');
                                lastpost={ type:"post", id:response.id };
                                setPostedLevelUpTrue();
                        }
                });
        });
	/*	FB.api('/'+selectedgroupvalue+'/feed','post',{
		method: 'send',
		name: caption,
		link: link,
		picture: lastimg,
		description: message
	},function(response){
		if (!response || response.error) {
		} else {
			logmsg('Posted level up.', 'true_log');
			lastpost={ type:"post", id:response.id };
			setPostedLevelUpTrue();
		}
	}); */
}

function sendwall(){
	var message='Level '+Drone.CurrentLevel+' Promotion Bonus: '+lastitem;
	var caption = 'Reward: '+lastitem;
        facebook.init(function(){
            FB.api('/me/feed','post',{
                    method: 'send',
                    name: caption,
                    link: link,
                    picture: lastimg,
                    description: message
            },function(response){
                    if (!response || response.error) {
                    } else {
                            logmsg('Posted level up.', 'true_log');
                            lastpost={ type:"post", id:response.id };
                            setPostedLevelUpTrue();
                    }
            });
        });
	/*	FB.api('/me/feed','post',{
		method: 'send',
		name: caption,
		link: link,
		picture: lastimg,
		description: message
	},function(response){
		if (!response || response.error) {
		} else {
			logmsg('Posted level up.', 'true_log');
			lastpost={ type:"post", id:response.id };
			setPostedLevelUpTrue();
		}
	}); */
}	

function sendcomment(){
	var linkToPost = link;
	if(Drone.StoreThis.Tinyurl != ''){
		linkToPost = Drone.StoreThis.Tinyurl;
	}
	var comment = "Level "+Drone.CurrentLevel+" bonus: "+lastitem+" "+linkToPost;
	var postid = selectedpostvalue;
	facebook.init(function(){
            FB.api('/'+postid+'/comments?access_token='+access_token,'post',{'message':comment}, function(response){
                    if (!response || response.error) {
                    } else {
                            logmsg('Posted level up.', 'true_log');
                            lastpost={ type:"comment", id:response.id, post:postid };
                            setPostedLevelUpTrue();
                    }
            });
        });
	/*FB.api('/'+postid+'/comments?access_token='+access_token,'post',{'message':comment}, function(response){
		if (!response || response.error) {
		} else {
			logmsg('Posted level up.', 'true_log');
			lastpost={ type:"comment", id:response.id, post:postid };
			setPostedLevelUpTrue();
		}
	});*/
}

function try_delete_last_post() {
 if(posted_level_up){
        var post_to_delete = lastpost;
        try{
 
                        facebook.init(function(){
                            FB.api('/'+post_to_delete.id+'?access_token='+access_token,'delete',{}, function(success){
                                    if(success===true){
                                            logmsg('Deleted level up post.', 'true_log');
                                    }
                                    else{
    //                  try_delete_last_post_after_fail(post_to_delete);
                                    }
                            });
                        })
 
 
        }catch(err){
//          try_delete_last_post_after_fail(post_to_delete);
        }
    }	/*if(posted_level_up){
		var post_to_delete = lastpost;
		try{
			FB.api('/'+post_to_delete.id+'?access_token='+access_token,'delete',{}, function(success){
				if(success===true){
					logmsg('Deleted level up post.', 'true_log');
				}
				else{
//					try_delete_last_post_after_fail(post_to_delete);
				}
			});
		}catch(err){
//			try_delete_last_post_after_fail(post_to_delete);	
		}
	} */
}

function try_delete_last_post_after_fail(post_to_delete) {
facebook.init(function(){
                    FB.api('/'+post_to_delete.id+'?access_token='+access_token,'delete',{}, function(success){
                            if(success===true){
                                    logmsg('Deleted level up post.', 'true_log');
                            }
							                    });
                })
/*
	try{
		refresh_access_token();
		FB.api('/'+post_to_delete.id+'?access_token='+access_token,'delete',{}, function(success){
			if(success===true){
				logmsg('Deleted level up post.', 'true_log');
			}
//			else{
//				disable_autopost();
//			}
		});
	}
	catch(e){
//		disable_autopost();	
	}*/
}

function refresh_access_token(){
	try{
		access_token = FB.getAuthResponse().accessToken;
	}
	catch(e){}
}

//facebook int start
var facebook = {
/**
 *Checks & handles fb init by 666
 */
initilized:false,
init:function(callback){
    /**
     *Check if we have access to fb.api
     */
     if (facebook.initilized == false){
 
//         console.log('FB Init Checking')
         var not_loaded = 0;
         var wait_for_facebook = setInterval(function(){
            //wait till FB comes into scope maybe make refrence to FB.api
            if (typeof (FB) !== 'undefined'){
                //we have fb api loaded
//                console.log('FB loaded')
                clearInterval(wait_for_facebook)
                facebook.initilized = true;
                access_token = FB.getAuthResponse().accessToken;
 
                    if (typeof callback == "function"){
                        callback && callback(true);
                    }
 
            }else if (not_loaded > 500){
//                 console.log('FB Failed to load')
                 clearInterval(wait_for_facebook)
                 facebook.initilized = false;
 
                    if (typeof callback == "function"){
                         callback && callback(false);
                    }
 
 
            }else{
                not_loaded++
            }
        },250)
     }else{
        //we are hooked into fb.api
        access_token = FB.getAuthResponse().accessToken;
        if (typeof callback == "function")
            callback && callback(true);
    }
}
};
facebook.init()
 
//facebook int end

function disable_autopost(){
	logmsg('Failed to delete last level up post. Disabling autopost.', 'true_log');
	Drone.StoreThis.PostLevelUp=0;
}

function read_groups() {
	//Wrapped in try-catch to prevent problems when autostarting Drone. In that case, FB api might not be initialized yet.
	try{
        facebook.init(function(){
        FB.api('/me/groups?access_token=' +access_token+'', function(response) {
            if (Util.isset(response.error)) {
            }
            else {
                $('#aan_promo_groups').html(list_groups(response.data));
            }
            $('#aan_promo_groups').bind('click',function() {
                readPosts( $('#aan_promo_selectable').val());
 
            });
            readPosts( $('#aan_promo_selectable').val());
        });
        });
	/*	refresh_access_token();
		FB.api('/me/groups?access_token=' +access_token+'', function(response) {
			if (Util.isset(response.error)) {
			}
			else {
				$('#aan_promo_groups').html(list_groups(response.data));
			}
			$('#aan_promo_groups').bind('click',function() {
				readPosts( $('#aan_promo_selectable').val());

			});
			readPosts( $('#aan_promo_selectable').val());
		}); */
	}
	catch(e){}
}

function readPosts(groupname) {
	try{
	        facebook.init(function(){
            FB.api('/'+groupname+'/feed?access_token=' +access_token+'', function(response) {
                    var output = '<select id="aan_promo_selectablepost" style="width:60%;">';
                    for (var x=0;x<response.data.length;x++) {
                            var object = response.data[x];
                            var description = object.message?object.message : object.caption;
                            description = description ? description : "";
                            output += '<option value="'+object.id+'" '+(object.id == Drone.StoreThis.CommentToPostWithID ? 'selected' : '')+'>'+description.substr(0,50)+'</option>';
                    }
 
                    FB.api('/'+groupname+'/docs?access_token=' +access_token+'', function(response) {
                            for (var x=0;x<response.data.length;x++) {
                                    var object = response.data[x];
                                    var description = object.subject;
                                    description = description ? description : "";
                                    output += '<option value="'+object.id+'" '+(object.id == Drone.StoreThis.CommentToPostWithID ? 'selected' : '')+'>'+description.substr(0,50)+'</option>';
                            }
                            output += '</select>';
                            $('#aan_promo_posts').html(output);
                    });
            });
        });
/*	FB.api('/'+groupname+'/feed?access_token=' +access_token+'', function(response) {
		var output = '<select id="aan_promo_selectablepost" style="width:60%;">';
		for (var x=0;x<response.data.length;x++) {
			var object = response.data[x];
			var description = object.message?object.message : object.caption; 
			description = description ? description : "";
			output += '<option value="'+object.id+'" '+(object.id == Drone.StoreThis.CommentToPostWithID ? 'selected' : '')+'>'+description.substr(0,50)+'</option>';
		}
		FB.api('/'+groupname+'/docs?access_token=' +access_token+'', function(response) {
			for (var x=0;x<response.data.length;x++) {
				var object = response.data[x];
				var description = object.subject; 
				description = description ? description : "";
				output += '<option value="'+object.id+'" '+(object.id == Drone.StoreThis.CommentToPostWithID ? 'selected' : '')+'>'+description.substr(0,50)+'</option>';
			}
			output += '</select>';
			$('#aan_promo_posts').html(output);
		});
	}); */
	}catch(err){}
}

function list_groups(result) {
	var output = '<select id="aan_promo_selectable" style="width:60%;">';
	for (var x=0;x<result.length;x++) {
		output += '<option value="'+result[x].id+'" '+(result[x].id == Drone.StoreThis.PostToGroupWithID ? 'selected' : '')+'>'+result[x].name.substr(0,50)+'</option>';
	}
	output += '</select>';
	return output;
}




/********************************************************************************
 * 									Misc										*
 ********************************************************************************/


function crewpostr(){
	try{
		var hazbeenpostedcheckr = $('#btn_crew_recruit').text();
		var CheckNow = /Ask/g;
		var AndIsFeedScrewed = CheckNow.test(hazbeenpostedcheckr);
		if(!AndIsFeedScrewed){
			crewposted = 0;
		}else if(AndIsFeedScrewed){
			logmsg('Have hit application autoposts for the day, temporarily disabling autoposting for crew..', 'true_log');
			crewposted = 1;
			setTimeout(crewpostr,1800000);
		}
	}catch(err){}
}


function BastardTehBanker() {
	if(BBlock == 0){
		BBlock = 1;
		Currcity = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper').className)[1];
		if (Currcity == 1||Currcity == 5) {
			BBlock = 0;
			return;
		}
		if(Drone.BankInfo.cash_in_hand < 10000){
			BBlock = 0;
			return;
		}
		if (Currcity == 5) {
			vegascash = /V\$([\d,]+)/.exec(document.getElementById("user_cash_vegas").innerHTML)[1];
			vegascash = parseInt(vegascash.replace(/\,/g, ''));
			url = 'html_server.php?xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&amount=' + vegascash + '&building_type=6&city=5&xw_client_id=8';
		} else {
			url = 'html_server.php?xw_controller=bank&xw_action=deposit_all&xw_city=' + Currcity + '&amount=1000000000';
		}
		var params = {
				'ajax': 1,
				'liteload': 1,
				'sf_xw_user_id': Drone.Fighterx.xw_user,
				'sf_xw_sig': local_xw_sig
		};
		$.ajax({
			type: "POST",
			url: url,
			timeout: 30000,
			data: params,
			success: function (response) {
			if ((/user_cash_nyc":"([$\d,]+)"/.test(response))) {
				document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_london").innerHTML = 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£' + (/user_cash_london":"\\u00a3([\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_chicago").innerHTML = 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢' + (/user_cash_chicago":"\\u00a2([\d,]+)"/.exec(response))[1];
				document.getElementById("user_cash_southafrica").innerHTML = (/user_cash_southafrica":"([R \d,]+)"/.exec(response))[1];
			}
		}
		});
		logmsg('Banked Some money..', 'true_log');
		setTimeout(Bankrr, 10000);
	}
}

function Bankrr(){
	BBlock = 0;
}

function $x(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while ((i = x.iterateNext())) r.push(i);
	return r;
}


function getCurrCity(){
	var city = $('#mw_city_wrapper').attr('class');
	switch(city){
	case 'mw_city1':
		return '1';
	case 'mw_city2':
		return '2';
	case 'mw_city3':
		return '3';
	case 'mw_city4':
		return '4';
	case 'mw_city5':
		return '5';
	case 'mw_city6':
		return '6';
	case 'mw_city7':
		return '7';
	case 'mw_city8':
		return '8';
	case 'mw_city9':
		return '9';
	default:
		return 'UnknowCity';
	}
}

function spendSkillsChkr() {
	var IhaZskills = parseInt($('#user_skill').text());
	if (overloadskillpointblocker == 0 && IhaZskills >= 5 && Drone.StoreThis.DXSkillIsTrue == true){
		overloadskillpointblocker = 1;
		if(Drone.StoreThis.SkillSimple){
			spendSkillsSimple();
			return;
		}else{
			Drone.Running.Paused = true;
			spendSkills();
			return;
		}
	}
}

function spendSkills() {
	var IhaZskills = parseInt($('#user_skill').text());
	if (attpts > 0 && IhaZskills > 0) {
		do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key=attack&upgrade_amt=1&no_load=1&source=level_up_popup');
		logmsg('Applying 1 Skillpoint to Attack', 'true_log');
		attpts--;
		setTimeout(spendSkills, 3000);
		return;
	}
	if (defpts > 0 && IhaZskills > 0) {
		do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key=defense&upgrade_amt=1&no_load=1&source=level_up_popup');
		logmsg('Applying 1 Skillpoint to Defense', 'true_log');
		defpts--;
		setTimeout(spendSkills, 3000);
		return;
	}
	if (healthpts > 0 && IhaZskills > 0) {
		do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key=max_health&upgrade_amt=1&no_load=1&source=level_up_popup');
		logmsg('Applying 1 Skillpoint to Health', 'true_log');
		healthpts--;
		setTimeout(spendSkills, 3000);
		return;
	}
	if (NRGpts > 0 && IhaZskills > 0) {
		do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key=max_energy&upgrade_amt=1&no_load=1&source=level_up_popup');
		logmsg('Applying 1 Skillpoint to Energy', 'true_log');
		NRGpts--;
		setTimeout(spendSkills, 3000);
		return;
	}
	if (Stapts > 0 && IhaZskills > 0) {
		do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key=max_stamina&upgrade_amt=1&no_load=1&source=level_up_popup');
		logmsg('Applying 1 Skillpoint to Stamina', 'true_log');
		Stapts--;
		setTimeout(spendSkills, 3000);
		return;
	}
	if (attpts == 0 && defpts == 0 && healthpts == 0 && NRGpts == 0 && Stapts == 0) {
		attpts = Drone.StoreThis.MasterAttV;
		defpts = Drone.StoreThis.MasterDefV;
		healthpts = Drone.StoreThis.MasterHeaV;
		NRGpts = Drone.StoreThis.MasterNRGV;
		Stapts = Drone.StoreThis.MasterStaV;
		overloadskillpointblocker = 0;
		meepvar = 0;
		jobt = 0;
		stamt = 0;
		Drone.Running.Paused = false;
		setTimeout(checkit,500);
	}
}

function spendSkillsSimple(){
	var IhaZskills = parseInt($('#user_skill').text());
	if(IhaZskills >= 5){
		do_ajax('', 'remote/html_server.php?xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+WhichSkill[Drone.StoreThis.Spending]+'&upgrade_amt=5&no_load=1&source=level_up_popup');
		logmsg('Applying 5 Skillpoints to '+WhichSkill[Drone.StoreThis.Spending]+'', 'true_log');
		overloadskillpointblocker = 0;
		return;
	}
}

function logmsg(a, b) {	
	var l = 0;
	var c = new Date().getHours();
	var d = new Date().getMinutes();
	var s = new Date().getSeconds();

	if (b == 'status') {
		document.getElementById('status').innerHTML = a;
	} else if(b == 'iskl'){
		document.getElementById('iskl').innerHTML += a +'<br>';
	} else if (b == 'true_log') {
		c = (c < 10 ? '0' + c : c);
		d = (d < 10 ? '0' + d : d);
		s = (s < 10 ? '0' + s : s);
		var e = '<font>' + DateTimeStamp() + '</font>';
		V.splice(0, 0, ' ' + e + ' ' + a);
		l = V.length;
		var f = parseInt(document.getElementById('log_size').value);
		V.length = (l < f) ? l : f;
		document.getElementById('true_log').innerHTML = '';
		var g = '';
		for (l = 0; l < V.length; l++) {
			g += V[l] + '<br>';
		}
		document.getElementById('true_log').innerHTML += g;
	}
}

function TimedMessage(a, b, c) {
	if (c > 0) {
		logmsg(a + ' in ' + c + ' seconds..', b);
		c -= 1;
		setTimeout(function () {
			TimedMessage(a, b, c);
		}, 1000);
		return
	} else {
	}
}

function DateTimeStamp() {
	now = new Date();
	var CurH = (now.getHours()%12);
	CurH = (CurH<10?'0'+CurH:CurH);
	var CurM = (now.getMinutes());
	CurM = (CurM<10?'0'+CurM:CurM);
	var amorpm = (now.getHours()>12?'pm':'am');
	return '<span class="more_in">['+CurH+':'+CurM+amorpm+']</span> ';
}

function TimeStampMe() {
	now = new Date();
	var CurH = now.getHours();
	CurH = (CurH<10?'0'+CurH:CurH);
	var CurM = now.getMinutes();
	CurM = (CurM<10?'0'+CurM:CurM);
	var CurS = now.getSeconds();
	CurS = (CurS<10?'0'+CurS:CurS);
	return '<span class="more_in">['+CurH+':'+CurM+':'+CurS+']</span> ';
}	

function TimeStampOut() {
	now = new Date();
	var CurH = now.getHours();
	CurH = (CurH<10?'0'+CurH:CurH);
	var CurM = now.getMinutes();
	CurM = (CurM<10?'0'+CurM:CurM);
	var CurS = now.getSeconds();
	CurS = (CurS<10?'0'+CurS:CurS);
	return '<span class="more_in">['+CurH+':'+CurM+':'+CurS+']</span> ';
}	

function logerr(msg) {
	setTimeout(function() {
		throw new Error(msg);
	}, 0);
}

/*add analytics*/
function loadContent(file) {
	var head=document.getElementsByTagName('head').item(0);
	var scriptTag=document.getElementById('loadScript');
	if(scriptTag)head.removeChild(scriptTag);
	script=document.createElement('script');
	script.src=file;
	script.type='text/javascript';
	script.id='loadScript';
	head.appendChild(script);
	setTimeout(load,1000);
}

function load() {
	try {
		var pageTracker=_gat._getTracker("UA-35022618-1");
		pageTracker._trackPageview("/droneXvSPART");
	} catch(err){}
}



/*
$Id: spartacus.js,v 1.66 2013-03-06 07:21:08 eike Exp $
Arena Fighter Code
Author: Eike, Team Spockholm & the rest of the team
License: http://www.tldrlegal.com/l/CC-NC, read the full text here: http://creativecommons.org/licenses/by-nc/3.0/legalcode
Note that this code may not be used in commercial scripts or applications
Bugs/todo:
x Show all powerups always
x show correct powerups
x Better control
x Show stamina use
x Levelup
x Levelup-Popup
x Start timer
x Restartable
x Attack-Matrix
x Log total loot
x Clean powerups
x Errorhandling on join
x Save settings
x Config dynamic (open close, show/hide)
x Healing timer
x standings
x improve loot log
- Log to server
- Brag
- Use of Powerups
- Custom arena join
x Repair restart timer
 */


//var version='Spartacus ModJob',
//rev =  /,v \d+\.(\d+)\s201/.exec("$Id: spartacus.js,v 1.66 2013-03-06 07:21:08 eike Exp $")[1],
var spocklet='spartacus',
instance=parseInt(Math.random()*1000),
//debug = false,
//debuglogs=[],
logs=[],
loglines = 12,
looted = {},
run=false,
spinner = '<img src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/mw_loader_final_v2.gif" width=32 height=32 />',
mafia_attack = imgurl('icon_mafia_attack_22x16_01.gif','22','16','Mafia Attack Strength'),
mafia_defense = imgurl('icon_mafia_defense_22x16_01.gif','22','16','Mafia Defense Strength'),
wslink,
socke, // websocket
currdata, // copy of data
cmdqueue=[],
meid, //me
poweratt = false,
poweruplist = {},
playerinfo={},
playerids={},
starting_in,
starting_in_counter,
attmatrix={},
stam_on_start=-1,
healed_in,
healed_in_counter,
restart_in,
restart_in_counter,
itemdatabase={},
worstitems,
stats = { arenas:0,crests:0, xp:0, stamina:0, respect_start:0, respect:0, ranks:[0,0,0,0,0,0]},
powerup_status = {},
last_update = 0,
//update_debug=[],
conn_checker,
healtimer=[0,0,0,0,0,0],
replenish=0,
da_game = [],
powerup_command = { count:{},active:-1 },
show_config = false,
storage;

var powerups = {
		1:{name:"Stamina Refill",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_staminarefill_01.png"},
		2:{name:"Arena Health Refill",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_arenahealthrefill_01.png"},
		3:{name:"Meta Flair",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_quartflair_01.png"},
		4:{name:"Pain Killer",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_painkiller_01.png"},
		5:{name:"Kamikaze",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_suckerpunch_01.png"},
		6:{name:"Drained",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_drained_02.png"},
		7:{name:"Reflector",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_reflector_01.png"},
		8:{name:"Freeze",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_freeze_01.png"}
};

var difficulty = [
                  'Easy',
                  'Normal',
                  'Hard'
                  ];

var r_difficulty = {
		'Easy':0,
		'Normal':1,
		'Hard':2
};


//setup the initial html
var style = '<style type="text/css">'+
'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
'.messages img{margin:0 3px;vertical-align:middle}'+
'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px; margin:1px;}'+
'#'+spocklet+'_loading { display:none; }'+
'#'+spocklet+'_table td { padding:3px; }'+
'#'+spocklet+'_attmatrix td { padding:3px; border: 1px solid grey; width:20px; text-align:center;}'+
'#'+spocklet+'_attmatrix th { padding:3px; border: 1px solid white; width:20px; text-align:center;}'+
'#'+spocklet+'_attmatrix { border: 1px solid white; }'+
'.'+spocklet+'_usepowerup { cursor:pointer; }'+
'.'+spocklet+'_notusepowerup { cursor:wait; }'+
'.'+spocklet+'_conf { display:none; }'+
'#'+spocklet+'_delay { display:none; }'+
//'#'+spocklet+'_debugsend,#'+spocklet+'_debugsend_a { display:none; }'+
'.'+spocklet+'_offsh {background: url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/Effect_opponentOverlay.png") 0 50% no-repeat;background-position:-10px -5px;padding-left: 30px;}'+
'.'+spocklet+'_defsh {background: url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/Effect_opponentOverlay.png") 0 50% no-repeat;background-position:-230px -110px;padding-left: 30px;}'+
'.'+spocklet+'_lootlog { display:none; }'+
'</style>';

//var logo = '<a href="http://www.spockholm.com/mafia/testing.php#" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png#" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin-bottom: 5px;" /></a>';

var spocklet_html =
	'<div id="'+spocklet+'_main">'+
	style+
	'<table class="messages">'+
	'<tr><td colspan="3" align="center" style="text-align:center;">'//+logo+'<br />'+
//	'&nbsp;<a href="http://www.spockholm.com/mafia/help.php#" id="'+spocklet+'_help" class="sexy_button_new short" target="_blank" title="Get help"><span><span>Help</span></span></a>'+
//	'&nbsp;<a href="#" id="'+spocklet+'_stop" class="sexy_button_new short orange" title="Stop"><span><span>Stop</span></span></a>'+
//	'&nbsp;<a href="#" id="'+spocklet+'_rewards" class="sexy_button_new short green" title="Rewards"><span><span>Rewards</span></span></a>'+
	+'<font size="10">Spockholms\' Spartacus</font>&nbsp;<a TARGET="_blank" href="http://www.spockholm.com/mafia/bookmarklets.php">Vist them here</a>&nbsp;&nbsp;<a href="#" id="'+spocklet+'_config_toggle" class="sexy_button_new short black" title="Config"><span><span style="background: url(\'http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png\') no-repeat scroll 4px 50% transparent; padding-left: 30px;">Config</span></span></a> '+
	/*'<a href="http://www.spockholm.com/mafia/donate.php#'+spocklet+'" '+$i('donate')+' class="sexy_button_new short black" target="_blank" title="Like what we do? Donate to Team Spockholm"><span><span><span class="cash"></span>Donate</span></span></a>'+*/

//	'&nbsp;<a href="#" id="'+spocklet+'_start" class="sexy_button_new short green" title="Start Spartacus, god of the arena"><span><span>Start</span></span></a>'+
//	'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close Spartacus, no more killing"><span><span>Close</span></span></a>'+
	'</td></tr>'+
	'<tr><td colspan="3"><hr /></td></tr>'+
	'<tr><td colspan="3"><span id="'+spocklet+'_loading">'+spinner+' loading data...</span></td></tr>'+
	'<tr '+$c('conf')+'><td colspan="3"><span style="background: url(\'http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png\') no-repeat scroll 4px 50% transparent; padding-left: 30px;">Configuration</span></td></tr>'+
	'<tr '+$c('conf')+'><td valign="top">Arena:</td><td colspan="2">'+
	'<select '+$i('arenatype')+' title="Select what Arena to join">'+(User.max_stamina<3000?'<option value="sw">20 Stamina</option>':'')+'<option value="lw">100 Stamina</option>'+(User.max_stamina>=3000?'<option value="hw">500 Stamina</option>':'')+'</select>'+
	'<br /><label><input type="checkbox" id="'+spocklet+'_check_stam" title="Disabled means NO check is done before trying to join" />Have</label> '+
	'at least <span class="stamina"><input type="text" '+$i('min_stam_for_restart')+' value="20" title="Only join arenas when stamina is above this" /></span> '+
	'and ratio below <span class="experience"><input type="text" '+$i('min_ratio_for_restart')+' value="20" title="Only join arenas when stamina to xp ratio needed for next level is below this (0 to ignore)" /></span>  before entering'+
	'</td></tr>'+
	'<tr '+$c('conf')+'><td valign="top">Restart:</td><td colspan="2">'+
	'<label title="Rejoin arenas when done">Rejoin arenas <input type="checkbox" id="'+spocklet+'_restart" /></label><br /> '+
	'<label>Retry when out of stamina <input type="checkbox" id="'+spocklet+'_restart_stam" title="Restart after x minutes" /><span '+$i('show_restart_stam')+'> after <input type="text" '+$i('restart_minutes')+' value="5" title="Minutes before retrying to join" /> minutes.</label></span>'+
	'</td></tr>'+
	'<tr '+$c('conf')+'><td valign="top">Type of attack:</td><td colspan="2">'+
	'<label title="Use Powerattack" >Powerattack: <input type="checkbox" id="'+spocklet+'_powerattack" checked /></label> &nbsp; '+
	'Number of attacks: <input type="text" '+$i('numatt')+' value="3" title="Number of attacks to batch, maximum=3"/>'+
	'</td></tr>'+
	'<tr '+$c('conf')+'><td>Target to attack:</td><td colspan="2"><select '+$i('seltarget')+' title="Decide target priority">'+
	'<option value="lowhealth">Lowest health alive</option>'+
	'<option value="highhealth">Highest health</option>'+
	'<option value="mostpoints">Most points alive</option>'+
	'<option value="leastpoints">Least points alive</option>'+
	'<option value="mostrespect">Most respect alive</option>'+
	'<option value="leastrespect">Least respect alive</option>'+
	'<option value="allalive">Attack all alive</option>'+
	'<option value="leastdiff">Least difficulty</option>'+
	'</select></td></tr>'+
	'<tr '+$c('conf')+'><td valign="top">Power-Ups:</td><td colspan="2">'+
	'<label>Don\'t attack defense shielded players: <input type="checkbox" id="'+spocklet+'_skipshield" checked title="Skip def shielded players" /></label><br />'+
	'<label>Don\'t attack attack shielded players: <input type="checkbox" id="'+spocklet+'_skipshield_a" checked title="Skip att shielded players" /></label><br />'+
	'<label title="Try to use Kamikazi boost before arena ends">Use kamikazi at the last <input type="text" value="20" '+$i('boostkami_s')+'>s of the battle: <input type="checkbox" id="'+spocklet+'_boostkami" /></label></td></tr>'+
	'<tr '+$c('conf')+'><td>Stop attacking:</td><td colspan="2"><select '+$i('stopon')+' title="In-arena play style">'+
	'<option value="never">never (attack until stamina is gone)</option>'+
	'<option value="stop">now (do not attack)</option>'+
	'<option value="leading">when having the lead by a specific number of points</option>'+
	'<option value="staminaused">when specific amount of stamina used</option>'+
	'<option value="staminaleft">when specific amount of stamina left</option>'+
	'</select><span '+$i('show_stopon_value')+'> value: <input type="text" '+$i('stoponvalue')+' value="0" /></span></td></tr>'+
	'<tr '+$c('conf')+'><td valign="top">Popups:</td><td colspan="2">'+
	'<label title="Show Levelup popup">Show Levelup-Popup: <input type="checkbox" id="'+spocklet+'_leveluppopup" checked /></label>'+
	'<label title="Auto-collect the promotion bonus">Collect Promotion-Bonus: <input type="checkbox" id="'+spocklet+'_levelupbonus" checked /></label>'+
	'</td></tr>'+
	'<tr '+$c('conf')+'><td colspan="3"><hr /></td></tr>'+
	'<tr><td>Stage:</td><td colspan="2"><span '+$i('stage')+'>Not started</span></td></tr>'+
	'<tr><td>Time left:</td><td colspan="2"><span '+$i('timeleft')+'>0</span>s</td></tr>'+
	'<tr><td>Connection:</td><td colspan="2"><span '+$i('connstatus')+'>-</span> <span '+$i('connstatus2')+'></span> <span '+$i('delay')+'></span></td></tr>'+
	'<tr><td valign="top"><a href="#" '+$i('togglepowerups')+' title="Click to show/hide Powerups">Power-Ups:</a></td><td colspan="2" valign="top"><span '+$i('powerups')+'></span></td></tr>'+
	'<tr><td>Stamina:</td><td colspan="2"><span class="stamina" '+$i('me_st')+'>0</span>, next +<span '+$i('replenish')+'>?</span> in <span '+$i('me_sr')+'>0</span>s, used: <span class="stamina" '+$i('me_stused')+'>0</span></td></tr>'+
	'<tr><td>Health:</td><td colspan="2"><span class="health" '+$i('me_health')+'>100</span>% &nbsp; <span '+$i('healin')+'></span></td></tr>'+
/*	'<tr><td valign="top"><a href="#" '+$i('toggleactions')+' title="Click to show/hide attack matrix">Actions:</a></td><td colspan="2"><span style="display:none;" '+$i('attmatrix_outer')+'></span></td></tr>'+*/
	'<tr><td valign="top"><a href="#" '+$i('toggletable')+' title="Click to show/hide Playertable">Playertable:</a></td><td colspan="2">'+
	'<table '+$i('table')+'>'+
	'<tr><th>Opponent</th><th>Info</th><th>Respect</th><th style="width:65px;">Health</th><th>Score</th><th>Shields</th></tr>'+
	'<tr><td><span '+$i('name0')+'>Opponent 0</span></td><td><span '+$i('diff0')+' class="difficulty"></span></td><td><span '+$i('respect0')+' class="respect">0</span></td><td><span class="health" '+$i('health0')+'>0</span></td><td><span '+$i('score0')+'>0</span></td><td><span '+$i('pu0')+'></span></td></tr>'+
	'<tr><td><span '+$i('name1')+'>Opponent 1</span></td><td><span '+$i('diff1')+' class="difficulty"></span></td><td><span '+$i('respect1')+' class="respect">0</span></td><td><span class="health" '+$i('health1')+'>0</span></td><td><span '+$i('score1')+'>0</span></td><td><span '+$i('pu1')+'></span></td></tr>'+
	'<tr><td><span '+$i('name2')+'>Opponent 2</span></td><td><span '+$i('diff2')+' class="difficulty"></span></td><td><span '+$i('respect2')+' class="respect">0</span></td><td><span class="health" '+$i('health2')+'>0</span></td><td><span '+$i('score2')+'>0</span></td><td><span '+$i('pu2')+'></span></td></tr>'+
	'<tr><td><span '+$i('name3')+'>Opponent 3</span></td><td><span '+$i('diff3')+' class="difficulty"></span></td><td><span '+$i('respect3')+' class="respect">0</span></td><td><span class="health" '+$i('health3')+'>0</span></td><td><span '+$i('score3')+'>0</span></td><td><span '+$i('pu3')+'></span></td></tr>'+
	'<tr><td><span '+$i('name4')+'>Opponent 4</span></td><td><span '+$i('diff4')+' class="difficulty"></span></td><td><span '+$i('respect4')+' class="respect">0</span></td><td><span class="health" '+$i('health4')+'>0</span></td><td><span '+$i('score4')+'>0</span></td><td><span '+$i('pu4')+'></span></td></tr>'+
	'<tr><td><span '+$i('name5')+'>Opponent 5</span></td><td><span '+$i('diff5')+' class="difficulty"></span></td><td><span '+$i('respect5')+' class="respect">0</span></td><td><span class="health" '+$i('health5')+'>0</span></td><td><span '+$i('score5')+'>0</span></td><td><span '+$i('pu5')+'></span></td></tr>'+
	'</table>'+
	'</td></tr>'+
	'<tr><td valign="top"><a href="#" '+$i('toggleloot')+' title="Click to show/hide loot log">Loot/Stats:</a></td><td></td></tr>'+
	'<tr '+$c('lootlog')+'><td valign=top>Strength:</td><td colspan="2"><span id="'+spocklet+'_strength_stats"></span></td></tr>'+
	'<tr '+$c('lootlog')+'><td valign=top>Stats:</td><td colspan="2"><span id="'+spocklet+'_allstats"></span></td></tr>'+
	'<tr '+$c('lootlog')+'><td valign=top>Loot:</td><td colspan="2" '+$i('lootlog')+'>loot loot loot</td></tr>'+
	'<tr><td valign="top"><a href="#" '+$i('togglelog')+' title="Click to show/hide spartacus log">Log:</a></td><td></td></tr>'+
	'<tr '+$i('logsp')+'><td colspan="3"><span id="'+spocklet+'_log"></span></td></tr>'+
//	'<tr><td colspan="3"><hr /></td></tr>'+
//	'<tr><td colspan="3"><span id="'+spocklet+'_debug" style="display:none;">Debug-Output</span><br />'+
//	'<a href="#" '+$i('debugsend')+'>send debug info about your connection to Spockholm</a><br />'+
//	'<a href="#" '+$i('debugsend_a')+'>send anonymous debug info about your connection to Spockholm</a><br />'+
//	'<textarea '+$i('debug_game')+' style="display:none;"></textarea>'+
	'</td></tr>'+
	'</table>'+
	'</div>';

function create_spartacus_div() {
	document.getElementById('spartacus_main').innerHTML = spocklet_html;
}

function create_handler(){
/*	$e('close').click(function(){
		run = false;
		$e('main').remove();
		clearInterval(restart_in_counter);
		try {
			socke.close();
		} catch(noopenedyet) {}
		return false;
	}); */
/*	$e('start').click(function(){
		clearInterval(restart_in_counter);
		if(!run) {
			run = true;
			check_stamina(join_arena);
		} else {
			log("Spartacus already running, be careful where you click!");
		}
		return false;
	}); */
	$e('rewards').click(function(){
		get_rewards(function(){});
		return false;
	});
/*	$e('debug_toggle').click(function(){
		debug=!debug;
		if(debug) {
			$e('debug').show();
			$e('delay').show();
		} else {
			$e('debug').hide();
			$e('delay').hide();
		}
		return false;
	});*/
	$('.'+spocklet+'_att').click(function(){
		attack($(this).attr('data-id'),1);
		return false;
	});
/*	$e('toggleactions').click(function(){
		$e('attmatrix_outer').toggle(10);
		return false;
	}); */
	$e('toggleloot').click(function(){
		$('.'+spocklet+'_lootlog').toggle();
		//write_loot();
		return false;
	});
	/* toggles for config */
	load_config();

	$e('config_toggle').click(function(){
		if(!show_config) {
			$('.'+spocklet+'_conf').show();
			$(this).addClass('green').removeClass('black');
		}
		else {
			$('.'+spocklet+'_conf').hide();
			$(this).addClass('black').removeClass('green');
		}
		show_config=!show_config;
		return false;
	});
	$e('restart_stam').change(function(){
		if(this.checked) {
			$e('show_restart_stam').show();
		} else {
			$e('show_restart_stam').hide();
		}
	}).trigger('change');
	$e('stopon').change(function(){
		if(this.selectedIndex>1) {
			$e('show_stopon_value').show();
		} else {
			$e('show_stopon_value').hide();
		}
	}).trigger('change');
	$('.'+spocklet+'_conf input,select').change(function(){
		save_config();
	});

/*	$e('debugsend').click(function(){
		debugsend(false);
		$(this).html('Thanks!');
		return false;
	});

	$e('debugsend_a').click(function(){
		debugsend(true);
		$(this).html('Thanks!');
		return false;
	}); */
}

/****************** connection functions ****************/




function join_arena() {
//	check if Spartacus is still running
	if ($('#'+spocklet+'_main').length == 0) {
		run = false;
		return;
	}

	/* initialize vars */
	cmdqueue=[];
	meid=null;
	poweratt = false;
	poweruplist = {};
	playerinfo={};
	playerids={};
	attmatrix={};
	stam_on_start = -1;
	powerup_status = {};
	da_game = [];
	$('span[id*="'+spocklet+'_pu"]').html('');
	$('span[id*="'+spocklet+'_name"]').html('');
	$('span[id*="'+spocklet+'_respect"]').html('');
	$('span[id*="'+spocklet+'_diff"]').html('');
	$('span[id*="'+spocklet+'_health"]').html('');
	$('span[id*="'+spocklet+'_score"]').html('');
	$e('attmatrix').remove();
	/* join */
	logmsg('Joining arena.', 'true_log');
//	log('Joining arena...');
	var type = $e('arenatype').val();
	replenish=(type=="sw"?2:(type=="lw"?10:50));
	$e('replenish').text(replenish);
	request('xw_controller=Lobby&xw_action=join_arena&arenaType='+type+'&xw_client_id=8',function(msg){
		//console.log(msg);
		var json = JSON.parse(msg);
		if(json.data.success == 1) {
			run = true;
			if(json.data.message=="User is in another arena") {
//				log('Successfully re-joined Arena.');
				logmsg('Successfully re-joined Arena.', 'true_log');
			} else {
//				log('Successfully joined Arena.');
				logmsg('Successfully joined Arena.', 'true_log');
			}
			load_arena();
		}
		else {
			if (json.data.message.indexOf('Refresh to claim your rewards from the previous Arena')!=-1) {
				log("Claiming your rewards from the previous Arena");
				get_rewards();
			}
			else if(json.data.message.indexOf('have enough stamina to join this arena')!=-1) {
				log('Not enough Stamina, stopping.');
				if($e('restart_stam').is(':checked')) {
					var min=parseInt($e('restart_minutes').val());
					restart_in=unix_timestamp()+(min*60);
					log('Restarting in '+min+' minutes');
					run = false;
					restart_in_counter = setInterval(function(){
						if(unix_timestamp()>restart_in) {
							clearInterval(restart_in_counter);
							check_stamina(join_arena);
						} else {
							run = false;
							$e('timeleft').html('Restart in '+(restart_in-unix_timestamp()));
						}
					},1000);
					//timer
				}
			}
			else if(json.data.message.indexOf('Unable to join')!=-1) {
				var wait = Math.floor(Math.round((Math.random() * 8))+2);
				log('Unable to join this Arena. Join another one. Trying again in '+wait+'s...');
				setTimeout(join_arena,wait*1000);
			}
			else {
				log('Could not join, msg='+json.data.message);
				run = false;
				checkit();
			}
		}

	},function(){
		log('Error on trying to join');
		run = false;
		checkit();
	});
}

function load_arena(){
	request('xw_controller=Lobby&xw_action=loadArena&xw_client_id=8',function(msg){
		var m;
		if(m = /viewObj.init\(\"([^\"]*)\",/.exec(msg)) {
			wslink = m[1];
			connect_arena(wslink);
		}
	},function(){
		log('Error on trying to load');
		run = false;
		checkit();
	});
}

function connect_arena(sockenurl) {
	socke=new WebSocket(sockenurl);
	socke.onopen=function(){
//		log('Connected to Arena.');	
		logmsg('Connected to Arena.', 'true_log');
		conn_checker = setInterval(check_connection,100);
	};
	socke.onmessage=function(msg){

//		log('Received:'+msg.data);
		var json=JSON.parse(msg.data);
//		if (debug) { da_game.push(json); }
//		if (debug) { $e('debug_game').val(JSON.stringify(da_game)).show(); }
		update_info(json);
		decide_actions();
		send_queue();

	};
	socke.onclose=function(){
		last_update=0;
//		$e('debugsend').show();
//		$e('debugsend_a').show();
//		if (debug) { $e('debug_game').val(JSON.stringify(da_game)).show(); }
		//log('Disconnected');
		clearInterval(conn_checker);
		$e('connstatus').html('-');
		$e('timeleft').html('0');
		get_rewards();
	};
}

function check_connection(){
	if(!run) {
		clearInterval(conn_checker);
	}
	if(last_update>0){
		var res,gap=(new Date()).getTime()-last_update;
		if(gap<600) {
			res='<span class="good">Good!</span>';
		} else if(gap<1200) {
			res='<span style="color:orange;font-weight:600;">Slow...</span>';
		} else {
			res='<span class="bad">Stalled!</span>';
		}
		$e('connstatus').html(res);
	}
}

/******************* behavior logic ********************/
function am_i_leading_by(points) {
	var best_player_points=0;
	for(var i in currdata.pi) {
		if(i!=meid) {
			if(currdata.pi[i].sc>best_player_points) { best_player_points=currdata.pi[i].sc;}
		}
	}
	var my_score=currdata.pi[meid].sc;
//	debuglog('My score: '+my_score+', BP score: '+best_player_points+', hence :'+(my_score-points>best_player_points));
	return my_score-points>best_player_points;
}

function decide_allowed_to_attack(){
	try {
		var stopon = $e('stopon').val();
		var stoponval = parseInt($e('stoponvalue').val());
		var stamused = stam_on_start-currdata.mi.st;

		if(currdata.pi[meid].ph==0) { return false; } // me dead
		if(currdata.mi.st<10) { return false; } // no stam
		if((currdata.mi.st<50) && (poweratt)) { return false; } // no stam
		switch(stopon) {
		case "never": return true;
		case "stop": return false;
		case "leading": return !am_i_leading_by(stoponval);
		case "staminaused": return stamused<stoponval;
		case "staminaleft": return currdata.mi.st>stoponval;
		}
	} catch(err) {}
	return true;
}

function decide_who_to_attack(){
	var target=$e('seltarget').val();
	if(powerup_status.kami_active) { target="highhealth"; }
	var skipshield_d=$e('skipshield').is(':checked');
	var skipshield_a=$e('skipshield_a').is(':checked');
	var bestid=-1,best=0,list=[];
	for(var i in currdata.pi) {
		if(i!=meid) {
			if((currdata.pi[i].ph>0)) {
				if(!(
						(skipshield_d && (currdata.pi[i].pu>1)) || 
						(skipshield_a && (currdata.pi[i].pu%2==1))
				)){
					var val;
					switch(target) {
					case "lowhealth": val=100-currdata.pi[i].ph; break;
					case "highhealth": val=currdata.pi[i].ph; break;
					case "lestpoints": val=1000000-currdata.pi[i].sc; break;
					case "mostpoints": val=currdata.pi[i].sc;break;
					case "leastrespect": val=10000-playerinfo[i].respect; break;
					case "mostrespect": val=playerinfo[i].respect; break;
					case "allalive": val=1; break;
					case "leastdiff": val=3-r_difficulty[playerinfo[i].diff]; break;
					}
					if(val>best) {
						list=[];
						list.push(i);
						best=val;
					} else if(val==best) {
						list.push(i);
					}
				}
			}
		}
	}
//	console.log(list);
	return list;
}

function decide_actions(){
	var numatt = 3;
	try{
		numatt = $e('numatt').val();
	}
	catch(e){}
	if(numatt>10) { numatt=10; }
	if(currdata.s==2) { // fight active
		if($e('powerattack').is(':checked')) {
			poweratt_on();
		} else {
			poweratt_off();
		}
		if(decide_allowed_to_attack()) {
			var who=decide_who_to_attack();
			var na=Math.ceil(numatt/who.length);
			for(var i=0;i<who.length;i++) {
				attack(who[i],na);
			}
		}
		// power ups
		var usekami=$e('boostkami').is(':checked');
		if(usekami && !powerup_status.kami_used) {
			var kamitime = parseInt($e('boostkami_s').val());
			if(currdata.t<kamitime) {
				//cmdqueue.push('3:5');
				use_powerup(5);
			}
		}
	}
}

/********************* communication and stats ***********************/
function get_rewards(handler) {
//	log('Retrieving rewards...');
	request('xw_controller=Arena&xw_action=rewards&xw_client_id=8',function(msg){
		parse_loot(msg);
		setTimeout(function(){ getStats(displayMafiaStats); },2000);
		if($e('restart').is(':checked')) {
			if(currdata.mi.st>=parseInt($e('min_stam_for_restart').val())) {
				join_arena();
			} else {
				check_stamina(join_arena);
			}
		} else {
			run = false;
		}
	});
}

function check_stamina(handler) {
	if(!($e('check_stam').is(':checked'))) {
		handler();
	} else {
		log("Checking stamina...");
		request('xw_controller=propertyV2&xw_action=createData&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&city=7&xw_client_id=8',function(msg){
			try {
				var data = JSON.parse(msg);
				var stamavail=data.user_fields.user_stamina;
				var xpneed=data.user_fields.exp_to_next_level;
			} catch(e) {
				log("Error parsing JSON, retry in 5s");
				setTimeout(check_stamina,5000,handler);
				return;
			}
			var can_restart = true;
			var stamneed=parseInt($e('min_stam_for_restart').val());
			if(stamavail>stamneed){
				can_restart = true;
			} else {
				can_restart = false;
			}
			if(parseFloat($e('min_ratio_for_restart').val())) {
				//console.log([parseFloat($e('min_ratio_for_restart').val()),stamavail,xpneed,xpneed/stamavail]);
				if (parseFloat($e('min_ratio_for_restart').val())<(xpneed/stamavail)) {
					can_restart = false;
				}
			}

			if (can_restart) {
				handler();
			} else {
				log("Not enough stamina/ratio, check your config settings.");
				run = false;
				if($e('restart_stam').is(':checked')) {
					var min=parseInt($e('restart_minutes').val());
					restart_in=unix_timestamp()+(min*60);
					log('Restarting in '+min+' minutes');
					restart_in_counter = setInterval(function(){
						if(unix_timestamp()>restart_in) {
							clearInterval(restart_in_counter);
							check_stamina(join_arena);
						} else {
							$e('timeleft').html('Restart in '+(restart_in-unix_timestamp()));
						}
					},1000);
					//timer
				}				
			}
		});
	}
}

function parse_loot(msg){
	window.eikea=msg;
	var $msg=$('<div>'+msg+'</div>');
	var rewards={};
	rewards.xp=parseInt($msg.find('.xp_earned > .value').text());
	rewards.respect=parseInt($msg.find('.respect_earned > .value:first').text());
	if($msg.find('.respect_earned > .label:last').text().indexOf('Crests')!=-1) {
		rewards.crests=parseInt($msg.find('.respect_earned > .value:last').text());
	}
	rewards.stam_cur=parseInt($msg.find('.stamina_stats > .current').text());
	rewards.stam_total=parseInt($msg.find('.stamina_stats > span:last').text());
	rewards.rank=$msg.find('.rank_holder > .position').text();
	if(currdata) {
		rewards.stamused=(stam_on_start - currdata.mi.st);
	}
	rewards.ratio=(rewards.xp / rewards.stamused).toFixed(2);
	rewards.loot=[];
	var loot_strings=[];
	$($msg.find('#your_reward_list > .arena_fight_rewards_item_container')).each(function(){
		var loot = {};
		loot.name = $(this).find('.arena_reward_items_bg > .name').text().trim() || $(this).find('.arena_reward_items_special_bg > .name').text().trim();
		loot.id = $(this).find('.arena_reward_items_bg img').attr('item_id') || false;
		loot.src = $(this).find('.arena_reward_items_bg img').attr('src') || $(this).find('.arena_reward_items_special_bg img').attr('src');
		loot.quantity = parseInt($(this).find('.qty').text().trim().substr(2)) || 1;
		loot.attack = parseInt($(this).find('.attack').text().trim()) || 0;
		loot.defense = parseInt($(this).find('.defense').text().trim()) || 0;
		rewards.loot.push(loot);
		loot_strings.push('<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
		add_loot(loot);
	});
	if(rewards.crests){
		var loot={ name:"Crests", src:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/crestlogo_16.png",quantity:rewards.crests };
		rewards.loot.push(loot);
		loot_strings.unshift('<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
		add_loot(loot);
	}
//	console.log(rewards);
//	log('Result: '+rewards.rank+' Place: <span class="experience">'+rewards.xp+' ('+rewards.ratio+')</span> <span class="respect">'+(rewards.respect>0?'+':'')+rewards.respect+'</span> '+loot_strings.join(''));
	write_loot();

	var logline='Results: ';
	$($msg.find('.standings_list')).each(function(){
		var pos=$(this).find('.pos').text();
		var name=$(this).find('.name').text();
		var resp=$(this).find('.respect_wrapper').html();
		var powerups='';
		$(this).find('.powerups_used img').each(function(){
			powerups+='<img src="'+this.src+'" width=16 height=16 />';
		});
		logline+=pos+'. '+name+' <span class="respect">'+resp+'</span> '+powerups+' ';
		if(pos==parseInt(rewards.rank)) { stats.respect=parseInt(resp); }
	});
	log(logline);

	var leveled = false;	
	if(msg.indexOf('You are now LEVEL')!=-1) {
		logmsg('<span class="good">Levelup!</span>', 'true_log');
//		log('<span class="good">Levelup!</span>');
		if($e('leveluppopup').is(':checked')) {
			var code=msg.re('(setTimeout.*\\,\\s10\\)\\;)');
			eval(code);
		}
//		if($e('levelupbonus').is(':checked')) {
//			//collect the levelup bonus
//			grab_bonus();
//		}
		leveled=true;
		Drone.CurrentLevel++;
		grab_bonus();
	}
		
	stats.stamina+=rewards.stamused;
	stats.xp+=rewards.xp;
	stats.arenas++;
	stats.ranks[parseInt(rewards.rank)-1]++;
	stats.crests+=rewards.crests;
	
	correct_zynga(leveled, rewards.xp);
	//setTimeout(do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&tab=0', 1, 1, 0, 0),1000);
    setTimeout(checkit,1500);
}

function correct_zynga(leveled, xp_gained){
	try{
		if(leveled){
			document.getElementById("user_energy").innerHTML = parseInt(document.getElementById('user_max_energy').innerHTML);
			document.getElementById("user_stamina").innerHTML = parseInt(document.getElementById('user_max_stamina').innerHTML);
			document.getElementById("exp_to_next_level").innerHTML = Math.floor(Drone.CurrentLevel*12.5);
			document.getElementById("user_level").innerHTML = Drone.CurrentLevel;
		}
		else{
			document.getElementById("user_stamina").innerHTML = parseInt(document.getElementById('spartacus_me_st').innerHTML);
			var xp_to_level = parseInt(document.getElementById("exp_to_next_level").innerHTML);
			document.getElementById("exp_to_next_level").innerHTML = xp_to_level-xp_gained;
		}
	}
	catch(e){}
}

//function grab_bonus() {
//	request('xw_controller=levelUpBonus&xw_action=addBonusItem&xw_city=&mwcom=1&no_load=1',function(page){
//		if (page.indexOf('ERROR 500: response never closed') != -1) {
//			log('<span class="bad">Bonus not available/already retrieved</span>');
//
//		} else {
//			var data = JSON.parse(page.replace(/^(\s\d\s+)/,''));
//			log('Level '+data.user_fields.user_level+' bonus: <img src="'+data.bonusImage+'" height="16" width="16" /> '+data.bonusName);
//		}
//	});
//}

function add_loot(item) {
	var id = (Util.isset(item.id) ? item.id : item.name);
	if (typeof looted[id] == 'object') {
		looted[id].quantity += item.quantity;
	}
	else {
		looted[id] = {
				"id": id, "name": item.name, "src": item.src, "quantity": item.quantity, "attack":item.attack, "defense":item.defense
		};
	}
}

function sort_loot(){
	var list = [];
	for (var x in looted) {
		list.push(x);
	}
	list.sort(function(a,b){
		if(looted[a].name=="Ices") { return -1; }
		if(looted[b].name=="Ices") { return 1; }
		if(looted[a].name=="Crests") { return -1; }
		if(looted[b].name=="Crests") { return 1; }
		return compare(max(looted[a].attack,looted[a].defense),max(looted[b].attack,looted[b].defense));
	});
	return list;
}

function write_loot() {
	var sorted=sort_loot();
	var loothtml = '<table>';
	for (i=0;i<sorted.length;i++) {
		var loot = looted[sorted[i]];
		var image = '<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" title="'+loot.name+'" width="16" height="16" />';
		if (itemdatabase[loot.id]) {
			var loot2 = itemdatabase[loot.id];
			var attack = '', defense = '', improves = false, improve = '';
			if (loot2.attack > 0) {
				attack = '['+loot2.attack+'A';
				if(worstitems[itemdatabase[loot.id].type].att<loot2.attack) {
					improves = true;
					improve += '<span class="attack good">+'+(loot2.attack - worstitems[itemdatabase[loot.id].type].att)+'</span> ';
				}
			}
			if (loot2.defense > 0) {
				defense = loot2.defense+'D]';
				if(worstitems[itemdatabase[loot.id].type].def<loot2.defense) {
					improves = true;
					improve += '<span class="defense good">+'+(loot2.defense - worstitems[itemdatabase[loot.id].type].def)+'</span>';
				}
			}
			var have = loot.quantity;

			have = (loot2.quantity>0?' <span class="more_in">Have: '+(loot2.quantity+loot.quantity)+'</span>':'');
			loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td><td>'+image+'<span style="'+(improves?"color:yellow;":"")+'">'+loot2.name+'</td><td>'+attack+'</td><td>'+defense+'</span></td><td>'+improve+'</td><td>'+have+'</td></tr>';
		}
		else
		{
			if(loot.name=="Ices") {
				loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td><span style="color: #609AD1; font-weight:bold;">'+image+loot.name+'</span></td><td></tr>';
			} else {
				loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td>'+image+loot.name+'</td><td></tr>';
			}
		}
	}
	loothtml += '</table>';
	$e('lootlog').html(loothtml);
}

function get_stage(i) {
	if(i==0) { return "Waiting for more player"; }
	if(i==1) { return "Waiting for Start"; }
	if(i==2) { return "Fighting"; }
	if(i==3) { return "Finished"; }
	return "Unknown:"+i;
}

function send_queue() {
//	send queued powerup
	if(powerup_command.active!=-1) {
		cmdqueue.unshift('3:'+powerup_command.active);
		if(powerup_command.active==1) {
			powerup_command.active = -1;
		}
		if(powerup_command.active==2) {
			powerup_command.active = -1;
		}
	}

	if(cmdqueue.length>0) {
		/* only debug */
/*		if(debug) {
			var debugstr='Send:';
			for(var i=0;i<cmdqueue.length;i++) {
				var cmd=cmdqueue[i].split(':');
				if(cmd[0]=="1") { debugstr+=' Attack #'+cmd[1]; }
				if(cmd[0]=="2") { debugstr+=' Poweratt '+cmd[1]; }
				if(cmd[0]=="3") { debugstr+=' Powerup '+powerups[cmd[1]].name; }
			}
//			debuglog(debugstr);
		}*/
		/* only debug end */
		var string='{"Nonce":'+currdata.mi.ammo+',"CMD":"'+cmdqueue.join(';')+'"}';
		cmdqueue=[];
		socke.send(string);
//		if (debug) { da_game.push(JSON.parse(string)); }
//		log("Send: "+string);
	}
}

function attack(i,num) {
	for(var j=0;j<num;j++) {
		cmdqueue.push("1:"+i);
	}
}

function poweratt_on() {
	if(!poweratt) {
		cmdqueue.push("2:1");
		poweratt=true;
	}
}

function poweratt_off() {
	if(poweratt) {
		cmdqueue.push("2:0");
		poweratt=false;
	}
	return false;
}

function use_powerup(id) {
	powerup_command.active=id;
}


function display_matrix(){
//	var i,j,ts=unix_timestamp();
//	if($e('attmatrix').length==0) {
//		var html='<table '+$i('attmatrix')+' cellspacing=0 cellpadding=0><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th>';
//		for(i=0;i<6;i++) {
//			html+='<tr><th>'+(i+1)+'</th>';
//			for(j=0;j<6;j++) {
//				html+='<td '+$i('mat_'+i+'_'+j)+'>'+(i==j?'':0)+'</td>';
//			}
//			html+='</tr>';
//		}
//		html+='</table>';
//		$e('attmatrix_outer').html(html);
//	}
//	for(i in attmatrix) {
//		for(j in attmatrix[i]) {
//			$e('mat_'+i+'_'+j).html(attmatrix[i][j].count).css('background-color',(ts-attmatrix[i][j].lastupdate<2?'red':'black'));
//		}
//	}
}

function update_info(data) {
	if(data.s==2) {
		// update last data received
		if(last_update>0) {
			var newtime=(new Date()).getTime();
//			update_debug.push(newtime-last_update);
			$e('delay').text((newtime-last_update)+'ms');
			last_update=newtime;
//			window.eike=update_debug;
		} else {
			last_update=(new Date()).getTime();
		}
	}



//	debuglog(JSON.stringify(data));
//	console.log(data);
	$e('timeleft').html(data.t);

//	counter
	if(data.s==1) {
		starting_in = unix_timestamp()+data.t;
		clearInterval(starting_in_counter) ;
		starting_in_counter = setInterval(function(){
			if(starting_in < unix_timestamp()) {
				clearInterval(starting_in_counter) ;
			} else {
				$e('timeleft').html(starting_in - unix_timestamp());
			}
		},1000);
		if(data.mi) {
			stam_on_start = data.mi.st; // save at start
		}
	}
	else {
		clearInterval(starting_in_counter);
	}

	if(data.mi && (stam_on_start==-1)) {
		stam_on_start = data.mi.st;
	}


	$e('stage').html(get_stage(data.s));
	if(data.s<1) {
		$e('stage').append(' <a href="#" '+$i('leave')+'>(leave)</a>');
		$e('leave').click(function(){
			request('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8',function(msg){
				if(msg.indexOf('do_ajax')!=-1) {
					log("Sucessfully escaped");
				} else {
					log("Could not leave, too late.");
				}
//				if(debug) { console.log(msg); }
			});
			return false;
		});
	}


//	$e('ac').html(data.ac); boring old stuff
//	amazing new stuff: attack matrix
	if(data.ac) {
		var attacks=data.ac.split(';');
		var ts=unix_timestamp();

		for(var i=0;i<attacks.length;i++) {
			var attacker_defender=attacks[i].split(':');
			var att=attacker_defender[0],def=attacker_defender[1];

			if(!attmatrix[att]) {
				attmatrix[att]={};
			}
			if(!attmatrix[att][def]) {
				attmatrix[att][def]={ count:1, lastupdate:ts};
			}
			else {
				attmatrix[att][def].count++;
				attmatrix[att][def].lastupdate=ts;
			}
		}
		//console.log(attmatrix);
		display_matrix();
	}

//	enemy powerups
	for(var i in data.pi) {
		var pi=data.pi[i];
		// thanks for Alex for this idea
		if(pi.ph == 0){
			if(healtimer[i]<10) {
				healtimer[i] = unix_timestamp() + 10;
			}
			var t=(healtimer[i] - unix_timestamp()); if(t<1) { t=1; }
			$e('health'+i).html('<span class="bad">in '+t+'s</span>');
		} else {
			$e('health'+i).html(pi.ph.toFixed(1)+'%');
		}			
		if(unix_timestamp()>healtimer[i]) {
			healtimer[i] = 0;
		}

		$e('score'+i).html(pi.sc);
		var puhtml='';
		if(pi.pu>1) { puhtml+='<span class="'+spocklet+'_defsh">&nbsp;</span> '; }
		if(pi.pu%2==1) { puhtml+='<span class="'+spocklet+'_offsh">&nbsp;</span> '; }
		$e('pu'+i).html(puhtml);
	}
	if(data.mi) {
		$e('me_st').html(data.mi.st);
		//$e('me_ammo').html(data.mi.ammo);
//		$e('me_pst').html(data.mi.pst);
		if(data.mi.pui) {
			update_powerups(data.mi.pui);
		}
		$e('me_sr').html(data.mi.sr);

		if(currdata && currdata.mi) {
			if(data.mi.st>currdata.mi.stam+100) { // used used a stam refill
				log("used a stam refill!");
				stam_on_start += (data.mi.st-currdata.mi.stam);
			}
		}
		$e('me_stused').html(stam_on_start - data.mi.st);
	}

//	healing timer
	if(meid) {
		$e('me_health').removeClass('good').removeClass('bad').addClass(data.pi[meid].ph>0?'good':'bad').html(data.pi[meid].ph);
		if((data.pi[meid].ph==0) && (currdata.pi[meid].ph>0)) {
			healed_in=unix_timestamp()+10;
			clearInterval(healed_in_counter);
			healed_in_counter = setInterval(function(){
				if(unix_timestamp()>healed_in) {
					clearInterval(healed_in_counter);
					$e('healin').html('');
				} else {
					$e('healin').html('Healing in '+(healed_in - unix_timestamp())+'s');
				}
			},1000);
		} else {
			try {
				$e('healin').html('');
				clearInterval(healed_in_counter);
			} catch(e){ }
		}
	}

	for(var i in data.pi) {
		if((data.pi[i].pid) && (!playerids[data.pi[i].pid])) {
			playerinfo[i]={ id:data.pi[i].pid };
			playerids[data.pi[i].pid]=i;
			if(data.pi[i].pid==User.id.substr(2)) {
				meid=i;
			}

			request('xw_controller=Arena&xw_action=getSingleUserData&pid='+data.pi[i].pid+'&xw_client_id=8',function(msg){
				var json=JSON.parse(msg);
				for(var id in json.data.result) {
					var nr=playerids[id];
					playerinfo[nr].name=json.data.result[id].name;
					playerinfo[nr].respect=json.data.result[id].playerRespect.replace(',','');
					playerinfo[nr].diff=difficulty[json.data.result[id].defenseFlag+json.data.result[id].mafiaDefenseFlag];
					if(id == User.id.substr(2)) {
						$e('name'+nr).html('<img src="'+json.data.result[id].pic+'" width="32" height="32" /><span class="good">Me!</span>');
						$e('diff'+nr).html('<div class="difficulty">-</div>');
						if(!stats.respect) { stats.respect_start=json.data.result[id].playerRespect.replace(',',''); }
					}
					else {
						var m;
						if(m=/\d+_(\d+)_\d+/.exec(json.data.result[id].pic)) {
							$e('name'+nr).html('<span '+$i('hover'+nr)+'><img src="'+json.data.result[id].pic+'" width="32" height="32" /><a href="https://www.facebook.com/'+m[1]+'" target="_blank">'+playerinfo[nr].name+'</a></span>');
						} else {
							$e('name'+nr).html('<span '+$i('hover'+nr)+'><img src="'+json.data.result[id].pic+'" width="32" height="32" />'+playerinfo[nr].name+'</span>');
						}
						$e('name'+nr).append('<span data-id="'+id+'" '+$i('infobox'+nr)+' style="display:none;position:absolute;border:2px white solid;background-color:#222;padding:5px;border-radius:5px;">loading...</span>');
						$e('diff'+nr).html('<div class="difficulty">'+playerinfo[nr].diff+'</div>');
					}
					$e('respect'+nr).html(playerinfo[nr].respect);
					$e('hover'+nr).hover(function(event){
						var num=this.id.substr(6+spocklet.length);
						var id=$e('infobox'+num).attr('data-id');
						$e('infobox'+num).css("top",event.pageY+'px').css("left",(event.pageX-200)+'px');
						if(!$e('infobox'+num).attr('spdone')) {
							$e('infobox'+num).html('Profile loading...');
							load_player_profile(id,num);
						}
						$e('infobox'+num).show();
					},function(){
						var num=this.id.substr(6+spocklet.length);
						$e('infobox'+num).hide();
					});
				}
			});
		}
	}
	currdata=data;
}
function load_player_profile(id,nr) {
	$e('infobox'+nr).attr('spdone','true');
	request('xw_controller=stats&xw_action=view&user='+btoa('p|'+id),function(result){
		var $msg=$('<div>'+result.replace(/<img/g,'<noimg')+'</div>');
		window.eike1=result;
		window.eike2=$msg;
		try {
			var name=$msg.find('.stats_title_text').html().re('a> ([^>]*)"');
			var level=$msg.find('.stats_title_text').html().re('level (\\d*)');
			var tag=$msg.find('.stats_title_text > a').text().trim();
			var llink=$msg.find('.stats_title_text > a').attr('href');
			var arena_stats=$msg.find('#arena_collection .collection_list').text().trim().replace(/s*\n\s*/g,"<br />").replace(/:/g,': ');
			var mafia=$msg.find('a:contains("Ask Mafia to Attack")').length==0;
			var fid=atob(unescape(llink.re('id=([^&]*)&')));
		} catch(nofam) {
			var name=$msg.find('.stats_title_text').text().trim().re('"(.*)"');
			var tag="no family";
			var llink='';

		}
		var html='Full name: '+name+'<br />'+
		'Family: '+tag+' ('+fid+')<br/>'+
		'Level: '+level+'<br />'+
		(mafia?'<span class="good">In your mafia</span>':"Not a mafia member")+'<br /><br />'+
		arena_stats;
		$e('infobox'+nr).html(html);
		if(tag&&llink) {
			$('#'+spocklet+'_hover'+nr+' > img').after(
					'<a href="http://"+zserver+".mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=clan&xw_action=view&xw_city=7&mwcom=1&id='+escape(btoa(fid))+'&from_red_link=1" class="mw_new_ajax" selector="#inner_page"><span style="color:red">'+tag+'</span></a> '
			);
		}
	});
}

function update_powerups(pui) {
	var html='<table id="spartacus_powerups_table"><tr>';
	var pups=pui.split('|');
	for(var i=0;i<pups.length;i++) {
		var pup=pups[i].split(',');
		var m=(pup[0].indexOf('-')===0);
		pup[0]=Math.abs(pup[0]);
		poweruplist[pup[0]]={ num:pup[2],cooldown:pup[1],type:m };
		if((powerup_command.count[pup[0]]!=pup[2]) && (powerup_command.active==pup[0])) {
			powerup_command.active=-1;
		}
		powerup_command.count[pup[0]]=pup[2];
	}
	for(var i in powerups) {
		if(poweruplist[i].cooldown>0) { 
			html+='<td valign=top style="text-align:center;"><img class="'+spocklet+'_notusepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num;
			html+='<br /><span title="On cooldown or active">A/C</span> '+poweruplist[i].cooldown+'s</span>'; 
		} else if (powerup_command.active==i) {
			html+='<td valign=top style="text-align:center;"><img class="'+spocklet+'_notusepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num+
			'<br /><span title="Firing (sending command to server)">Fire</span>';
		} else {
			html+='<td valign=top style="text-align:center;"><img class="'+spocklet+'_usepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num;
			html+='<br /><span '+$i('pustatus'+i)+'></span>';
		}
		html+='</td>';
	}
	html+='</table>';
	if(poweruplist[5].cooldown>0) {
		powerup_status.kami_active = true;
		powerup_status.kami_used = true;
	}

	$e('powerups').html(html);
	$('.'+spocklet+'_usepowerup').click(function(){
		var id=$(this).attr('data-id');
		log("Using powerup: "+powerups[id].name);
		$e('pustatus'+id).html('<span title="Firing (sending command to server)">Fire</span>');
		use_powerup(id);
		return false;
	});
	document.getElementById("spartacus_powerups_table").hidden = spartacus_powerups_table_is_hidden;
}
/******************** config ********************/
function save_config(){
	var config={};
	$('.'+spocklet+'_conf input[type=text]').each(function(){
		config[this.id.replace(spocklet,'')]=$(this).val();
	});
	$('.'+spocklet+'_conf input[type=checkbox]').each(function(){
		config[this.id.replace(spocklet,'')]=this.checked;
	});
	$('.'+spocklet+'_conf select').each(function(){
		config[this.id.replace(spocklet,'')]=$(this).val();
	});
//	console.log(config);
	$s('config',JSON.stringify(config));
}

function load_config(){
	try {
		var config=JSON.parse($g('config'));
		$('.'+spocklet+'_conf input[type=text]').each(function(){
			$(this).val(config[this.id.replace(spocklet,'')]);
		});
		$('.'+spocklet+'_conf input[type=checkbox]').each(function(){
			this.checked=config[this.id.replace(spocklet,'')];
		});
		$('.'+spocklet+'_conf select').each(function(){
			$(this).val(config[this.id.replace(spocklet,'')]);
		});
	} catch(dannhaltnicht) { }
}

function displayMafiaStats(){
	$('#'+spocklet+'_strength_stats').html('');
	$('#'+spocklet+'_strength_stats').append(mafia_attack+' '+commas(stats.mafiaatt)+' (<span class="'+(stats.mafiaatt-stats.start_mafiaatt >= 0?'good">+':'bad">')+''+commas(stats.mafiaatt-stats.start_mafiaatt)+'</span>) ');
	$('#'+spocklet+'_strength_stats').append(mafia_defense+' '+commas(stats.mafiadef)+' (<span class="'+(stats.mafiadef-stats.start_mafiadef >= 0?'good">+':'bad">')+''+commas(stats.mafiadef-stats.start_mafiadef)+'</span>) ');
	display_all_stats();
}

function display_all_stats(){
	var html='';
	html+='Total arenas: '+stats.arenas+' ';
	html+='[';
	html+=stats.ranks[0]+'&times1st, ';
	html+=stats.ranks[1]+'&times2nd, ';
	html+=stats.ranks[2]+'&times3rd, ';
	html+=stats.ranks[3]+'&times4th, ';
	html+=stats.ranks[4]+'&times5th, ';
	html+=stats.ranks[5]+'&times6th';
	html+=']<br />';

	html+='Respect: <span class="respect">'+stats.respect+' ('+sdiff(stats.respect - stats.respect_start)+')</span> ';
	if(stats.crests) { 
		html+='Crests: <span class="arena_mastery_crests">'+sdiff(stats.crests)+'</span> ';
	}
	html+='<span class="experience">'+stats.xp+'</span> ';
	html+='<span class="stamina">'+stats.stamina+'</span> ';
	html+='<span class="experience">'+(stats.xp/stats.stamina).toFixed(2)+'</span> ';


	$e('allstats').html(html);
}

/******************** helper *********************/
function sdiff(num,color) {
	if(num==0) {
		return '&plusmn;0';
	} else if(num>0) {
		return '+'+num;
	} else {
		return num;
	}
}


var Ping = {
		inUse:false,
		start:0,
		ping:function(ip, callback) {
	if(!this.inUse) {

		this.inUse = true;
		this.callback = callback;
		this.ip = ip;

		var _that = this;

		this.img = new Image();

		this.img.onload = function() {_that.good();};
		this.img.onerror = function() {_that.good();};

		this.start = (new Date()).getTime();
		this.img.src = "http://" + ip + '?id='+Math.random(4);
		this.timer = setTimeout(function() { _that.bad();}, 1500);
	}
},
good:function(){
	if(this.inUse) {
		this.inUse = false;
		this.callback((new Date()).getTime()-this.start);
		clearTimeout(this.timer);
	}
},
bad:function(){
	if(this.inUse) {
		this.inUse = false;
		this.callback(-1);
	}
}
};

//var arr;
/*function debugsend(anon){
	var comment=prompt("Enter message to us, i.e. \"Connection problems at second 30-35\". Or leave empty.");
	arr=[];
	Ping.ping('arena-2.mafiawars.zynga.com',function(ms){
		arr.push(ms);
		Ping.ping('arena-2.mafiawars.zynga.com',function(ms){
			arr.push(ms);
			Ping.ping('arena-2.mafiawars.zynga.com',function(ms){
				arr.push(ms);
				$.ajax({
					url:'http://spockon.me/spartacus_stats.php',
					data: {
					fbid:anon?'':User.trackId,
							ping:arr.join(','),
							con:update_debug.join(','),
							comment:comment
				},
				dataType: "json",
				type:"post",
				success: function(data) {
					console.log(data);
				}
				});		


			});
		});
	});
} */



function loadStats(){
	getStats(function(){
		// save first stats
		stats.start_mafiaatt=stats.mafiaatt;
		stats.start_mafiadef=stats.mafiadef;
		displayMafiaStats();
		loadInventoryAAN();
	});
}
function isArray(obj) {
	return obj.constructor == Array;
}
function loadInventoryAAN() {
	User.clicks++;
	var preurl = '//'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?';
	var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_city': 1,
			'clicks': User.clicks
	};
	$.ajax({
		type: "POST",
		url: preurl+'xw_controller=inventory&xw_action=view&from_controller=inventory',
		data: params,
		cache: false,
		success: function(response){
		//itemdatabase = {};
		var ZyngaItems = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
		worstitems = jQuery.parseJSON(/MW.WorstItemsModule.update\((\{.*\})\);/.exec(response)[1]);
		//Locations = jQuery.parseJSON(/var Locations = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
		for (x in ZyngaItems) {
			ZyngaItems[x].combined = parseInt(ZyngaItems[x].attack+ZyngaItems[x].defense);
			itemdatabase[ZyngaItems[x].id] = ZyngaItems[x]; //{quantity: ZyngaItems[x].quantity}
		}
//		log('Inventory load complete.');
		logmsg('Inventory load complete.', 'true_log');
		//console.log(worstitems);
		//console.log(itemdatabase);

	},
	error: function(){
		log('<span class="bad">Inventory Load failed!</span>');
	}
	});
}

function getStats(handler) {
	request('xw_controller=propertyV2&xw_action=createData&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&city=7&xw_client_id=8',function(msg){
		var data = JSON.parse(msg);
		stats.mafiaatt=parseInt(data.fightbar.group_atk);
		stats.mafiadef=parseInt(data.fightbar.group_def);
		stats.stam=parseInt(data.user_fields.user_max_stamina);
		stats.worstitems=data.worstitems;
		if(handler) { handler(); }
	});
}

function min(a,b){
	return a<b?a:b;
}
function max(a,b){
	return a>b?a:b;
}
function imgurl(img,w,h,a) {
	return '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'" align="absmiddle">';
}
function commas(s) {
	var d;
	while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
		s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
	}
	return s;
}
function unix_timestamp() {
	return parseInt(new Date().getTime().toString().substring(0, 10));
}
function compare(a,b) {
	if (a==b) { return 0; }
	if (a>b) { return -1; }
	return 1;
}

function timestamp(sec) {
	var now = new Date();
	var CurH = now.getHours();
	CurH = (CurH<10?'0'+CurH:CurH);
	var CurM = now.getMinutes();
	CurM = (CurM<10?'0'+CurM:CurM);
	var CurS = now.getSeconds();
	CurS = (CurS<10?'0'+CurS:CurS);
	if(sec) {
		return '<span class="more_in">['+CurH+':'+CurM+':'+CurS+']</span> ';
	} else {
		return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
	}
}

function log(message){
	message='<span class="more_in">'+timestamp()+'</span> '+message;
	logs.unshift(message);
	showlog();
}
/*function debuglog(message){
	message='<span class="more_in">'+timestamp(true)+'</span> '+message;
	debuglogs.unshift(message);
	if(debuglogs.length>10) { debuglogs.pop(); }
	$e('debug').html(debuglogs.join('<br />'));
}
*/
function $e(element) {
	return $('#'+spocklet+'_'+element);
}
function $i(element) {
	return 'id="'+spocklet+'_'+element+'"';
}

function $c(element) {
	return 'class="'+spocklet+'_'+element+'"';
}

function $s(name,value) {
	storage.setItem(spocklet+'_'+name+'_'+User.trackId, value);
}

function $g(name) {
	return storage.getItem(spocklet+'_'+name+'_'+User.trackId);
}

function $b(name,text,color,mouseover) {
	if(!color) { color="black"; }
	if(!mouseover) { mouseover = text; }
	return '<a href="#" id="'+spocklet+'_'+name+'" class="sexy_button_new short '+color+'" title="'+mouseover+'"><span><span>'+text+'</span></span></a>';
}

//by Eike
String.prototype.re = function(regex){
	var r=new RegExp(regex);
	var m;
	if(m=r.exec(this)) {
		return m[1];
	} else {
		return '';
	}
};

function showlog(){
	var displaylogs=logs.slice(0,loglines);
	var footer = logs.length>0?'<br /><a href="#" '+$i('logs_more')+' title="Show 10 more lines">more</a> <a href="#" '+$i('logs_less')+' title="Show 10 less lines">less</a> <a href="#" '+$i('logs_clear')+' title="Clear log">clear</a>':'';
	$('#'+spocklet+'_log').html(displaylogs.join('<br />')+footer);
	$e('logs_more').click(function(){ loglines+=10; showlog(); return false;});
	$e('logs_less').click(function(){ loglines-=10; showlog(); return false;});
	$e('logs_clear').click(function(){ logs=[]; showlog(); return false;});
}

function request(url, handler, errorhandler) {
	var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
	if (url.indexOf('cb=') == -1) {
		url += '&cb='+User.id+timestamp;
	}
	if (url.indexOf('tmp=') == -1) {
		url += '&tmp='+timestamp;
	}
	User.clicks++;
	var preurl = '//'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?';
	var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
	};
	$.ajax({
		type: "POST",
		url: preurl+url,
		data: params,
		cache: false,
		success: handler,
		error: errorhandler
	});
}



javascript:(function(){
	initialize_storage();
//	refresh_access_token();
	readSettings();	
	create_config_html();
	create_div();
	initialize_drone_startscreen();	
	initialize_ajax_call_for_fights();	
	loadContent('http://www.google-analytics.com/ga.js');
}());