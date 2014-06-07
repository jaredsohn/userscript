// ==UserScript==
// @name		Bugzilla extention
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author		Mixey
// @namespace	http://issuemanager2.com/
// @include		http://issuemanager2.*.com/*
// @version		1.3.0
// ==/UserScript==

var svnInfo;
var RE = /first-child/i;
var SUC_script_num = 67760;
var contactList;
 
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.innerHTML = "function Copy(meintext){  netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);if (!clip) return; var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable); if (!trans) return; trans.addDataFlavor('text/unicode'); var str = new Object(); var len = new Object(); var str = Components.classes['@mozilla.org/supports-string;1'].createInstance(Components.interfaces.nsISupportsString); var copytext = meintext; str.data = copytext; trans.setTransferData('text/unicode', str, copytext.length * 2); var clipid = Components.interfaces.nsIClipboard; if (!clip) return false; clip.setData(trans,null,clipid.kGlobalClipboard); return false;} function blinkText(type){ if (type==1) document.getElementById('summary_alias_container').style.color = 'Red'; if (type==2) document.getElementById('pCopySVNInfoFloat').style.padding = '2px'; setTimeout(function(){document.getElementById('summary_alias_container').style.color = 'Black'; document.getElementById('pCopySVNInfoFloat').style.padding = '5px';}, 200); }";
body = document.getElementsByTagName('body')[0];
body.appendChild(script);

function updateCheck(forced)
{                
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
}

function extendBugList()
{
try
{
  var bugList = document.evaluate("//td[@class='first-child']", document, null, 6, null);
  for (var l = 0; l < bugList.snapshotLength; l++)
  {
    //alert(bugList.snapshotItem(l).parentNode.textContent);
	bt = document.createElement("img");
	bt.addEventListener('click', function(event) {
	  var tmp = event.target.parentNode.textContent + "";
	  var arr = tmp.replace(/ {2}/g, "").split(/\n/g);
	  var svnInfo = "Bug ID: " + arr[3] + "\nRequestor: " + arr[11] + "\nModule: \nSummary: " + arr[15];	  
	  alert(svnInfo);          
	}, false);
	bt.style.margin = '0';
	bt.style.cursor = 'pointer';
	bt.style.verticalAlign = 'middle';
	bt.setAttribute('border', 0);
	bt.setAttribute('title', 'show svn info');
	bt.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAA+1JREFUSIm1lV2IVVUUx397n3PunXNHp+444wx+jJkTpeEHUUiZhGOUGOWL+BJRPQQRBoFPQUUPQj31kEFkBNZD9FiSWJBomRJFqeQXltNEMZIz15k73nvP19579XDvHefO9SuqBQv2Oeu/1p/1sddWIsL/Kf7NAl/75miwsm9hLyivFFdKz69eUbsZP3W9DLYfPORvWDT4ZKcfbNNKrwHpBTyUmhCRM5Exn45WL3/4wuo7x/8xwQcnhzf2hOEuX+vlqXVkzmIbWK0UgdbktIcgpckkefmp5Uvev2mC904OP9fT0bE7tY7LWYoIKAUCpNbhKTACoe8Reh4FP6CcJu88u+K2F29I8Naxc0/ML4Sf1TJDJcvwtAZARFDA0OI++sIcX/06wkhkKXTk8ZWiO5/nUpLs3L5q2asz4+mZHy8dPlYMg2DPRJIyFiekIkTGEhlLOTX0d4asnNfF/EIHW+5YQmlyglRgKsu4EEXkPO+V178/tXZmzJYp6g3DHbGxxVKS4CkF7oottY5fyhVKScq8fI6f/xon8wJqmUHEUc0MIlDwgzeAobYSbfvyiH93d/f5zMlAbC1qGgGJdcwJfIr5gFArqmnKhVpKEAQwo8SeUnQGvlyM4sFd69cMt2RQDMO7qsYO1Ixp6UlsHRsW9LBxYS/9nSHWOT4/e57TpTJztW4hcIBFlFbqIWC4pQdOWFpOM2rWtqhFODY+yc6fzjJajfG0ZtPtA5DEVK1rwUa23qvI2sG2HsTWdhl39TsxkhmsExx1+2SSUHFCYC3KuRZsjAWY00ZQMXbMXePSpdYxMKfAgkIHAKcvlihZ4RZjWkrUFIUqtRGkzp3LrBO40t+mlNOMRxb3oVXd9N3oRWLtkcvMbCgAWqmT0+fmYd+mB0asyAkjwmx1wH29RQCMMRy/NEXg+224hkbAoTaCRm5vC/WV0FTXWAnLujrr2dQifq/FpAhKKWbjgY+/2Lzu0lUJuvPhHuBEi4Oqj+of1QiAeV1zeXdoLduX9mPiCNdKUvWUalkVbbtoaN+3g1bkB+DW5j/jhK6cz9alC+jJ5/hzqsLXo2OMpmZ6VzVqv+XgYw/uvS4BwIb9R9dY5/YisriRBJkI1UZTtVKEvk+gpsuSeFo/c3Dzuk9mx7rme7DpyKliNFV+U0SeRuk8CE2sakxTY8PuD3L5HQcevvfM1eIoEcFXqgAUgRDIAb4FA1QXPb71nu771z+am9+/yusIe1HKc0kykU2UzpRP/Hjgt492Hwa0B3nAAikQARNGpNYkyFO/fXkgADzAE9AOkoaD1yBXjSAGyCkIdb1StqEZdZ+KEUmu+yb/F6JvDPl38jd+gyLPOTkT4QAAAABJRU5ErkJggg==";    
	bugList.snapshotItem(l).parentNode.appendChild(bt);
  }  
  return;
}
catch (e){alert(e);}
}

function extractRequestorInfo()
{
  try
  {
    var tbSignoffContact = document.getElementById("cf_signoff_contact");
    if (tbSignoffContact.value != "")
    	return tbSignoffContact.value;

    return document.getElementById("bz_show_bug_column_2").innerHTML.match(/class=\"fn\">(.+?)</)[1];
  }
  catch (e)
  {
    alert(e);
  }
  return "";
}

function extractModuleInfo()
{
  try
  {
    var result = document.getElementById("component");
    if (result == null)
    {
      var mems = document.evaluate("//td[@class='field_label']", document.getElementById("bz_show_bug_column_1"), null, 6, null);
      for (var l = 0; l < mems.snapshotLength; l++)
      {
      	if (l == 2)
      	{
       	  var tmp = mems.snapshotItem(l).parentNode.textContent + "";
          return (tmp.replace(/[\n ]|(Component:)/g,""));
        }
      }
    }
    else
    {
      return result.value;
    }
  }
  catch (e)
  {
    alert(e);
  }
  return "";
}

function redesignPage() {
	$('.bz_comment > div:odd').parent().css("background-color", "#F0EFC9");
	$('.bz_comment > div:even').parent().css("background-color", "#E5F3F9");
	$('#bz_show_bug_column_1').parent().hide();
	$('.bz_time_tracking_table').hide();
	$('#attachment_table').hide();
	$('.collapse_buttons').remove();

	$otdRight = $('.bz_time_tracking_table').parent().parent();
	var odiv = $(document.createElement('div'))
	odiv.append("Show details");
	odiv.css({"cursor": "pointer", "text-decoration": "underline", "padding-top": "5px", "color": "#6070CF"});
	odiv.click(function (){ 
		$('#bz_show_bug_column_1').parent().show(); 
	});
	$otdRight.append(odiv);
	
	odiv = $(document.createElement('div'))
	odiv.append("Show attachments");
	odiv.css({"cursor": "pointer", "text-decoration": "underline", "padding-top": "5px", "color": "#6070CF"});
	odiv.click(function (){ 
		$('#attachment_table').show(); 
	});
	$otdRight.append(odiv);
	
	odiv = $(document.createElement('div'))
	odiv.append("Show time track");
	odiv.css({"cursor": "pointer", "text-decoration": "underline", "padding-top": "5px", "color": "#6070CF"});
	odiv.click(function (){ 
		$('.bz_time_tracking_table').show(); 
	});
	$otdRight.append(odiv);
	
	$("#attachment_table").after($("#bz_assignee_edit_container").parent().parent());
	
	$bz_head = $('head');
	$bz_head_style = $bz_head.find('style');
	$ul_links_li = $('#header ul.links li');
	$saved_links = $('#links-saved ul.links li');
	$ul_links_li.find('span.separator').remove();//remove delimiters from top menu
	$saved_links.find('span.separator').remove();//remove delimiters from saved links
	if($bz_head_style.length <1)//avoid duplicate style insertion
	{
		$bz_head.append('<style/>');
		$bz_head_style = $bz_head.find('style');
	}

	$bz_head_style.append(''+
	'#header ul.links li a, #links-saved ul.links li a { '+
		'-moz-background-clip: border;'+
		'-moz-background-inline-policy: continuous;'+
		'-moz-background-origin: padding;'+
		'-moz-border-radius-bottomleft: 5px;'+
		'-moz-border-radius-bottomright: 5px;'+
		'-moz-border-radius-topleft: 5px;'+
		'-moz-border-radius-topright: 5px;'+
		'padding: 0px 4px 0px 4px;'+
		'text-decoration: none;'+
		'position: relative;'+
	'}'+
	'#header ul.links li a:hover, #links-saved ul.links li a:hover {'+
		'background-color: #FF9900;'+
	'}'+
	'.nactiveM{'+
		'color: #ffffff; '+
		'background-color: #777777 '+
	'}'+
	'.activeM {'+ 
		'color: #ffffff; '+
		'background-color: #FF9900 '+
	'}'+
	'');
	var flag_m;// flag to show that the saved_links is inserted or not, to avoid duplicates
	if(typeof (flag_m) === "undefined") {
		flag_m = 0;
	}
	$ul_links_li.each(function(i){
		if(i == 3 && flag_m < 1){
			$(this).after($saved_links.clone());// add the saved links to the top menu
			flag_m = 1;
		}
		$(this).find('a').addClass('nactiveM');//set the default style to all the items
	});
	$ul_links_li = $('#header ul.links li');//cache again the menu, now with the inserted saved_links
	$ul_links_li.each(function(){
		$curr_a = $(this).find('a');
		$curr_link = $(this).find('a').attr('href');
		$curr_a.removeClass('activeM').addClass('nactiveM');
	});
	$saved_links.each(function(){//the same as above but for saved_links
		$curr_a = $(this).find('a');
		$curr_link = $(this).find('a').attr('href');
		$curr_a.removeClass('activeM').addClass('nactiveM');
	});
}

function addSvnInfoButton()
{
	var msg = "";
		// get bug ID
		msg += "Bug ID: " + document.title.match(/\d+/) + "\\n";
		// get requestor 
		msg += "Requestor: " + extractRequestorInfo() + "\\n";
		// get module 
		msg += "Module: " + extractModuleInfo() + "\\n";
		// get summary 
		msg += "Summary: " + document.getElementById("short_desc").value;
	
		svnInfo = msg.replace(/['"]/g, "\\'");
	try 
	{
		$('#short_desc_nonedit_display').before('<div style="float: left; verticalAlign:middle; padding-top:2px; padding-right: 10px; cursor:pointer" ><img title="svn info to clipboard" margin="0" border="0" onclick="Copy(\''+ svnInfo +'\'); blinkText(1);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIpSURBVDjLddM9aFRBFIbh98zM3WyybnYVf4KSQjBJJVZBixhRixSaShtBMKUoWomgnaCxsJdgIQSstE4nEhNREgyoZYhpkogkuMa4/3fuHIu7gpLd00wz52POMzMydu/Dy958dMwYioomIIgqDa+VnWrzebNUejY/NV6nQ8nlR4ufXt0fzm2WgxUgqBInAWdhemGbpcWNN9/XN27PPb1QbRdgjEhPqap2ZUv5+iOwvJnweT1mT5djZKjI6Ej/udz+wt1OJzAKYgWyDjJWyFghmzFsbtcY2gsTJwv09/Vc7RTgAEQgsqAKaoWsM8wu/z7a8B7vA8cHD3Fr+ktFgspO3a+vrdVfNEulJ/NT4zWngCBYY1oqSghKI465fvYwW+VAatPX07IZmF7YfrC0uDE8emPmilOFkHYiBKxAxhmSRPlZVVa2FGOU2Ad2ap4zg92MDBXJZczFmdflx05VEcAZMGIIClZASdesS2cU/dcm4sTBArNzXTcNakiCb3/HLRsn4Fo2qyXh3WqDXzUlcgYnam3Dl4Hif82dbOiyiBGstSjg4majEpl8rpCNUQUjgkia0M5GVAlBEBFUwflEv12b/Hig6SmA1iDtzhcsE6eP7LIxAchAtwNVxc1MnhprN/+lh0txErxrPZVdFdRDEEzHT6LWpTbtq+HLSDDiOm2o1uqlyOT37bIhHdKaXoL6pqhq24Dzd96/tUYGwPSBVv7atFglaFIu5KLuPxeX/xsp7aR6AAAAAElFTkSuQmCC"></img></div>');
		
		$otd = $(".bz_collapse_expand_comments").parent();
		$otd.empty();
		$otd.append('<p id="pCopySVNInfoFloat" style="background-color: #D0D0D0; display:block; position:fixed; top:78px; right:35px; cursor:pointer; padding:5px; border: 1px solid #404D6C;"><img title="svn info to clipboard" margin="0" border="0" onclick="Copy(\''+ svnInfo +'\'); blinkText(2);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIpSURBVDjLddM9aFRBFIbh98zM3WyybnYVf4KSQjBJJVZBixhRixSaShtBMKUoWomgnaCxsJdgIQSstE4nEhNREgyoZYhpkogkuMa4/3fuHIu7gpLd00wz52POMzMydu/Dy958dMwYioomIIgqDa+VnWrzebNUejY/NV6nQ8nlR4ufXt0fzm2WgxUgqBInAWdhemGbpcWNN9/XN27PPb1QbRdgjEhPqap2ZUv5+iOwvJnweT1mT5djZKjI6Ej/udz+wt1OJzAKYgWyDjJWyFghmzFsbtcY2gsTJwv09/Vc7RTgAEQgsqAKaoWsM8wu/z7a8B7vA8cHD3Fr+ktFgspO3a+vrdVfNEulJ/NT4zWngCBYY1oqSghKI465fvYwW+VAatPX07IZmF7YfrC0uDE8emPmilOFkHYiBKxAxhmSRPlZVVa2FGOU2Ad2ap4zg92MDBXJZczFmdflx05VEcAZMGIIClZASdesS2cU/dcm4sTBArNzXTcNakiCb3/HLRsn4Fo2qyXh3WqDXzUlcgYnam3Dl4Hif82dbOiyiBGstSjg4majEpl8rpCNUQUjgkia0M5GVAlBEBFUwflEv12b/Hig6SmA1iDtzhcsE6eP7LIxAchAtwNVxc1MnhprN/+lh0txErxrPZVdFdRDEEzHT6LWpTbtq+HLSDDiOm2o1uqlyOT37bIhHdKaXoL6pqhq24Dzd96/tUYGwPSBVv7atFglaFIu5KLuPxeX/xsp7aR6AAAAAElFTkSuQmCC"></img></p>');
	}
	catch (e)
	{
		alert(e);
	}
}

function addAdditionalSubmitButton()
{   
	$("#commit").val("Commit");
	
	var leftPanel = $("#bz_assignee_input");
	var bt = document.createElement("input");
	bt.setAttribute("id", "commit");
	bt.setAttribute("type", "submit");
	bt.setAttribute("value", "Commit");
	leftPanel.append(bt); 
}

function addFilter()
{
	contactList = new Array();
	var tbContList = document.getElementById("assigned_to")
	for (i=0; i<tbContList.options.length;i++){
		contactList[i] = tbContList.options[i];
	}
	
	var leftPanel = document.getElementById("bz_assignee_input");
	var bt = document.createElement("input");
	bt.setAttribute("id", "tbFilterContact");
	bt.setAttribute("type", "input");
	bt.addEventListener("change", tbFilterContact_changeHandler, false);  
	leftPanel.appendChild(bt);  
}

function tbFilterContact_changeHandler() {
	try {
		var filter = $('#tbFilterContact');
		$('option', $('#assigned_to')).remove();
		$.each(contactList, function(text, val) {
			if (val.text.toUpperCase().indexOf(filter.val().toUpperCase(), 0) != -1)
				$('#assigned_to').append(val);
		});

	} catch (ex) {
		alert(ex);
	}
}

window.main = function ()
{  
	if (window.location.pathname == "/show_bug.cgi") {
		redesignPage();		
		addSvnInfoButton();			
		addFilter();
		addAdditionalSubmitButton();
	} else if (window.location.pathname == "/buglist.cgi") {
		//extendBugList();
	}
  
  GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Bugzilla extension') + ' - Update', function()
  {
    updateCheck(true);
  });
}

main();

