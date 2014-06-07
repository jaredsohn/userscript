// ==UserScript==
// @name           buffscript
// @namespace      buffscript
// @description    buffscript
// @include        http://www.buff-community.de/users/*
// @include        http://www.buff-community.com/users/*
// @version        1.0.17
// ==/UserScript==
var $ = unsafeWindow.jQuery;

var loadTime = (new Date()).getTime();
var tabs = $('#buff-tabs').tabs();
tabs.find( ".ui-tabs-nav" ).append( $('<li class="ui-state-default ui-corner-top"><a href="#ui-tabs-3">AutoAccept</a></li>') );
tabs.append( '<div id="ui-tabs-3" class="ui-tabs-hide"></div>' );
tabs.tabs( "refresh" );

var getLocal = function(name){
	var val = unsafeWindow.localStorage.getItem(name);
	return (val !== null) ? val : (arguments.length > 1) ? arguments[1] : val;
};

var getSession = function(name){
	var val = unsafeWindow.sessionStorage.getItem(name);
	return (val !== null) ? val : (arguments.length > 1) ? arguments[1] : val;
};

// storLocal( name, value )
var storLocal = function(name, value){
	unsafeWindow.localStorage.setItem(name, value);
};

// storSession( name, value )
var storSession = function(name, value){
	unsafeWindow.sessionStorage.setItem(name, value);
};
//var users = JSON.parse(getLocal('users', '{}'));

var selectStrikes = /^true$/i.test(getLocal('selectStrikes', false)); 		// 0 - Strikes werden nicht ausgewählt; 1 - Strikes werden ausgewählt
var maxAcceptBuffs = parseInt(getLocal('maxAcceptBuffs', 20)); 	// 0 unendlich; > 0 maximale Anzahl der angenommenen Buffs
var maxLastLoginDays = parseInt(getLocal('maxLastLoginDays', 30)); 	// Anzahl der Tage des letzten Login bis Freund rot makiert wird
var minReloadTime = parseInt(getLocal('minReloadTime', 1000));
var maxReloadTime = parseInt(getLocal('maxReloadTime', 2000));
var enableSound = /^true$/i.test(getLocal('enableSound', true));
var hideError = /^true$/i.test(getLocal('hideError', true));
var pageReload = parseInt(getLocal('pageReload', 0));
var running = /^true$/i.test(getSession('running', false));
var BuffType = parseInt(getLocal('BuffType', 12));
var enableReminder = /^true$/i.test(getLocal('enableReminder', true));
var reminderInterval = parseInt(getLocal('reminderInterval', 10));
var reminderVolume = parseInt(getLocal('reminderVolume', 100));

unsafeWindow.Autobuff = /^true$/i.test(getLocal('Autobuff', true));
unsafeWindow.AutobuffTimeout = false;
var scriptUrl = unsafeWindow.scriptUrl;

if(document.location.href == scriptUrl + "users/index"){
	deadFriends();
	setTimeout(function(){
		if(document.getElementById('own-buffs-data') != null){
			showBuffTime();
			setTimeout(arguments.callee, 1000);
		}else{
			setTimeout(arguments.callee, 500);
		}
	}, 500);
	window.addEventListener('load', insertIntoBody, true);
}
if(document.location.href == scriptUrl + "users/findfriends"){
	deadFriends();
	findFriends();
}

var reminderSound = $('<audio id="reminderSound" src="data:audio/ogg;base64,T2dnUwACAAAAAAAAAAAKAMsNAAAAAOZH0Q8BHgF2b3JiaXMAAAAAAkSsAAD/////APQBAP////+4AU9nZ1MAAAAAAAAAAAAACgDLDQEAAADfnR6kEjb/////////////////////PAN2b3JiaXMNAAAATGF2ZjU0LjYzLjEwNAEAAAAVAAAAZW5jb2Rlcj1MYXZmNTQuNjMuMTA0AQV2b3JiaXMpQkNWAQAIAACAIkwYxIDQkFUAABAAAKCsN5Z7yL333nuBqEcUe4i9995746xH0HqIuffee+69pxp7y7333nMgNGQVAAAEAIApCJpy4ELqvfceGeYRURoqx733HhmFiTCUGYU9ldpa6yGT3ELqPeceCA1ZBQAAAgBACCGEFFJIIYUUUkghhRRSSCmlmGKKKaaYYsoppxxzzDHHIIMOOuikk1BCCSmkUEoqqaSUUkot1lpz7r0H3XPvQfgghBBCCCGEEEIIIYQQQghCQ1YBACAAAARCCCFkEEIIIYQUUkghpphiyimngNCQVQAAIACAAAAAAEmRFMuxHM3RHM3xHM8RJVESJdEyLdNSNVMzPVVURdVUVVdVXV13bdV2bdWWbddWbdV2bdVWbVm2bdu2bdu2bdu2bdu2bdu2bSA0ZBUAIAEAoCM5kiMpkiIpkuM4kgSEhqwCAGQAAAQAoCiK4ziO5EiOJWmSZnmWZ4maqJma6KmeCoSGrAIAAAEABAAAAAAA4HiK53iOZ3mS53iOZ3map2mapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmlAaMgqAEACAEDHcRzHcRzHcRxHciQHCA1ZBQDIAAAIAEBSJMdyLEdzNMdzPEd0RMd0TMmUVMm1XAsIDVkFAAACAAgAAAAAAEATLEVTPMeTPM8TNc/TNM0TTVE0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TVMUgdCQVQAABAAAIZ1mlmqACDOQYSA0ZBUAgAAAABihCEMMCA1ZBQAABAAAiKHkIJrQmvPNOQ6a5aCpFJvTwYlUmye5qZibc84555xszhnjnHPOKcqZxaCZ0JpzzkkMmqWgmdCac855EpsHranSmnPOGeecDsYZYZxzzmnSmgep2Vibc85Z0JrmqLkUm3POiZSbJ7W5VJtzzjnnnHPOOeecc86pXpzOwTnhnHPOidqba7kJXZxzzvlknO7NCeGcc84555xzzjnnnHPOCUJDVgEAQAAABGHYGMadgiB9jgZiFCGmIZMedI8Ok6AxyCmkHo2ORkqpg1BSGSeldILQkFUAACAAAIQQUkghhRRSSCGFFFJIIYYYYoghp5xyCiqopJKKKsoos8wyyyyzzDLLrMPOOuuwwxBDDDG00kosNdVWY4215p5zrjlIa6W11lorpZRSSimlIDRkFQAAAgBAIGSQQQYZhRRSSCGGmHLKKaegggoIDVkFAAACAAgAAADwJM8RHdERHdERHdERHdERHc/xHFESJVESJdEyLVMzPVVUVVd2bVmXddu3hV3Ydd/Xfd/XjV8XhmVZlmVZlmVZlmVZlmVZlmUJQkNWAQAgAAAAQgghhBRSSCGFlGKMMcecg05CCYHQkFUAACAAgAAAAABHcRTHkRzJkSRLsiRN0izN8jRP8zTRE0VRNE1TFV3RFXXTFmVTNl3TNWXTVWXVdmXZtmVbt31Ztn3f933f933f933f933f13UgNGQVACABAKAjOZIiKZIiOY7jSJIEhIasAgBkAAAEAKAojuI4jiNJkiRZkiZ5lmeJmqmZnumpogqEhqwCAAABAAQAAAAAAKBoiqeYiqeIiueIjiiJlmmJmqq5omzKruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6QGjIKgBAAgBAR3IkR3IkRVIkRXIkBwgNWQUAyAAACADAMRxDUiTHsixN8zRP8zTREz3RMz1VdEUXCA1ZBQAAAgAIAAAAAADAkAxLsRzN0SRRUi3VUjXVUi1VVD1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXVNE3TNIHQkJUAABkAAMO05NJyz42gSCpHtdaSUeUkxRwaiqCCVnMNFTSISYshYgohJjGWDjqmnNQaUykZc1RzbCFUiEkNOqZSKQYtCEJDVggAoRkADscBJMsCJEsDAAAAAAAAAEnTAM3zAMvzAAAAAAAAAEDSNMDyNEDzPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJE0DNM8DNM8DAAAAAAAAAM3zAE8UAU8UAQAAAAAAAMDyPMATPcATRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHE0DNM8DNM8DAAAAAAAAAMvzAE8UAc8TAQAAAAAAAEDzPMATRcATRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEOAAABFkKhISsCgDgBAIckQZIgSdA0gGRZ0DRoGkwTIFkWNA2aBtMEAAAAAAAAAAAAQPI0aBo0DaIIkDQPmgZNgygCAAAAAAAAAAAAIGkaNA2aBlEESJoGTYOmQRQBAAAAAAAAAAAA0EwToghRhGkCPNOEKEIUYZoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAEHAIAAE8pAoSErAoA4AQCHolgWAAA4kmNZAADgOJJlAQCAZVmiCAAAlqWJIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAQcAgAATykChISsBgCgAAIeiWBZwHMsCjmNZQJIsC2BZAM0DaBpAFAGAAACAAgcAgAAbNCUWByg0ZCUAEAUA4FAUy9I0UeQ4lqVposiRLEvTRJFlaZrnmSY0zfNMEaLneaYJz/M804RpiqKqAlE0TQEAAAUOAAABNmhKLA5QaMhKACAkAMDhOJbleaLoeaJomqrKcSzL80RRFE1TVVWV42iW54miKJqmqqoqy9I0zxNFUTRNVVVdaJrniaIomqaqui48z/NEURRNU1VdF57neaIoiqapqq4LURRF0zRNVVVV1wWiaJqmqaqq6rpAFEXTNFVVVV0XiKIomqaqqq7rAtM0TVVVVdeVXYBpqqqquq7rAlRVVV3XdWUZoKqq6rquK8sA13Vd15VlWQbguq7ryrIsAADgwAEAIMAIOsmosggbTbjwABQasiIAiAIAAIxhSjGlDGMSQgqhYUxCSCFkUlIqKaUKQiollVJBSKWkUjJKLaWWUgUhlZJKqSCkUlIpBQCAHTgAgB1YCIWGrAQA8gAACGOUYowx5yRCSjHmnHMSIaUYc845qRRjzjnnnJSSMeecc05K6ZhzzjknpWTMOeeck1I655xzzkkppXTOOeeklFJC6Bx0UkopnXMOQgEAQAUOAAABNopsTjASVGjISgAgFQDA4DiWpWmeJ4qmaUmSpnme54mmqmqSpGmeJ4qmqao8z/NEURRNU1V5nueJoiiapqpyXVEURdM0TVUly6JoiqapqqoL0zRN01RV14VpmqZpqqrrwrZVVVVd13Vh26qqqq7rysB1Xdd1ZRnIruu6riwLAABPcAAAKrBhdYSTorHAQkNWAgAZAACEMQgphBBSyCCkEEJIKYWQAACAAQcAgAATykChISsBgFQAAIAQa6211lprDWPWWmuttdYS56y11lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttVYAIHaFA8BOhA2rI5wUjQUWGrISAAgHAACMQYgx6CSUUkqFEGPQSUiltRgrhBiDUEpKrbWYPOcchFJaai3G5DnnIKTUWowxJtdCSCmllmKLsbgWQioptdZirMkYlVJqLbYYa+3FqJRKSzHGGGswxubUWowx1lqLMTq3EkuMMcZahBHGxRZjrLXXIowRssXSWq21BmOMsbm12GrNuRgjjK4ttVZrzQUAmDw4AEAl2DjDStJZ4WhwoSErAYDcAAACIaUYY8w555xzDkIIqVKMOecchBBCCKGUUlKlGHPOOQghhFBCKaWkjDHmHIQQQgillFJKaSllzDkIIYRQSimllNJS65xzEEIIpZRSSiklpdQ55yCEUEoppZRSSkothBBCKKGUUkoppZSUUkohhFBKKaWUUkopqaWUQgillFJKKaWUUlJKKYUQQimllFJKKaWklForpZRSSimllFJKSS21lFIopZRSSimllJJaSimlUkoppZRSSiklpdRSSqWUUkoppZRSSkuppZRKKaWUUkoppZSUUkoppVRKKaWUUkopKaXUWkoppZRKKaWUUlprKaWWUiqllFJKKaW01FprLbWUSimllFJKaa21lFJKKZVSSimllFIAANCBAwBAgBGVFmKnGVcegSMKGSagQkNWAgBkAAAMo5RSSS1FgiKlGKSWQiUVc1BSiihzDlKsqULOIOYklYoxhJSDVDIHlVLMQQohZUwpBq2VGDrGmKOYaiqhYwwAAABBAACBkAkECqDAQAYAHCAkSAEAhQWGDhEiQIwCA+Pi0gYAIAiRGSIRsRgkJlQDRcV0ALC4wJAPABkaG2kXF9BlgAu6uOtACEEIQhCLAyggAQcn3PDEG55wgxN0ikodCAAAAACAAwA8AAAkG0BERDRzHB0eHyAhIiMkJSYnKAIAAAAA4AYAHwAASQoQERHNHEeHxwdIiMgISYnJCUoAACCAAAAAAAAIIAABAQEAAAAAgAAAAAABAU9nZ1MABAAtAAAAAAAACgDLDQIAAABCf2urHAGfMDM6OTY7Pj1EREXtw902NDw8QM+YmaT/E4IAMpb851m+CAVsYCz5z7N8cQUcAAlIYJlUxTAMEpCNRWDAAAAAAAAADWDP6N+XJBQLQGPPzDsDVDEwc5nRf72m/X7/RP9/J8zMzMykokjCdfeQTu/7Tt33OQDMzsyUlJn7fffeG3DZHqiq+76rbAM0AH3daDQa9n9n4zsuAKy//Zka6Pc1WAVrvzcNBQAAtdFgGeD14geAJnwUnyEDTbAA7CCLc8l3DmRPMmaf+nc0ZzGVgAmDPUtPUXuyqeSdGrFVyXxvo67vlM88pR+nrWkFDCFdcas33iQjBxntx32xs86MlQRmOjcx/jyCJB4xouL43Dzb/sv8pcpq+CEGoehY2aEADBVBy5grNEvZE4uMKljhCpE16sdtqFKh+iq/7plW68pOT+6pci1LQt0zg7qbuxTl3pmiCmQDYs7XAAwVZa2GK7BHDBVZy4QVAmVnP040iqnCnl5NrnuXOWyrlVJ1Xt9y5+knMW4/tfXjlFW1hfW5xtYZAPwIPU7Zzh2HhgRirEHPsNPBk2SZCic+fL5yejGhc65CAuc39p/On9+KFzGmwBV9ucO1vi+GAvQEOxjyLHX0Q0GfU2mGABn89RnX9upUYQWbTXR197BTs9M9qXP2l5k87z1RdjXDgSJS8HBqM3fMbVsHbAm70UAUzK7hKEs5c6irTkVmpsUH7iDfNCNGWYIgkHDYdsLSKNhXP/h9OoN4r8R+dzLmr2o49e42UowgbgnU+dKIHBne+dKMGjnzuD1miXlozKWWjFkLA6M1COObZmvCwIkVKhQsDqxCVixP829xs/b+y/Oy7UE0EgIA7Em794Qiz4umT9o8EtbEi3OMPtuKQKGGg4Pd0W6Cw7A6Soyrzz57Li9JHJtcnqhxfA/Lcj1lh3cw6RFvtYGp8F/QNQDckW/fExfuU7Jfd+TFkYvbE4ELVl2TSVFJ2+pBEKpixcDdHS8Bmu5fL3f/SWMP49nvOJxr+2Zf6RWJ0HTlvpnmc8MvFASe33wlTi+PMyUrPnh+8kfiygk7e9SPdWtizpDAXzQlaWs3VFrDVDzb7ft6+rilqXqqSuweX173b1kUwZw9R2z8JbWvFbp5xvqvCAdl6m3Kz606ktJ5pvGvCA626rsc9WejxAeQoMz6WWTk9VaCsnSmzfTkqpESW0kFRQAAAAAAAADxv55rH399fHxvCWjzzdQNUywNPq2MKqz3ROUMI8iyOhiLCAAIym0wPUWPB47swuB1iABpQjFt2qjK/acCBFDpkSwE8TEJxBp5jGd11JlKtbMGSQS4Y4BG8TTLdGYzzPODbDbxrHZgHFOpUPgAH0Rtj8Os6OHQDk8PU2h6L1nR3OnOO6uAJIs8G3pO9izTu8h53rPP1dPG5d75++cFKFNuZSkwWUEUAETRVjRAAAE4AP551vWXCALPxUH9O2Qtn2jW/voHKdUxxO9WKZHNBwConAJ1Jkuo3Nb1DQBgA8SrRpQIEugIAAAAAAAAAAAAUgpIc2IuFSq1ALkPLUNUSMsDRWduyQIYNgWkFMwT4xELtTeuni8BVBymAaphIgRJvZRWVd03AA0g1p5gYg0rXUmTYrDsxBdJaZmkp9NiGi+LlBg/rd0uPprVoEwDGVcCAKN1tZBBQKk0EwvLYWABBJLkEUYMGYQuIyEFsBKiKABQYAVCBnY5Fv6viAchZn/r/rYKVI6F/yPCwUnM/hZ/Nq58ACGJoroyIrOmNiCL0kWb3mArVcRUMZGAATAGAAAAAPBerZpgbO7BDu/9w7DNKULWaMAtif0ETEnIU0lJJGA5yowC01AVJxrYm2V+hWcgLeKUkUvhMgkOCt3Qk7UVLpY1ZFqenkJhLqGgNnVxG7gd1VR079YqufbirNFYBiArCpephsbAeVPy+CTKePkSVzQCsl+UANlTAQYejBjQsgpkWMBIBgGtNrCsYKSwEIgECLnANAZgpYlIykJzNgAOMhAAzCHT63aQIty8ZHIfa4uP7jV7aLe3UJkKrZt7IJmu+drdp/iaB0ewlgdF2Rswnbj81aNHVDgBHH7T74kdTuODSvyy72F8ZK8LsU79TVy4KMDEAWxJaAA8Xu7nzmGG2Js3TORm1o6r6ePNHpyW4d/vynk31FUz/nHhbRk8h0r9SfCrpgCwjZOzGN5tg7PZfqta6mipVlnXXQGhlnW6bJKtXvz+5q9PBnyamd9xD9fGP1h6Zv7nMc/ahz9AcQ0BUIDkslaoiIjo1nDEH09PwWEdazm3J87uM++3yYjtBIRSJerDAZymyXsi7VNYXaWvav3vRGL3PIlPZE0hzBUCNHd3a3ql+u3Gkd3nwbmUv9vda9fcnfpgn3a/JQiF9wp37v74/jjaeab2Hyn6ifII4t5pXyxSOtE4+CvZPzEeRTk7/afKfADrOLLIUFMWWSkjo8yMalOPbVQxDJMYBtkAAAAAAAAAAAClfe3vrK7/RGtkKl6HXP+P3SKMAxumqBUzMcXSIr/r1vdt1NTm4a5wVjNCPKLMmllrmjRZpNdFpJJoOkKWtTYTWR5NM8l0vGIlnaRxuwFdi+IIlngy7vHJBZ6A3WTLAgafxOY+1yHBpaxYMlvy6C001njBgkbaTAGSEcUsK5pDuCRhr1raYC8MNEAPYAHeiRb8byntUfvqONtOpRONlT+S1yf2o2r3sQlLngGUiFEXAOCsDVTOIgEJyAYAAAAAAAAAAAAAGsqdNeT2ECDIZiHmwrOK2WRTr1Y39WjsKhkwbPAKEtXILFc3RVVbNtO6cBigmjbuKHGRVNbrCcgI6PEyETPjITHdsZlma0jVBUB2Zq0yIBUApGtFNxIsADAAGBYAFVCABh6KZvxfqf0TTVTOTtlohKK1+ktau0VDOdtO5SgsbQCAp8jnBEoIVA0G6DAYAAAAAAAAAAAAgIDq14Fin/EIiJTa4puYm4rbtYRsFtaxPvzj0rRlAX/TZ16nxy2rlwrbFQkTg1vurFzp7EiYkBFoxRTuIUQRI68RKAEcAAzNHltrAVAIwIhIGIiQLgAAFwAAG9ADoAQKgAvgAL5ZlsEfKe8j4gftbGQ6zdL+I/V+lBftbBuVAzKCmAzq1G0X28iFTDp0GEA2BgAAAAAAAACQ7FNXn54iQ3UPIBY5LPLVNNuOrBZ5+aPzxDDzLVxiMIYxGaqfBySd7K62+2DYBdNqzRa4rSlknoxnoYAk4VUBapefFu0xlgzQGYtCAFAaQGVYsBLFOBBgWdwEAAKCVEKItArnYw75JSJTYgEAFgAUPpakw1/XOaFdSWlBrLK9ZUk5/HHfVyoXo7C70S6hN+3dKrMsU0xiI4MIVcUAAODjMTUd7DRZYk2SlGwRSys2mdS0tm2tlvuGKLvLxjryc3iGPaZ96qCwG2rcXC/no3f2yKrRqkpI95x9dmW/zZzPnYqFVZ+v3czzOF++/nw/ePo5LxbFYahAJoGcJUahatoKoIYDCZTCwGIUq8hAFjPhA4oZ0eBmwkEYrCgMQuFgXYwsN9YqkLNtUL5Z5qNyGAJJWobKSUqxLC7smuvcZVc+ALR7zZ7FjeVsKBWgShzFtfJbzX6fVu/ZblXMoao3jy2FSQg0IAfAvNfsZHY/bh6B0Oz3WU2A8NDIRt04SG4GXDMcAD6W/O+sX7oCNhCW/Peob7oCNsCpYhiGYZAAAAAAAAAAAAAAAHCPsNRqwnhtgZewcGAUiwatYl1MezEKhQWAVaP4qspKgIyTigzcTAVDVT2AQ1yEm3coNP+pJ+FmsddTNTw9f20yej0C3ft8P/ltr+EQbT6L3W27uXoAXFgHiwFtAHo="><p>no audio</p></audio>');

var sound = $('<audio id="sound" src="data:audio/ogg;base64,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c05KqRRjzjknpWSMMeeck1IyxphzzkkpHXPOOeeklIw555xzUkrnnHPOOSmllM4555yUUkoInXNOSimlc845JwAAqMABACDARpHNCUaCCg1ZCQCkAgAYHMeyNE3TPE8UNUnSNM/zPFE0TU2yNM3zPE8UTZPneZ4oiqJpqirP8zxRFEXTVFWuK4qmaZqqqqpkWRRF0TRVVXVhmqapqqrqujBNUVRV1XVdyLJpqqrryjJs2zRV1XVlGaiqqsquLAPXVVXXlWUBAOAJDgBABTasjnBSNBZYaMhKACADAIAgBCGlFEJKKYSUUggppRASAAAw4AAAEGBCGSg0ZEUAECcAACAkpYJOSiWhlFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZNSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZSSUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkkppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllAoA0I1wANB9MKEMFBqyEgBIBQAAjFGKMQipxVYhxJhzElprrUKIMecktJRiz5hzEEppLbaeMccglJJai72UzklJrbUYeyodo5JSSzH23kspJaXYYuy9p5BCji3G2HvPMaUWW6ux915jSrHVGGPvvfcYY6ux1t577zG2VmuOBQBgNjgAQCTYsDrCSdFYYKEhKwGAkAAAwhilGGPMOeecc05KyRhzzkEIIYQQSikZY8w5CCGEEEIpJWPOOQchhFBCKKVkzDnoIIRQQiillM45Bx2EEEIJpZSSMecghBBCCaWUUjrnIIQQQiilhFRKKZ2DEEIoIYRSSkkphBBCCKGE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"><p>no audio</p></audio>');

$('body').append(sound);
$('body').append(reminderSound);
$('#reminderSound')[0].volume = reminderVolume / 100;

var playReminder = function(){
	if(enableReminder && running){
		$('#reminderSound')[0].play();
	}
}
var reminderTimer = window.setInterval(playReminder, reminderInterval * 1000);

var playSound = function(){
	if(enableSound){
		$('#sound')[0].play();
	}
}

var reloadPage = function(){
	if(running && pageReload){
		if((loadTime + pageReload) < (new Date()).getTime()){
			window.location.reload(true);
		}
		$('#nextReload').html('<br />&nbsp;&nbsp;&nbsp;(Reload in ' + parseInt((loadTime + pageReload - (new Date()).getTime()) / 1000) + ' Sek.)');
	}else{
		$('#nextReload').text('');
	}
}

/*unsafeWindow.strikeBuff = function(buffId){
	if(!confirm("Soll dieser Buff ignoriert werden?")){
		if (!confirm("Soll dieser Buff dann wenigstens gestriked werden?")){
			return false;
		}
		postStrikeBuff('acmulti[]=' + buffId);
	}else{
		alert("Buff ID: " + buffId);
/*
	Hier die Buff ID speichern, dann in der Funktion multiChk() in der for Schleife
				// Alle Zeilen der bufflist durchlaufen		
			var Trs = Tables[i].getElementsByTagName('tr');		
	die buffid rausfinden und nachschauen ob die als ignoriert gespeichert wurde

	}
}*/


unsafeWindow.reloadFriendBuffs = function(){
	$('#ui-tabs-1').html('<div style="text-align:center">Lade Daten <img src="' + scriptUrl + 'img/loading.gif"</div>');
	$.ajax({
		url:scriptUrl + 'ajax/users/friendbuffs',
		cache:false,
		success:function(msg){
			$('#ui-tabs-1').html(msg);
			$('#buff-tabs').parent().css('min-height', ($('#buff-tabs').height() + 10)+'px');
		},
		complete:function(){
			if(unsafeWindow.Autobuff){
				window.setTimeout(function(){multiChk(0);},0);
			}
		}
	});
}
/*var MutationObserver = unsafeWindow.MutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
	beautifyAcceptedBuffs();
});
//observer.observe($('#accepted-buffs-data').get(0), {childList: true});
function beautifyAcceptedBuffs(){
	$('.nextrow').css({
		'margin':'5px 0 0 30px',
		'padding-bottom':'10px'
	});
}
//beautifyAcceptedBuffs();
*/
unsafeWindow.acceptMultiBuff = function(url){
	$.ajax({
		url: url + 'ajax/buffs/accept',
		type: 'POST',
		data: $("#multiaccept").serialize(),
		success: function(msg){
			if(hideError){
				msg = $(msg);
				msg.find('.error_message').hide();
			}
			$('#ui-tabs-1').html(msg);
			$('#buff-tabs').parent().css('min-height', ($('#buff-tabs').height() + 10)+'px');
			$('#accepted-buffs').show();
			$('#accepted-buffs-data').html('<div style="text-align:center">Lade Daten <img src="' + url + 'img/loading.gif"</div>');
			$('#accepted-buffs-data').load(url + 'ajax/users/acceptedbuffs', function() {
				$('#accepted-buffs-count').html($('.multiac').length);
			});
		}
	});
}

//unsafeWindow.strikeBuff = function(buffId){ alert('BuffID: ' + buffId); }

function insertIntoBody() {


	var pageReloadTxt = parseInt(pageReload / 1000);
	var forbiddenStart = $('\
<div id="forbiddenStart" style="float:' + $('#friend-area').css('float') + '; width:175px;">\
	<input id="myBtnAll" type="button" value="' + (unsafeWindow.Autobuff ? (running ? 'Stop' : 'Start') : 'Nimm alles!') + '" style="margin:3px; width:170px;" /><br />\
	<label for="myCheckboxAutobuff"><input type="checkbox" name="myCheckboxAutobuff"' + (unsafeWindow.Autobuff ? ' checked="checked"' : '') + ' style="margin:3px;" id="myCheckboxAutobuff" value="1" /> Auto annehmen</label><br />\
</div>');

	var forbiddenConfig = $('<div style="padding:20px; width:300px;">Buffs alle<span title="Die Buffliste wird zu einer zufälligen Zeit&#10;innerhalb des angegebenen Bereichs neu geladen.&#10;Die Zeit wird nach dem letzten Ladeversuch getartet"><input type="text" id="myTxtMinReloadTime" style="width:30px; margin:3px;" value="' + minReloadTime + '" />bis<input type="text" id="myTxtMaxReloadTime" style="width:30px; margin:3px;" value="' + maxReloadTime + '" />ms annehmen,</span><br />\
		<span title="Lädt die ganze Seite neu.&#10;0 = ausgeschaltet">Die ganze Seite alle<input type="text" id="myTxtPageReload" style="width:30px; margin:3px;" value="' + pageReloadTxt + '" />Sekunden neu laden.<span id="nextReload"></span></span><br />\
	<hr />\
	<span>nimm max <input type="text" id="myTxtMaxAcceptBuffs" style="width:17px; margin:3px;" value="' + maxAcceptBuffs + '" />Buffs an</span><br />\
	<hr />\
	<select id="myBuffType">\
		<option value="0"' + ((BuffType == 0) ? ' selected="selected"' : '') + '>Alle Buffs annehmen</option>\
		<option value="1"' + ((BuffType == 1) ? ' selected="selected"' : '') + '>Nur Fischteller annehmen</option>\
		<option value="4"' + ((BuffType == 4) ? ' selected="selected"' : '') + '>Nur Stullen annehmen</option>\
		<option value="12"' + ((BuffType == 12) ? ' selected="selected"' : '') + '>Nur Körbe annehmen</option>\
	</select>\
	<hr />\
	<label for="myCheckboxStrikes"><input type="checkbox" name="myCheckboxStrikes"' + (selectStrikes ? ' checked="checked"' : '') + ' style="margin:3px;" id="myCheckboxStrikes" value="1" /> Strikes annehmen</label>\
	<hr />\
	<label for="myCheckboxSound" title="Der Sound wird bereits beim Versuch einen Buff&#10;anzunehmen abgespielt, es ist trotzdem möglich,&#10;dass es nicht funktioniert.&#10;z.B. wegen überschreiten des Punktelimits"><input type="checkbox" name="myCheckboxSound"' + (enableSound ? ' checked="checked"' : '') + ' style="margin:3px;" id="myCheckboxSound" value="1" /> Sound bei Annahme</label>\
	<hr />\
	<label for="myCheckboxReminder" title="Der Sound wird während des Auto Annehmens im angegebenen Intervall wiederholt."><input type="checkbox" name="myCheckboxReminder"' + (enableReminder ? ' checked="checked"' : '') + ' style="margin:3px;" id="myCheckboxReminder" value="1" /> Erinnerungssound</label><br />\
	&nbsp;&nbsp;&nbsp;alle<span title="Wiederholungsintervall des Erinnerungssounds"><input type="text" id="myTxtReminderInterval" style="width:30px; margin:3px;" value="' + reminderInterval + '" /> Sekunden,</span><br />\
	&nbsp;&nbsp;&nbsp;Lautstärke: <span title="Lautstärke des Erinnerungssounds"><input type="text" id="myTxtReminderVolume" style="width:30px; margin:3px;" value="' + reminderVolume + '" />%</span>\
	<hr />\
	<label for="myCheckboxError" title="Fehler werden nur während der automatischen Annahme&#10;ausgeblendet, um das Springen der Seite zu verhindern."><input type="checkbox" name="myCheckboxError"' + (hideError ? ' checked="checked"' : '') + ' style="margin:3px;" id="myCheckboxError" value="1" /> Fehler ausblenden</label>\
	<hr />\
	<span id="buffTimeInfo"></span>\
</div>');










	$('#friend-area').css('clear', $('#friend-area').css('float'));
	$('#buff-tabs').parent().css('min-height','150px');

	$('#content *:first').before(forbiddenStart);
	$('#forbiddenConfig hr').css({
		'height':'1px',
		'margin':'5px 0px'
	});

	$('#ui-tabs-3').html( forbiddenConfig );

	// Button "nimm alles" definieren
	$('#myBtnAll').click(function(){
		if(unsafeWindow.Autobuff){
			if(running){
				running = false;
				storSession('running', false);
				$('#myBtnAll').val( 'Start' );
				unsafeWindow.clearTimeout(unsafeWindow.AutobuffTimeout);
			}else{
				loadTime = (new Date()).getTime();
				running = true;
				storSession('running', true);
				$('#myBtnAll').val( 'Stop' );
				multiChk(0);
			}
		}else{
			multiChk(0);
		}
	});

	// Min ReloadTime
	$('#myTxtPageReload').keyup(function(){
		var val = parseFloat($('#myTxtPageReload').val()) * 1000;
		pageReload = val;
		storLocal('pageReload', val);
	});

	// Min ReloadTime
	$('#myTxtMaxAcceptBuffs').keyup(function(){
		var val = parseInt($('#myTxtMaxAcceptBuffs').val());
		maxAcceptBuffs = val;
		storLocal('maxAcceptBuffs', val);
	});

	// Min ReloadTime
	$('#myTxtMinReloadTime').keyup(function(){
		var val = parseInt($('#myTxtMinReloadTime').val());
		minReloadTime = val;
		storLocal('minReloadTime', val);
	});

	// Max ReloadTime
	$('#myTxtMaxReloadTime').keyup(function(){
		var val = parseInt($('#myTxtMaxReloadTime').val());
		minReloadTime = val;
		storLocal('maxReloadTime', val);
	});

	// Checkbox Strikes annehmen
	$('#myCheckboxStrikes').click(function(){
		var checked = $('#myCheckboxStrikes').prop('checked');
		selectStrikes = checked;
		storLocal('selectStrikes', checked);
	});

	// Checkbox Autoannehmen
	$('#myCheckboxAutobuff').click(function(){
		var checked = $('#myCheckboxAutobuff').prop('checked');
		unsafeWindow.Autobuff = checked;
		storLocal('Autobuff', checked);
		if(checked){
			$('#myBtnAll').val( running ? 'Stop' : 'Start' );
		}else{
			$('#myBtnAll').val( 'Nimm alles!' );
			if(running || unsafeWindow.AutobuffTimeout){
				running = false;
				storSession('running', false);
				unsafeWindow.clearTimeout(unsafeWindow.AutobuffTimeout);
			}
		}
	});

	// Select BuffType
	$('#myBuffType').change(function(){
		var type = parseInt($('#myBuffType').val());
		BuffType = type;
		storLocal('BuffType', type);
	});

	// Checkbox Sound an/aus
	$('#myCheckboxSound').click(function(){
		var checked = $('#myCheckboxSound').prop('checked');
		enableSound = checked;
		storLocal('enableSound', checked);
	});

	// Checkbox Reminder an/aus
	$('#myCheckboxReminder').click(function(){
		var checked = $('#myCheckboxReminder').prop('checked');
		enableReminder = checked;
		storLocal('enableReminder', checked);
	});

	// Reminder Intervall
	$('#myTxtReminderInterval').keyup(function(){
		var val = parseInt($('#myTxtReminderInterval').val());
		reminderInterval = (val < 1) ? 1 : val;
		storLocal('reminderInterval', reminderInterval);
		window.clearInterval(reminderTimer);
		reminderTimer = window.setInterval(playReminder, reminderInterval * 1000);
	});

	// Reminder Lautstärke
	$('#myTxtReminderVolume').keyup(function(){
		var val = parseInt($('#myTxtReminderVolume').val());
		reminderVolume = (val > 100) ? 100 : (val < 0) ? 0 : val;
		storLocal('reminderVolume', reminderVolume);
		$('#reminderSound')[0].volume = reminderVolume / 100;
	});

	// Checkbox Fehler ausblenden
	$('#myCheckboxError').click(function(){
		var checked = $('#myCheckboxError').prop('checked');
		hideError = checked;
		storLocal('hideError', checked);
	});

	window.setInterval(function(){
		reloadPage();
	}, 1000);
	if(running){
		multiChk(0);
	}

}

function multiSelect(m) {
	if (parseFloat(document.getElementById('accepted-buffs-count').innerHTML) == 0) return;	
	var acceptedBuffsSelect = document.getElementById('accepted-buffs-data').getElementsByTagName('select');
	
	// Alle akzeptierten Buffs durchlaufen
	for (var i = 0; i < acceptedBuffsSelect.length; i++) {		
		acceptedBuffsSelect[i].selectedIndex = 0; // alles deselektieren
		var acceptedBuffsOptions = acceptedBuffsSelect[i].getElementsByTagName('option');		
		// Alle options durchlaufen
		for (var j = 0; j < acceptedBuffsOptions.length; j++) {
			// Option auswählen
			if (parseFloat(acceptedBuffsOptions[j].value) == m)	acceptedBuffsSelect[i].selectedIndex = j;
		}
	}
}
 
function multiChk(m){	
	// Alle Tabellen durchlaufe		
//	try{
		m = BuffType;
		var counter = 0;
		var acceptedBuffs = parseFloat(document.getElementById('accepted-buffs-count').innerHTML);
		maxAcceptBuffs = parseFloat(document.getElementById('myTxtMaxAcceptBuffs').value);		
		var Tables = document.getElementsByTagName('table');
			
		for (var i = 0; i < Tables.length; i++) {
			// Tabelle mit class bufflist finden			
			if(Tables[i].getAttribute('class') != 'bufflist') continue;		
			
			// Alle Zeilen der bufflist durchlaufen		
			var Trs = Tables[i].getElementsByTagName('tr');		
			for (var j = 0; j < Trs.length; j++) {
				if (Trs[j].getElementsByTagName('td').length == 0) continue;					    
				if(Trs[j].innerHTML.search("Strike") != -1 && !selectStrikes ) continue; // Buffs mit Strike-Kennung übergehen
				
				// Bufftype auswählen / übergehen
				switch (m) {
				case 1:
					if(Trs[j].innerHTML.search("product-1.png") == -1) continue;
					break;
				case 4:
					if(Trs[j].innerHTML.search("product-1.png") == -1 && Trs[j].innerHTML.search("product-2.png") == -1) continue;
					break;
				case 12:
					if(Trs[j].innerHTML.search("product-3.png") == -1) continue;
					break;
				}			
				
				// CheckBox finden und aktivieren			
				var CheckBoxs = Trs[j].getElementsByTagName('input');
				for (var k = 0; k < CheckBoxs.length; k++) {	
					if ( maxAcceptBuffs > 0 && (acceptedBuffs + counter + 1) > maxAcceptBuffs) break;
					if (CheckBoxs[k].getAttribute('type') != "checkbox" || CheckBoxs[k].getAttribute('name') != "obmulti[]") continue;				
					CheckBoxs[k].checked=true;
					counter++;				
				}			
			}
		}
//	} catch(e){
//		alert(e);
//	}
	
	if(counter > 0){
		unsafeWindow.acceptMultiBuff(scriptUrl);
		playSound();
	}
	if(unsafeWindow.AutobuffTimeout)window.clearTimeout(unsafeWindow.AutobuffTimeout);
	if(unsafeWindow.Autobuff){
		if(running){
			unsafeWindow.AutobuffTimeout = unsafeWindow.setTimeout(
				function(){
					unsafeWindow.reloadFriendBuffs();
				}, minReloadTime + parseInt( Math.random() * (maxReloadTime - minReloadTime) )
			);
		}
	}else{
		unsafeWindow.reloadFriendBuffs();
	}
}

//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;

	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement){
		//add the newElement after the target element.
		parent.appendChild(newElement);
	}else{
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

// Frunde makieren
function findFriends() {
	var friendList = document.getElementById('friendlist').getElementsByTagName('span'); //innerHTML
	var onlineList = document.getElementById('find-friends-area').getElementsByTagName('tr');
	var ownrequests = document.getElementById('ownrequests').getElementsByTagName('span');
		
	for (var i = 1; i < onlineList.length; i++) {		
		var td = onlineList[i].getElementsByTagName('td')[0].innerHTML.replace(/\n/g, "");
		var Ausdruck = /([\w-]+)/;
		Ausdruck.exec(td);	
		// Freunde grün markieren
		for (var j = 0; j < friendList.length; j++) {			
			if (friendList[j].innerHTML == RegExp.$1) {
				onlineList[i].getElementsByTagName('td')[0].innerHTML = "<b style='color:green'>" + onlineList[i].getElementsByTagName('td')[0].innerHTML + "</b";
				continue;
			}
		}	
		//gesendete Anfragen orange markieren
		for (var j = 0; j < ownrequests.length; j++) {			
			if (ownrequests[j].innerHTML == RegExp.$1) {
				onlineList[i].getElementsByTagName('td')[0].innerHTML = "<b style='color:orange'>" + onlineList[i].getElementsByTagName('td')[0].innerHTML + "</b";
				continue;
			}
		}
	}
}

// Freunde makieren welche zu lange offline sind
function deadFriends() {	
	try {
		var now = new Date();
		var friendList = document.getElementById('friendlist').getElementsByTagName('li');
		var h3Friends = document.getElementById('friend-area').getElementsByTagName('h3')[1];
//			h3Friends.innerHTML = friendList.length + " Freunde";
		for (var i = 0; i < friendList.length; i++) {
			var lastLogin = friendList[i].innerHTML.match(/\d\d.\d\d.\d\d/).toString().split('.');	
			lastLogin = new Date(parseInt('20' + lastLogin[2]), parseInt(lastLogin[1])-1, parseInt(lastLogin[0]));
			var days = Math.round((now - lastLogin)/(1000*60*60*24));
			if (days >= maxLastLoginDays) {
				//alert(days + " = " + now + " - " + lastLogin);
//				friendList[i].style.color = 'white';
//				friendList[i].style.backgroundColor = 'red';
			}		
		}
	} catch (e) {
		//alert(e);
	}
}

// Berechne der Zeit für Buffs in Abhängigkeit der BuffPoints und aktiven Buffs
function showBuffTime() {	
	try {
		var buffPoints 	= parseInt(document.getElementById('buff-points').getElementsByTagName('span')[0].innerHTML.replace(/\./g,''));		
		var anzBuffs 	= parseInt(document.getElementById('own-buffs-data').getElementsByTagName('h2')[0].innerHTML.match(/[\d]+/));			
		var minuten = round(buffPoints / anzBuffs / 4 * 3 * 60,0);
		var tage = Math.floor(minuten / 60 / 24);
		var stunden 	= Math.floor(minuten / 60 - tage * 24,2);
		minuten = minuten - tage * 24 * 60 - stunden * 60;
		var output 	= '' + tage + ' Tage ' + stunden + ':' + ((minuten < 10) ? '0' : '') + minuten;
		var einTag		= anzBuffs * 32;	
		var myTxt = "Deine Buff-Points reichen<br />für " + output + " Stunden.<br />Du brauchst " + einTag + " Buffpoints pro Tag.<hr />";
//		var myTxtNode = document.createTextNode(myTxt);
//		insertAfter(myTxtNode,document.getElementById('userinfo'))
		$('#buffTimeInfo').html(myTxt)
		$('#buffTimeInfo hr').css({
			'margin':'3px 0px'
		});
	} catch (e) {
		//alert(e);
	}
}

function round(x, n){
	var a = Math.pow(10, n);
	return Math.round(x * a) / a;
}