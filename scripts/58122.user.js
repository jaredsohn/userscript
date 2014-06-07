// ==UserScript==
// @name           dA Custom Usernames
// @namespace      http://solitude12.deviantart.com/
// @description    Replace deviantART usernames with custom names you can manage
// @include        http://*.deviantart.com/*
// @exclude        http://chat.deviantart.com/*
// @exclude        http://*.deviantart.com/friends/
// @exclude        http://*.deviantart.com/myfriends/
// ==/UserScript==


/* 
 * Author: Solitude12
 * Date: Sep 20, 2009
 * Version: 0.1b
 *
 * Copyright © Solitude12 - http://solitude12.deviantart.com/
 * Please do not redistribute any part of this code without
 * permission of Solitude12.
*/


var SCRIPT_VERSION = "0.1b";
var usernames_str = GM_getValue('dACustomUsernames.usernames', ''); //['Tepara', 'Solitude12'];
var replaces_str =  GM_getValue('dACustomUsernames.replaces', ''); //['Debbie', 'Me'];
var usernames = usernames_str.split(',');
var replaces = replaces_str.split(',');

for(var i=0; i<usernames.length; i++){
	if(usernames[i]=="" || replaces[i]==""){
		usernames.splice(i,1);
		replaces.splice(i,1);
	}
}

Array.prototype.exists = function(search){
  for (var i=0; i<this.length; i++)
    if (this[i].toLowerCase() == search.toLowerCase()) return i;
		
  return -1;
} 

var images = [
		      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGjSURBVHja7NNBDQAwCACxMVN7LYjGIAZQQFoJl1y8/HWA0ZUADAIGAYOAQcAgYBAwCBgEDAIYBAwCBgGDgEHAIGAQMAgYBAwCGAQMAgYBg4BBwCBgEDAIGAQwCBgEDAIGAYOAQcAgYBAwCBgEMAgYBAwCBgGDgEHAIGAQMAhgEDAIGAQMAgYBg4BBwCBgEDAIYBAwCBgEDAIGAYOAQcAgYBDAIGAQMAgYBAwCBgGDgEHAIGAQwCBgEDAIGAQMAgYBg4BBwCBgEAnAIGAQMAgYBAwCBgGDgEHAIIBBwCBgEDAIGAQMAgYBg4BBwCCAQcAgYBAwCBgEDAIGAYOAQQCDgEHAIGAQMAgYBAwCBgGDgEEAg4BBwCBgEDAIGAQMAgYBgwAGAYOAQcAgYBAwCBgEDAIGAYMABgGDgEHAIGAQMAgYBAwCBgEMAgYBg4BBwCBgEDAIGAQMAgYBDAIGAYOAQcAgYBAwCBgEDAIGkQAMAgYBg4BBwCBgEDAIGAQMAhgEDAIGAYOAQcAgYBAwCBgEDAIYBAwCBgGDgEHAIGAQ2KgFGAC/igL21a8GYwAAAABJRU5ErkJggg%3D%3D', // Fade Img http://st.deviantart.com/styles/minimal/minish/bg-fade.png
			  'data:image/gif;base64,R0lGODlhSQBAAKUqAJ6xoq7Cqq/Cq67DrK/Dq67ErLDErLDFrLHFrbHGrbLGrrPGrrPHr7THr7TIsLXIsLXJsbbJsbbJsrbKsrfKsrfKs7jKs7jLs7jLtLnLtLnMtbrMtbrNtrvNtr3NuLvOt7zOt77Oub3PuL3Pur/Pur7QucDQu7/RusHRvMDSu////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAASQBAAAAG/kCUcEgsGo/IpHLJbDqf0Kh0Sk2mrtisdsvter9grmlMLpvP6LR6zW673/C4fE6v2+/4+GnP7/v/gIGCg4SAJIeIiYqLjI2Oj5CRkpOUlY8jmJmam5ydnp+goZ0lpKWmp6ipqqusrakhsLGys7S1tre4ubq7vL2+uCLBwsPExcbHyMnKy8zNzs/JHtLT1NXW19jZ2tvXIN7f4OHi4+Tl5ufo6err7OYf7/Dx8vP09fb3+PQd+/z9/v8AAwocSLCgwYMIEw7kwLChw4cQI0qcSLFixA0YM2rcyLGjx48gQ4ocSbKkSZAaUqpcybKly5cwY8p0maGmzZs4c+rcybOn/k+dGIIKHUq0qNGjSJMqNXqhqdOnUKNKnUq1qlWpFrJq3cq1q9evYMOK9VqhrNmzaNOqXcu2rVu1FOLKnUu3rt27ePPqtTuhr9+/gAMLHky4sGHBEhIrXsy4sePHkCNLdhyhsuXLmDNr3sy5s2fNEEKLHk26tOnTqFOrNv2gtevXsGPLnk27tm3ZDnLr3s27t+/fwIMLH068uPHjwRsoX868ufPn0KNLn/6cgfXr2LNr3869u/fv4MOLH0/e+4Lz6NOrX8++vfv38NkrmE+/vv37+PPr38+/v///AAa4XwIEFmjggQgmqOCCDDaYIAIQRijhhBRWaOGFGGao4YYcpnboIYYHhCjiiCSWaOKJKKao4oostujiiykaIOOMNNZo44045qjjjjz26OOPQOpYwJBEFmnkkUgmqeSSTDbp5JNQRrnkAFRWaeWVWGap5ZZcdpklAWCGKeaYZJZp5plopqnmmmy26eabcMYp55x01ummAHjmqeeefPbp55+ABtpnAIQWauihiCaq6KKMNuroo5BGKimjAFRq6aWYZqrpppx26qmmQQAAOw%3D%3D', // bg gruze http://st.deviantart.net/minish/gruzecontrol/bubbletop-gruze.gif
			  'data:image/gif;base64,R0lGODlhDwAPAJEAAP////X09EdSS////yH5BAEHAAMALAAAAAAPAA8AAAIrnC2Zx6O/GJxnWpRAUAEox2lCt1mjJpoJqa5oabHsp6TnB7ZC1TZqw8MdCgA7', // close
			 'data:image/png;base64,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%3D',//http://img36.imageshack.us/img36/5338/picture754.png
			 'data:image/gif;base64,R0lGODlhIwAwAMQAAODn393l3OLo4d/m3tXh1Nvk2t7m3dfi1tXg09nj2NTg09ji19Pf0tzl2+Ho4OHn4Nbh1drk2d/m3drj2dPf0dfh1dPg0tji1trj2NTg0tzk2gAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAjADAAAAX/oCCOZGmeaKqubOs6cCzPdG3feC4/fO//wKBwSCz6AMikcslsOp/QqHRKrVqVg6x2y+16v+CweCspm8/otFptaLvf8Lh8Tq/b34G8fs/v+/+AgYKDhIUNh4iJiouMjY6PkIkak5SVlpeYmAWbnJ2en6ChoqOknRGnqKmqq6ysE6+wsbKztLQYt7i5uru8vAm/wMHCw8TFxsfIwQvLzM3Oz9DR0tPUzRfX2Nna29zcB9/g4eLj5OXm5+jhFevs7e7v8PAQ8/T19vf4+fr7/PUE/wADChxIsKDBgwgDIljIsKHDhxAjSpxIsaGCixgzatzIsaPHjyAzZhhJsqTJkyhRIVpYybKly5cwYTKYSbOmzZs4c+rcybMmhZ9AgwodSpRoCAA7',//http://st.deviantart.com/minish/gruzecontrol/cruiser.gif
			 ''
			 ];


if(typeof document.getElementsByClassName == 'function') {
	var u = document.getElementsByClassName('u');
} else {
	var u = unsafeWindow.Tree.gets(document,"a.u");
}

for (var i in u){
	if(u[i].parentNode.tagName!='H1'){
		if(u[i].innerHTML.indexOf('<img')>-1){
			if(usernames.exists(u[i].innerHTML.substring(0,u[i].innerHTML.indexOf('<img')).toLowerCase())!=-1){
				var id = usernames.exists(u[i].innerHTML.substring(0,u[i].innerHTML.indexOf('<img')).toLowerCase());
				var newname = replaces[id];
				u[i].innerHTML = newname + u[i].innerHTML.substring(u[i].innerHTML.indexOf('<img'));
				u[i].setAttribute("title", usernames[id]);
			}
		} else {
			if(usernames.exists(u[i].innerHTML.toLowerCase())!=-1){
				var id = usernames.exists(u[i].innerHTML.toLowerCase());
				var newname = replaces[id];
				u[i].innerHTML = newname;
				u[i].setAttribute("title", usernames[id]);
			}
		}
	}
}

var optionsIsCreated = false;
var todelete = [];

function closeOptions(){
	document.getElementsByTagName('body')[0].removeChild(document.getElementById('dAUsernames_Options'));
	document.getElementsByTagName('body')[0].removeChild(document.getElementById('dAUsernames_bgcover'));
	optionsIsCreated=false;
}

function checkForUpdates(){
	//
	//
	
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://www.deviantart.com/download/137698246/',
		onload: function(details){
			var theData = details.responseText; // get data
			theData = theData.match(/VERSION = "(.*)";/);
			if (theData){
				eval("var LATEST_" + theData[0]);
				if (LATEST_VERSION==SCRIPT_VERSION)
					document.getElementById('dAUsernames_Update').innerHTML = 'Up-to-date!';
				else if (LATEST_VERSION>SCRIPT_VERSION)
					document.getElementById('dAUsernames_Update').innerHTML = '<a href="http://fav.me/137698246"><b>v'+LATEST_VERSION+' Available!</b>';
				else
					document.getElementById('dAUsernames_Update').innerHTML = 'Update checking failed!';
			} else {
				document.getElementById('dAUsernames_Update').innerHTML = 'Update checking failed!';
			}
			
		}
	});
}

function showOptions(){	
	optionsIsCreated = true;
	
	var bg = document.createElement('span');
	bg.setAttribute("id","dAUsernames_bgcover");
	bg.setAttribute("style","position:fixed; top:0px; left:0px; bottom:0px; right:0px; background-image:url('"+images[0]+"'); z-index:257;");
	document.getElementsByTagName('body')[0].appendChild(bg);
	
	bg.addEventListener('click', function(e){
		closeOptions();
	}, false);
	
	var optionsPopup = document.createElement('div');
	optionsPopup.setAttribute("id","dAUsernames_Options");
	GM_addStyle("#dAUsernames_Options a {color:#222222 !important; }");
	optionsPopup.setAttribute("style", "-moz-border-radius: 8px !important; background: url("+images[1]+") repeat-x #CCD9C8 top; border:2px solid #242F20; left:50%; margin-left:-250px; position:fixed; width:450px; z-index:258; padding: 0px 20px 50px 20px; font-size: 12px; color: #333333; -moz-opacity:1.0;opacity:1.0;");
	document.getElementsByTagName('body')[0].appendChild(optionsPopup);
		
	
	var insides = "";
	for (var j=0; j<usernames.length; j++){
		insides += "<li id='dAUsername_Name_"+j+"'><span><strong>"+usernames[j]+"</strong> &gt; <strong>"+replaces[j]+"</strong></span><span style='float:right;'><a id='dAUsername_Name_"+j+"_edit' href='javascript:;'>Edit</a> | <a  id='dAUsername_Name_"+j+"_del' href='javascript:;'>Delete</a></span><span style='float:right;display:none;'><a style='display:inline-block;margin-left:6px;background:#2A7AB7;-moz-border-radius:4px;padding:4px;color:#FFFFFF !important;text-decoration:none;' id='dAUsername_Name_"+j+"_save' href='javascript:;'>Save</a><a style='display:inline-block;margin-left:4px;background:#2A7AB7;-moz-border-radius:4px;padding:4px;color:#FFFFFF !important;text-decoration:none;' id='dAUsername_Name_"+j+"_cancel' href='javascript:;'>Cancel</a></span></li>";
	}

	
	optionsPopup.innerHTML = '<span id="dAUsernames_Options_close" title="Close" style="width: 17px; height: 17px; background:transparent url(' + images[2] + ') no-repeat;position: absolute; right: 10px; top: 10px; cursor: pointer;"></span>' +
							 '<span style="position: absolute; left: 0px; bottom: 0px; background:#DAE4D9; border-top:1px solid #9EB1A2; width:470px; padding:10px; -moz-border-radius: 0px 0px 7px 7px !important; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://fav.me/137698246">dA Custom Usernames</a> v' + SCRIPT_VERSION + ' by =<a href="http://solitude12.deviantart.com/">Solitude12</a></span>' + 
							 '<span style="position: absolute; right: 0px; bottom: 0px; padding:10px; font-size:10px; font-weight:normal;" id="dAUsernames_Update"><i>Checking for updates...</i></span>' + 
							 '<div align="center" style="-moz-border-radius: 8px !important; border-top:1px solid #D8E2D6;padding-top:20px;margin:0px -20px;height:45px;color:#333333;font-family:Trebuchet MS; font-size:22px;font-weight:bold; text-align:center;">dA Custom Usernames</div>'+
							 '<p>Welcome to dA Custom Usernames! Now you can give deviants custom usernames you want, like their real name, a nickname you always call them, or just some random name you find funny! Just add a name to the list below to begin!</p>'+
							 '<div id="dAUsernames_Options_Name_List" style="position:relative;height:200px;background:#BAC5BA;-moz-border-radius:8px;padding:10px;margin:0px -10px"></div>'+
							
							// '<input type="checkbox" id="dAUsernames_Options_Full_Names" '+checked_full_names+'/> <label for="dAUsernames_Options_Full_Names">Enable full deviation names in stats</label>'+
							// '<hr style="height:1px;border:0px;background:#677F67;margin:15px 0px;"/>'+
							// '<span id="dAUsernames_Options_Updates"></span>'+
							 '';
							 
	checkForUpdates();
							 
	document.getElementById('dAUsernames_Options_Name_List').innerHTML = '<ul id="dAUsernames_Names"><h2 style="font-size:18px;margin:4px;">Custom Usernames</h2><a style="cursor:pointer;position:absolute;top:7px;right:10px;display:inline-block;padding:3px 4px;-moz-border-radius:4px; border:1px solid #AFBEB0; background:url('+images[3]+') top center repeat-x #D7DED5;" id="dAUsernames_Add_Name">Add</a><span id="dA_Usernames_Names_Inside"></span></ul>';
	document.getElementById('dAUsernames_Names').setAttribute("style", "position:absolute;top:10px;bottom:10px;right:10px;left:10px;list-style-type: none;padding: 6px 6px 0 6px;margin: 0px;font-size:11px;background:url("+images[4]+") repeat-x top #D3DFD1;border:1px solid #677F67;overflow:auto;");
	GM_addStyle("#dAUsernames_Names li {margin-bottom: 3px;	padding: 4px 6px;-moz-border-radius:4px; border:1px solid #AFBEB0; background:url("+images[3]+") top left repeat-x #E0E4DE;} #dAUsernames_Names li input { border:1px solid #2A7AB7; padding:2px; background:#FFF; font:11px Verdana;}");
	
	document.getElementById('dA_Usernames_Names_Inside').innerHTML = insides;
	
	//alert(parseInt(document.defaultView.getComputedStyle(document.getElementById("dAUsernames_Options"), null).getPropertyValue("height").replace('px','')));
	
	optionsPopup.style.marginTop = "-"+((parseInt(document.defaultView.getComputedStyle(document.getElementById("dAUsernames_Options"), null).getPropertyValue("height").replace('px',''))+60)/2)+"px";

	optionsPopup.style.top="50%";
	
	function addEventsToName(j){
		/*document.getElementById("dAUsername_Name_"+j+"_edit").removeEventListener("click");
		document.getElementById("dAUsername_Name_"+j+"_save").removeEventListener("click");
		document.getElementById("dAUsername_Name_"+j+"_cancel").removeEventListener("click");
		document.getElementById("dAUsername_Name_"+j+"_del").removeEventListener("click");*/
		
		document.getElementById("dAUsername_Name_"+j+"_edit").addEventListener("click", function(e){
			var j = e.target.id.replace("dAUsername_Name_", "").replace("_edit","");
			document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[1].style.display="none";
			document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[2].style.display="inline";
			document.getElementById('dAUsername_Name_'+j).style.border="1px solid #2A7AB7";
			document.getElementById('dAUsername_Name_'+j).style.background="#74A8CF";
			document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[0].innerHTML = document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[0].innerHTML.replace(/<strong>(.*?)<\/strong>/g, '<input type="text" value="$1"></input>');			
			
			document.getElementById("dAUsername_Name_"+j+"_save").addEventListener("click", function(e){																									 
				var j = e.target.id.replace("dAUsername_Name_", "").replace("_save","");
				var inputs = document.getElementById('dAUsername_Name_'+j).getElementsByTagName('input');
				if (inputs[0].value=="" || inputs[1].value==""){
					alert("You must enter something for the username and custom username.");
				} else {
					// update usernames + replaces with new values
					usernames[j]=inputs[0].value;
					replaces[j]=inputs[1].value;
									
					GM_setValue('dACustomUsernames.usernames', usernames.join(','));
					GM_setValue('dACustomUsernames.replaces', replaces.join(','));
					
					document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[1].style.display="inline";
					document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[2].style.display="none";
					document.getElementById('dAUsername_Name_'+j).style.border="1px solid #AFBEB0";
					document.getElementById('dAUsername_Name_'+j).style.background="url("+images[3]+") top left repeat-x #E0E4DE";
					document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[0].innerHTML = "<strong>"+inputs[0].value + "</strong> &gt; <strong>"+ inputs[1].value +"</strong>";			
				}
			}, false);
				
			document.getElementById("dAUsername_Name_"+j+"_cancel").addEventListener("click", function(e){
				var j = e.target.id.replace("dAUsername_Name_", "").replace("_cancel","");
				document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[1].style.display="inline";
				document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[2].style.display="none";
				document.getElementById('dAUsername_Name_'+j).style.border="1px solid #AFBEB0";
				document.getElementById('dAUsername_Name_'+j).style.background="url("+images[3]+") top left repeat-x #E0E4DE";
				document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[0].innerHTML = "<strong>"+usernames[j] + "</strong> &gt; <strong>"+ replaces[j] +"</strong>";			
			}, false);
			
		}, false);
		
		document.getElementById("dAUsername_Name_"+j+"_del").addEventListener("click", function(e){
			var j = e.target.id.replace("dAUsername_Name_", "").replace("_del","");
			var yes = confirm("Are you sure you want to delete this name?");
			
			if(yes){
				document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[1].style.display="none";
				document.getElementById('dAUsername_Name_'+j).style.border="1px solid #AF2020";
				document.getElementById('dAUsername_Name_'+j).style.background="#DF6F6F";
				
				var deletetext = document.createElement("span");
				deletetext.setAttribute("id", 'dAUsername_Name_'+j+'_tobedeleted');
				deletetext.setAttribute("style", 'color:#FFF;float:right;');			
				deletetext.innerHTML="to be deleted on reload | <a href='javascript:;' style='color:#FFF !important; font-weight:bold !important;' id='dAUsername_Name_"+j+"_undel'>undelete</a>";
				document.getElementById('dAUsername_Name_'+j).appendChild(deletetext);
				todelete.push(j);
				//alert(todelete);
				
				document.getElementById("dAUsername_Name_"+j+"_undel").addEventListener("click", function(e){
					var j = e.target.id.replace("dAUsername_Name_", "").replace("_undel","");
					document.getElementById('dAUsername_Name_'+j).removeChild(document.getElementById('dAUsername_Name_'+j+'_tobedeleted'));
					document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[1].style.display="inline";
					document.getElementById('dAUsername_Name_'+j).style.border="1px solid #AFBEB0";
					document.getElementById('dAUsername_Name_'+j).style.background="url("+images[3]+") top left repeat-x #E0E4DE";
					todelete.splice(todelete.indexOf(j), 1);
					//alert(todelete);
					
				}, false);
				
				//splice j
				// remove from list and update list?
				//hmm confusing
				//document.getElementById("dAUsername_Name_"+j).style.display="none";		 How do I do this?		
			}
			
		}, false);
	}
	
	
	
	for (var j=0; j<usernames.length; j++){
		addEventsToName(j);
	}
	
	var newstuff = 0;
	
	document.getElementById("dAUsernames_Add_Name").addEventListener("click", function(e){
		var added = document.createElement("li");
		added.setAttribute("id", "dAUsername_Name_"+newstuff+"_new");
		added.innerHTML='<span><input value="" type="text"></input> &gt; <input value="" type="text"></input></span><span style="display:inline;float:right;"><a style="display:inline-block;margin-left:6px;background:#2A7AB7;-moz-border-radius:4px;padding:4px;color:#FFFFFF !important;text-decoration:none;" id="dAUsername_Name_'+newstuff+'_new_save" href="javascript:;">Save</a><a style="display:inline-block;margin-left:4px;background:#2A7AB7;-moz-border-radius:4px;padding:4px;color:#FFFFFF !important;text-decoration:none;" id="dAUsername_Name_'+newstuff+'_new_cancel" href="javascript:;">Cancel</a></span></li>';
		var currentid = newstuff;
		newstuff++;
		added.style.border="1px solid #2A7AB7";
		added.style.background="#74A8CF";				
		document.getElementById('dA_Usernames_Names_Inside').insertBefore(added, document.getElementById('dA_Usernames_Names_Inside').firstChild);
	
		document.getElementById("dAUsername_Name_"+currentid+"_new_save").addEventListener("click", function(e){
			var j = e.target.id.replace("dAUsername_Name_", "").replace("_new_save","");
			var inputs = document.getElementById('dAUsername_Name_'+j+'_new').getElementsByTagName('input');
			if (inputs[0].value=="" || inputs[1].value==""){
				alert("You must enter something for the username and custom username.");
			} else {
				finid = usernames.length;
				usernames.push(inputs[0].value);
				replaces.push(inputs[1].value);
				
				GM_setValue('dACustomUsernames.usernames', usernames.join(','));
				GM_setValue('dACustomUsernames.replaces', replaces.join(','));
				
				var added = document.createElement("li");
				added.setAttribute("id", "dAUsername_Name_"+finid);
				added.innerHTML='<span><strong>'+inputs[0].value+'</strong> &gt; <strong>'+inputs[1].value+'</strong></span><span style="float:right;display:inline;"><a id="dAUsername_Name_'+finid+'_edit" href="javascript:;">Edit</a> | <a  id="dAUsername_Name_'+finid+'_del" href="javascript:;">Delete</a></span><span style="display:none;float:right;"><a style="display:inline-block;margin-left:6px;background:#2A7AB7;-moz-border-radius:4px;padding:4px;color:#FFFFFF !important;text-decoration:none;" id="dAUsername_Name_'+finid+'_save" href="javascript:;">Save</a><a style="display:inline-block;margin-left:4px;background:#2A7AB7;-moz-border-radius:4px;padding:4px;color:#FFFFFF !important;text-decoration:none;" id="dAUsername_Name_'+finid+'_cancel" href="javascript:;">Cancel</a></span></li>';
				document.getElementById('dA_Usernames_Names_Inside').removeChild(document.getElementById("dAUsername_Name_"+j+"_new"));
				document.getElementById('dA_Usernames_Names_Inside').appendChild(added);
				addEventsToName(finid);
				/*document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[1].style.display="inline";
				document.getElementById("dAUsername_Name_"+j+"_save").style.display="none";
				document.getElementById("dAUsername_Name_"+j+"_cancel").style.display="none";
				document.getElementById('dAUsername_Name_'+j).style.border="1px solid #AFBEB0";
				document.getElementById('dAUsername_Name_'+j).style.background="url("+images[3]+") top left repeat-x #E0E4DE";
				usernames.push(inputs[0].value);
				replaces.push(inputs[1].value);
				document.getElementById("dAUsername_Name_"+j).getElementsByTagName('span')[0].innerHTML = "<strong>"+inputs[0].value + "</strong> &gt; <strong>"+ inputs[1].value +"</strong>";			
				;*/
				
				// just create completely new one at the end, without any events, and then addEventsToName!
					
			}
		}, false);
		
		document.getElementById("dAUsername_Name_"+currentid+"_new_cancel").addEventListener("click", function(e){
			var j = e.target.id.replace("dAUsername_Name_", "").replace("_new_cancel","");
			document.getElementById('dA_Usernames_Names_Inside').removeChild(document.getElementById("dAUsername_Name_"+j+"_new"));		
		}, false);
		
		
		
	}, false);
	
	
	document.getElementById('dAUsernames_Options_close').addEventListener('click', function(e){
		closeOptions();
	}, false);
	
	
}

GM_registerMenuCommand("dA Custom Usernames Preferences", function(){ if(optionsIsCreated!=true) { showOptions() } })

function deletedeletables(){
	if(todelete.length!=0){
		for(var i=0; i<todelete.length; i++){
			
			usernames.splice(todelete[i], 1);
			replaces.splice(todelete[i], 1);
		}				
		GM_setValue('dACustomUsernames.usernames', usernames.join(','));
		GM_setValue('dACustomUsernames.replaces', replaces.join(','));
	}
}

unsafeWindow.onbeforeunload = deletedeletables;