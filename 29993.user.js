// ==UserScript==
// @name           studiVz - addSmiley
// @author	   Thomas Zeugner
// @namespace      www.studivz.net
// @include http://www.studivz.net/Messages*
// @include http://www.studivz.net/Message*
// @include http://www.meinvz.net/Messages*
// @include http://www.meinvz.net/Message*
// @description    Displays small icons in the messaging system of "studivz" to easily add smileys to your messages
// @description    Blendet Smilies im StudiVZ "Nachrichtendienst" ein.
// ==/UserScript==


addEventListener('load', function(event) 
{
	var aktiv; //- der Handle fuer den Timer
	var cbox; //- der Handel der Checkbox
	var s_file = new Array();	
	var s_code = new Array();
	var s_txt = new Array();

	s_file[ 0]="sVZ_Emoticon_1.gif";  s_code[ 0]="$%&1";	s_txt[ 0]=Array(":-)",":)");
	s_file[ 1]="sVZ_Emoticon_2.gif";  s_code[ 1]="$%&2";	s_txt[ 1]=Array(":-D",":D","xD","=D");
	s_file[ 2]="sVZ_Emoticon_3.gif";  s_code[ 2]="$%&3";	s_txt[ 2]=Array(";-)",";)");
	s_file[ 3]="sVZ_Emoticon_4.gif";  s_code[ 3]="$%&4";	s_txt[ 3]=Array(":-(",":(");
	s_file[ 4]="sVZ_Emoticon_5.gif";  s_code[ 4]="$%&5";	s_txt[ 4]=Array(":-P",":-p",":p",":P");
	s_file[ 5]="sVZ_Emoticon_6.gif";  s_code[ 5]="$%&6";	s_txt[ 5]=Array(":'(", ":'-(",":,(");
	s_file[ 6]="sVZ_Emoticon_7.gif";  s_code[ 6]="$%&7";	s_txt[ 6]=Array(":-*)");
	s_file[ 7]="sVZ_Emoticon_8.gif";  s_code[ 7]="$%&8";	s_txt[ 7]=Array(":-X",":-x",":*");
	s_file[ 8]="sVZ_Emoticon_9.gif";  s_code[ 8]="$%&9";	s_txt[ 8]=Array(":-O",":-o",":O",":o");
	s_file[ 9]="sVZ_Emoticon_10.gif"; s_code[ 9]="$%&10";	s_txt[ 9]=Array(":-s",":s",":-S",":-s");
	s_file[10]="sVZ_Emoticon_11.gif"; s_code[10]="$%&11";	s_txt[10]=Array("(S)","(s)");
	s_file[11]="sVZ_Emoticon_12.gif"; s_code[11]="$%&1521";	s_txt[11]=Array("+o(");
	s_file[12]="sVZ_Emoticon_13.gif"; s_code[12]="$%&1747";	s_txt[12]=Array(":@",":-@");
	s_file[13]="sVZ_Emoticon_14.gif"; s_code[13]="$%&1853";	s_txt[13]=Array(":?",":-?");
	s_file[14]="sVZ_Emoticon_15.gif"; s_code[14]="$%&1897";	s_txt[14]=Array();
	s_file[15]="mVZ_Emoticon_15.gif"; s_code[15]="$%&1899";	s_txt[15]=Array();
	s_file[16]="sVZ_Emoticon_16.gif"; s_code[16]="$%&1903";	s_txt[16]=Array();
	s_file[17]="sVZ_Emoticon_17.gif"; s_code[17]="$%&2189";	s_txt[17]=Array("*-)");
	s_file[18]="sVZ_Emoticon_18.gif"; s_code[18]="$%&2276";	s_txt[18]=Array();
	s_file[19]="sVZ_Emoticon_19.gif"; s_code[19]="$%&2376";	s_txt[19]=Array("(!)");
	s_file[20]="sVZ_Emoticon_20.gif"; s_code[20]="$%&2454";	s_txt[20]=Array("(?)");
	s_file[21]="sVZ_Emoticon_21.gif"; s_code[21]="$%&2365";	s_txt[21]=Array("(#)");
	s_file[22]="sVZ_Emoticon_22.gif"; s_code[22]="$%&2471";	s_txt[22]=Array("(st)","(li)");
	s_file[23]="sVZ_Emoticon_23.gif"; s_code[23]="$%&2498";	s_txt[23]=Array(":-|",":|");
	s_file[24]="sVZ_Emoticon_24.gif"; s_code[24]="$%&2571";	s_txt[24]=Array("]:-)",">:-)",">:)","}:->","(6)");
	s_file[25]="sVZ_Emoticon_25.gif"; s_code[25]="$%&2588";	s_txt[25]=Array("0:-)","0:)");
	s_file[26]="sVZ_Emoticon_26.gif"; s_code[26]="$%&3333";	s_txt[26]=Array("(L)","(l)");
	s_file[27]="sVZ_Emoticon_27.gif"; s_code[27]="$%&4444";	s_txt[27]=Array("(U)","(u)");
	s_file[28]="sVZ_Emoticon_28.gif"; s_code[28]="$%&4578";	s_txt[28]=Array();
	s_file[29]="sVZ_Emoticon_29.gif"; s_code[29]="$%&5555";	s_txt[29]=Array();
	s_file[30]="sVZ_Emoticon_30.gif"; s_code[30]="$%&5783";	s_txt[30]=Array("(g)","(G)");
	s_file[31]="sVZ_Emoticon_31.gif"; s_code[31]="$%&5912";	s_txt[31]=Array();
	s_file[32]="sVZ_Emoticon_32.gif"; s_code[32]="$%&6173";	s_txt[32]=Array();
	s_file[33]="sVZ_Emoticon_33.gif"; s_code[33]="$%&6262";	s_txt[33]=Array("(^)");
	s_file[34]="sVZ_Emoticon_34.gif"; s_code[34]="$%&6398";	s_txt[34]=Array("B)","B-)","(h)","(H)");
	s_file[35]="sVZ_Emoticon_35.gif"; s_code[35]="$%&7834";	s_txt[35]=Array();
	s_file[36]="sVZ_Emoticon_36.gif"; s_code[36]="$%&7867";	s_txt[36]=Array("<:o)","<:O)");
	s_file[37]="sVZ_Emoticon_37.gif"; s_code[37]="$%&7912";	s_txt[37]=Array();
	s_file[38]="sVZ_Emoticon_38.gif"; s_code[38]="$%&8121";	s_txt[38]=Array("(y)","(Y)");


	function findTextarea()
	{
		var ta=document.getElementsByTagName("textarea");
		var rt=false;

		for (i=0; i<ta.length; i++)
		{
			if (ta[i].id.indexOf("essages_message",0) != -1)
			{
				rt=ta[i]; //- weitersuchen... wir wollen das letzte!
			}

		}
		return rt;

	}



	function insert_sm(ob)
	{
		myd=document.createElement("p");
		myd.className="hint";
		myd.style.marginTop="-10px";
		myd.style.marginRight = "20px";
		ob.parentNode.insertBefore(myd, ob.nextSibling);


		for(i=0; i<s_file.length; i++)
		{
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.innerHTML="<img src='http://static.pe.studivz.net/Img/Smiley/"+ s_file[i] +"' style='float:left; padding-left:2px; padding-bottom:2px' title='" + s_code[i] + "'> ";

			mm.addEventListener("click", function(event)
			{
				var mytb = findTextarea();
				var title = this.getElementsByTagName('img')[0].getAttribute("title");

				if (cbox)
				{
					if (cbox.checked) 
					{
						for(i=0; i<s_code.length; i++)
						{
							if (s_code[i]==title)
							{
								if (s_txt[i].length>0) title=s_txt[i][0];
								break;
							}
						}
					}
				}

				if (mytb)
				{
					var startPos = mytb.selectionStart;
					var endPos = mytb.selectionEnd;

					mytb.value = mytb.value.substring(0, startPos) + title + mytb.value.substring(endPos, mytb.value.length); 

					startPos += title.length;
					mytb.focus();
					mytb.selectionStart=startPos;
					mytb.selectionEnd=startPos;

				}
			}
			, true);


			myd.appendChild(mm);
		}


		
		var submit_f = function(event)
		{
			if (cbox)
			{
				if (cbox.checked) 
				{
					var mytb = findTextarea();
					var s=mytb.value;

					//- speichern ob mit oder ohne ersetzen?
					GM_setValue("replace",1);

					for(i=(s_txt.length-1); i>=0; i--)
					{
						for(j=0; j< s_txt[i].length; j++ )
						{
							//- alles ersetzen - geht leider mit replace nicht => blödes regex
							s=s.split(s_txt[i][j]).join(s_code[i]);
						}
					}
					mytb.value=s;
				}
				else
				{
					GM_setValue("replace",0);
				}
			}
			else
			{
				GM_setValue("replace",0);
			}
		}


		//- wir befinden uns auf der Inbox oder Gesendet Seite
		var t_input = ob.parentNode.getElementsByTagName('input');
		var b_s=false;
		for (i=0; i<t_input.length; i++)
		{
			if((t_input[i].type=="submit") || (t_input[i].type=="button"))
			{

				t_input[i].addEventListener("mousedown", submit_f, false);
				b_s=true;
			}
		}


		if (b_s)
		{
			cbox=document.createElement("input");
			cbox.type="checkbox";
			cbox.id="gm_autoinsert";

			if (GM_getValue("replace")>0) cbox.checked=true;
			
			label=document.createElement("label");
			label.style.padding = "2px";
			label.style.width="auto";
			label.htmlFor="gm_autoinsert";
			label.appendChild(cbox);
			label.appendChild(document.createTextNode("ersetzen"));

			myd.appendChild(label);
		}
		


	}

	//- wenn Link auf der "Inbox" oder "Gesendet" Seite angeklickt wurde der ein Nachrichtenfenster einblendet
	function linkclick()
	{
		if (aktiv) window.clearInterval(aktiv);

		//- Timer starten und prüfen ob der Nachrichten Dialog angezeit wird
		aktiv=window.setInterval(function()
		{
			var mb = findTextarea();
			if (mb)
			{
				if (aktiv) window.clearInterval(aktiv);
				insert_sm(mb.parentNode); //- Menüleiste anfügen
			}
		}, 500 );
	}

	//- wenn [Nachricht einblenden/anzeigen] auf der "Inbox" Seite angeklickt wurde
	function linkclick_prop()
	{
		if (aktiv) window.clearInterval(aktiv);

		//- Timer starten und prüfen ob der Nachrichten Dialog angezeit wird
		aktiv=window.setInterval(function()
		{
			//- wir befinden uns auf der Inbox oder Gesendet Seite
			var anker = document.getElementsByTagName('a');
	
			for (i=0; i<anker.length; i++)
			{
				if (!anker[i].isinusebyaddsmily)
				{
					if (anker[i].href.indexOf( "Messages/Reply", 0)!=-1)
					{
						//- Link: "Mehr Optionen" abhören!		
						anker[i].isinusebyaddsmily = true;
						anker[i].addEventListener("click", linkclick, false);
						if (aktiv) window.clearInterval(aktiv);
					}

				}
			}
		}, 500 );
	}



	//--------- MAIN -----------
	if ((document.location.href.indexOf("Messages/WriteMessage",0)!=-1))
	{
		//- es wurde die "Nachricht schreiben" Seite geöffnet
		var mb = document.getElementById("Messages_message");

		if (mb)
		{
			insert_sm(mb.parentNode); //- Menüleiste anfügen
		}
	}
	else
	{
		//- wir befinden uns auf der Inbox oder Gesendet Seite
		var anker = document.getElementsByTagName('a');
	
		for (i=0; i<anker.length; i++)
		{
			if (!anker[i].isinusebyaddsmily)
			{
				if ((anker[i].href.indexOf( "Messages/Reply", 0)!=-1) || (anker[i].href.indexOf( "Messages/ForwardMessage", 0)!=-1) || (anker[i].href.indexOf( "Messages/Inbox", 0)!=-1))
				{
					//- alle relevanten Links "abhoeren"			
					anker[i].isinusebyaddsmily = true;
					anker[i].addEventListener("click", linkclick, false);
				}
				else if ((anker[i].title=="lesen"))
				{
					//-  Link: auf [Inbox] -> [Nachricht anzeigen/einbelenden]
					anker[i].isinusebyaddsmily = true;
					anker[i].addEventListener("click", linkclick_prop, false);
				}
			}
		}
	}

}, false);