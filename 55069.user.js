// ==UserScript==
// @name           Limit-tations
// @namespace      http://subworld34.com/limit-tations
// @description    Prevents pages from bombarding you with alerts, prompts, or confirm boxes. After a fixed limit, you will be asked what you wish to do next. 
// @include        *
// ==/UserScript==

GM_registerMenuCommand("Limit-tations: Change Alert Limit",function(){
	var limit=5;
	if(GM_getValue("alertLimit")!=undefined)limit=GM_getValue("alertLimit");
	var question="The current Max for Alerts is ["+limit+"].\nWhat would you like the new value to be?";
	var ans=false;
	if(unsafeWindow._prompt!=undefined)ans=unsafeWindow._prompt(question,limit);
	else ans=unsafeWindow.prompt(question,limit);
	if(isNaN(ans)||ans<1)return false;
	GM_setValue("alertLimit",ans);
	if(unsafeWindow._data!=undefined){
		unsafeWindow._data.alert.status="continue";
		unsafeWindow._data.alert.count=0;
		unsafeWindow._data.alert.limit=ans;
	}
});
GM_registerMenuCommand("Limit-tations: Change Prompt Limit",function(){
	var limit=5;
	if(GM_getValue("promptLimit")!=undefined)limit=GM_getValue("promptLimit");
	var question="The current Max for Prompts is ["+limit+"].\nWhat would you like the new value to be?";
	var ans=false;
	if(unsafeWindow._prompt!=undefined)ans=unsafeWindow._prompt(question,limit);
	else ans=unsafeWindow.prompt(question,limit);
	if(isNaN(ans)||ans<1)return false;
	GM_setValue("promptLimit",ans);
	if(unsafeWindow._data!=undefined){
		unsafeWindow._data.prompt.status="continue";
		unsafeWindow._data.prompt.count=0;
		unsafeWindow._data.prompt.limit=ans;
	}
});
GM_registerMenuCommand("Limit-tations: Change Confirm limit",function(){
	var limit=5;
	if(GM_getValue("confirmLimit")!=undefined)limit=GM_getValue("confirmLimit");
	var question="The current Max for Confirms is ["+limit+"].\nWhat would you like the new value to be?";
	var ans=false;
	if(unsafeWindow._prompt!=undefined)ans=unsafeWindow._prompt(question,limit);
	else ans=unsafeWindow.prompt(question,limit);
	if(isNaN(ans)||ans<1)return false;
	GM_setValue("confirmLimit",ans);
	if(unsafeWindow._data!=undefined){
		unsafeWindow._data.confirm.status="continue";
		unsafeWindow._data.confirm.count=0;
		unsafeWindow._data.confirm.limit=ans;
	}
});

unsafeWindow._data={
	alert:{status:"continue",count:0,limit:5},
	prompt:{status:"continue",count:0,limit:5},
	confirm:{status:"continue",count:0,limit:5}
};

if(GM_getValue("alertLimit")!=undefined)unsafeWindow._data.alert.limit=GM_getValue("alertLimit");
if(GM_getValue("promptLimit")!=undefined)unsafeWindow._data.prompt.limit=GM_getValue("promptLimit");
if(GM_getValue("confirmLimit")!=undefined)unsafeWindow._data.confirm.limit=GM_getValue("confirmLimit");

unsafeWindow._alert=unsafeWindow.alert;
unsafeWindow.alert=function alert(txt){
	var action=unsafeWindow._data.alert.status;
	if(action=='disable')return true;
	if(action=='error')throw("Killed all javascript by user request!");
	if(action=='stopSelf')return unsafeWindow._alert(txt);//Skip self.

	var count=unsafeWindow._data.alert.count;
	var lim=unsafeWindow._data.alert.limit;
	if(count+1>lim){
		var question="This page has displayed ["+count+"] alerts.\n"
				+"Which action do you wish to take?\n"
				+"\t1) Stop bugging me, allow everything.\n"
				+"\t2) This could be sketchy, show up again in ["+count+"] alerts.\n"
				+"\t3) This is annoying, ignore future alerts.\n"
				+"\t4) Oops, I am in trouble, Deny everything!\n"
				+"\t5) Kill all javascript!\n";
		var ans=unsafeWindow._prompt(question,"2");

		if(!ans){ans=1;}
		if(isNaN(ans)||ans<1||ans>5)ans=2;
		switch(String(ans)){
		case '1':case 1:case 'one':case 'i':case 'l':
			unsafeWindow._data.alert.status="stopSelf";
			unsafeWindow._data.prompt.status="stopSelf";
			unsafeWindow._data.confirm.status="stopSelf";
			break;
		case '2':case 2:case 'two':
			unsafeWindow._data.alert.count=0;
			break;
		case '3':case 3:case 'three':
			unsafeWindow._data.alert.status="disable";
			return false;
			break;
		case '4':case 4:case 'four':
			unsafeWindow._data.prompt.status="disable";
			unsafeWindow._data.confirm.status="disable";
			unsafeWindow._data.alert.status="disable";
			return false;
			break;
		case '5':case 5:case 'five':case 'S':case 's':
			unsafeWindow._data.prompt.status="error";
			unsafeWindow._data.confirm.status="error";
			unsafeWindow._data.alert.status="error";
			return false;
			break;
		};
	}
	++unsafeWindow._data.alert.count;
	return unsafeWindow._alert(txt);
};
unsafeWindow._prompt=unsafeWindow.prompt;
unsafeWindow.prompt=function prompt(txt,option){
	var action=unsafeWindow._data.prompt.status;
	if(action=='disable')return '';
	if(action=='error')throw("Killed all javascript by user request!");
	if(action=='stopSelf')return unsafeWindow._prompt(txt,option);//Skip self.

	var count=unsafeWindow._data.prompt.count;
	var lim=unsafeWindow._data.prompt.limit;
	if(count+1>lim){
		var question="This page has displayed ["+count+"] prompts.\n"
				+"Which action do you wish to take?\n"
				+"\t1) Stop bugging me, allow everything.\n"
				+"\t2) This could be sketchy, show up again in ["+count+"] prompts.\n"
				+"\t3) This is annoying, ignore future prompts.\n"
				+"\t4) Oops, I am in trouble, Deny everything!\n"
				+"\t5) Kill all javascript!\n";
		var ans=unsafeWindow._prompt(question,"2");
		if(!ans){ans=1;}
		if(isNaN(ans)||ans<1||ans>5)ans=2;
		switch(String(ans)){
		case '1':case 'one':case 'i':case 'l':
			unsafeWindow._data.alert.status="stopSelf";
			unsafeWindow._data.prompt.status="stopSelf";
			unsafeWindow._data.confirm.status="stopSelf";
			break;
		case '2':case 'two':
			unsafeWindow._data.prompt.count=0;
			break;
		case '3':case 'three':
			unsafeWindow._data.prompt.status="disable";
			return true;
			break;
		case '4':case 'four':
			unsafeWindow._data.alert.status="disable";
			unsafeWindow._data.prompt.status="disable";
			unsafeWindow._data.confirm.status="disable";
			return true;
			break;
		case '5':case 'five':case 'S':case 's':
			unsafeWindow._data.prompt.status="error";
			unsafeWindow._data.confirm.status="error";
			unsafeWindow._data.alert.status="error";
			return false;
			break;
		};
	}
	++unsafeWindow._data.prompt.count;
	return unsafeWindow._prompt(txt,option);
};
unsafeWindow._confirm=unsafeWindow.confirm;
unsafeWindow.confirm=function confirm(txt){
	var action=unsafeWindow._data.confirm.status;
	if(action=='disable')return true;
	if(action=='error')throw("Killed all javascript by user request!");
	if(action=='stopSelf')return unsafeWindow._confirm(txt);//Skip self.

	var count=unsafeWindow._data.confirm.count;
	var lim=unsafeWindow._data.confirm.limit;
	if(count+1>lim){
		var question="This page has displayed ["+count+"] confirms.\n"
				+"Which action do you wish to take?\n"
				+"\t1) Stop bugging me, allow everything.\n"
				+"\t2) This could be sketchy, show up again in ["+count+"] confirms.\n"
				+"\t3) This is annoying, ignore future alerts.\n"
				+"\t4) Oops, I am in trouble, Deny everything!\n"
				+"\t5) Kill all javascript!\n";
		var ans=unsafeWindow._prompt(question,"2");
		if(!ans){ans=1;}
		if(isNaN(ans)||ans<1||ans>5)ans=2;
		switch(String(ans)){
		case '1':case 'one':case 'i':case 'l':
			unsafeWindow._data.alert.status="stopSelf";
			unsafeWindow._data.prompt.status="stopSelf";
			unsafeWindow._data.confirm.status="stopSelf";
			break;
		case '2':case 'two':
			unsafeWindow._data.confirm.count=0;
			break;
		case '3':case 'three':
			unsafeWindow._data.confirm.status="disable";
			return true;
			break;
		case '4':case 'four':
			unsafeWindow._data.alert.status="disable";
			unsafeWindow._data.prompt.status="disable";
			unsafeWindow._data.confirm.status="disable";
			return true;
			break;
		case '5':case 'five':case 'S':case 's':
			unsafeWindow._data.prompt.status="error";
			unsafeWindow._data.confirm.status="error";
			unsafeWindow._data.alert.status="error";
			return false;
			break;
		};
	}
	unsafeWindow._data.confirm.count;
	return unsafeWindow._confirm(txt);
};
