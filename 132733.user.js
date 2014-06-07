// ==UserScript==
// @name aroz8 
// @version 0.1.2.3
// @description Fix shirshor
// @include http://*.inn.co.il/Forum/Forum.aspx/*
// ==/UserScript==



  do_it=  function() {
	URLscript=document.createTextNode("ssd ="+ssd+"\n ssd();");
	var Uscript = document.createElement('script');
	Uscript.setAttribute('language','javascript');
	Uscript.setAttribute('id','Ujs1');
	document.body.appendChild(Uscript);
	document.getElementById('Ujs1').appendChild(URLscript);
	
	
	};
	
	ssd = function ()
{	
DisplayMessage=function (tid,id)
{	var div =_("tdMsg"+id);	
	var message = Forum.Messages[id], user = Forum.Users[message.author], topic = aTopics[message.topic];
	
	if (!message.initalized) {
		message.initalized = true;

		var html = [],p= function (h) {html.push(h)}
		p('<br/><div class=Content>'+message.content.toHTMLS()+message.contentPlus+(user.sign&&user.sign.length>15? "<div class=UserSign>"+ user.sign.toHTMLS()+'</div>':"")+'</div></div><div><br/>')
		if (DisplayMethod!='user') {
			if (topic.status==1){ p('<span class="ForumMinButton" onclick="DisplayForm('+message.topic+","+message.id+')">תגובה</span>');p('<span class="ForumMinButton" onclick="savemsg('+message.topic+","+message.id+')">שמור</span>');}
			if (iIsManager == 1||user.id==User.ID&&aLinear[message.topic+"-"+ message.linear.replaceStr('/','')]==message.id) p('<span class=ForumMinButton onclick="DisplayForm('+message.topic+","+message.id+',1)">עריכה</span>');
			if (iIsManager == 1) {
				if(message.num!=0) p('<span class=ForumMinButton OnClick="DelMsg('+message.topic+','+message.id+',\''+(message.num==-1?'בטל':'מחק')+'\')">'+(message.num==-1?'שחזר':'מחק')+'</span>');
				else { p('<Select onchange="ActTopic(this,'+message.topic+')"><option value=פעולות>פעולות</option>'+(topic.status==-1?'<option value=בטל>בטל מחיקה</option>':'')+'<option value="מחק">מחק</option>');
					if (topic.status==1) p("<option value='נעל'>נעל</option>");else p("<option value='שחרר'>שחרר</option>");
					if (topic.ogen) p("<option value='הורד'>הורד נעיצה</option>"); else p("<option value='עוגן'>נעץ</option>");
					p("<option value='שרשר'>שרשר אותי</option><option value='ip'>כתובות IP</option></select>")}}
		}
		if(User.Name&&user.id>0) p(' | <a class=Link  href="/My/PrivateBox/lmb_Folder.aspx?form=1&to='+ escape(user.name) +'">מסר למחבר/ת</a> | <span class=Link onclick=\'User.OpenIM("'+ user.name.toJS().toHTML() +'")\'>שיחה עם המחבר/ת</span></div>');
		p('<Div id=frmPost'+message.id+' class=DivMessagePost style=display:none></div>')
		div.innerHTML = html.string();
	}

	if (arguments.length==2) $(div).toggle();
	else if (arguments[2]) $(div).show(); else $(div).hide();
	
	if($.inArray(message.id+"",topic.viewed)==-1) INNData.Save("t"+tid,INNData.Load("t"+tid)+","+id);
	_("ForumMessageTitle"+id).style.color="#003F70";
};

DisplayForm=function (topic,id,edit){ 
	var div =_("frmPost"+id),sAnon="";
	if(User.Name=="") {if(User.ID>0) location.href='/Register.aspx'; else Windows.Login();return false;}
	setTimeout(function() {var f = function() { $('table',div).show();  $(div).height('auto'); }; $(div).height(380);  $('table',div).hide(); if(div.style.display=='none') $(div).slideDown(200,f); else $(div).slideUp(200,f);},10);
	if (Forum.Messages[id].edit!=edit) Forum.Messages[id].editor=null;
	if(Forum.Messages[id].editor)  return;
	
	Forum.Messages[id].editor= new Editor();
	Forum.Messages[id].edit=!!edit;
	if (window.bAnonymus) sAnon = '<span style=float:left><input type=checkbox value=1 id=chkAnon'+id+' onchange=\'var z=_("spnUserName'+id+'"); z.innerHTML=this.checked? "אנונימי":User.Name;\'> כתוב כאנונימי</span>';
	div.innerHTML = '<table style=margin-top:10px;width:90%;display:none><tr><td>משתמש:</td><td>'+sAnon+'<span id=spnUserName'+id+'>'+User.Name+'</span> <tr><td><b>נושא:</b></td><td style=padding-bottom:4px><input  tabindex=5 onkeypress="if(event.keyCode==13) {sub_mit('+Forum.ID+','+topic+','+id+');return false}" { maxLength="50" id=txtSubject'+id+' size="52" value="'+(edit?Forum.Messages[id].title.toHTML():sdata.title!=null?sdata.title.toHTML():"")+'">&nbsp;&nbsp;&nbsp;  <span class=Link onclick=window.editor=Forum.Messages['+id+'].editor;Windows.Upload() style="text-decoration:underline;width:90px;"><img style=margin-left:3px; src="http://a7.org/images/mail/attach.png">העלאת קובץ </span></td></tr>\
	 <tr><td width=8% nowrap><b>הודעה:</b><br/></td><td style=position:relative>'+Forum.Messages[id].editor.Instantiate(edit?Forum.Messages[id].content:sdata.content!=null?sdata.content:"")+'</td></tr><tr><td>&nbsp;</td><td><br/><span class="ForumMinButton" tabindex=5  onkeypress="if(arguments[0])event=arguments[0];if(event.keyCode==13||event.keyCode==32) {sub_mit('+Forum.ID+','+topic+','+id+')};return false"  onclick="sub_mit('+Forum.ID+','+topic+','+id+');return false; o">שלח</span><span id=spnProgress'+id+'></td></tr></table>';
	sdata.title="";
	sdata.content="";
	sdata.name="";
	Forum.Messages[id].editor.Writed();
};

sdata={title:"",content:"",name:""};
savemsg= function(tid,mid){
	sdata.title=Forum.Messages[mid].title;
	sdata.content=Forum.Messages[mid].content;
	sdata.name=Forum.Users[Forum.Messages[mid].author].name;
	//makehtml();
	//alert("התוכן לגבי "+sdata.name+" נשמר בהצלחה");
	$("#divBlock").remove();
	Windows.CenterGen("בחר מי?",$("<div>האם זה בן או בת?<br><select id=inpBlock><option>בן</option><option>בת</option></select><br><input type=button onclick=makehtml(); value=בחר></div>")[0],120).id="divBlock";
	
};
makehtml=function(){
	var temp_con="<p><b>נושא:</b></p>";
	temp_con+="<p style=\"text-indent: 1cm;\">"+sdata.title+"</p>";
	temp_con+="<p><b>תוכן:</b></p>";
	temp_con+="<div style=\"text-indent: 1cm;\">"+(sdata.content?sdata.content:"ריק")+"</div>";
temp_con+="<br/><p>נכתב במסגרת פרוייקט <b>שרשר אותי</b></p>";
	sdata.content=temp_con;
	sdata.title="פה "+sdata.name+(_("inpBlock").value=="בת"?" התכוונה":" התכוון")+" לכתוב";
	$("#divBlock").remove();
};
};
 do_it();