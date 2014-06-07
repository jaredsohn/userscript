// ==UserScript==
// @name           schülerVz - addSmiley
// @author	   Thomas Zeugner
// @namespace      www.schülervz.net
// @include http://www.schülervz.net/Messages*
// @include http://www.schuelervz.net/Message*
// ==/UserScript==


addEventListener('load', function(event) 
{
	var aktiv; //- der Handle fuer den Timer
	var cbox; //- der Handel der Checkbox
	var s_file = new Array();	
	var s_code = new Array();
	
	s_file[1]="Img/Smiley/sVZ_Emoticon_21.gif"; s_code[1]="$%&542";	
	s_file[2]="Img/Smiley/sVZ_Emoticon_22.gif"; s_code[2]="$%&832";	
	s_file[3]="Img/Smiley/sVZ_Emoticon_23.gif"; s_code[3]="$%&125";	
	s_file[4]="Img/Smiley/sVZ_Emoticon_24.gif"; s_code[4]="$%&986";	
	s_file[5]="Img/Smiley/sVZ_Emoticon_25.gif"; s_code[5]="$%&923";
	s_file[6]="Img/Smiley/sVZ_Emoticon_26.gif"; s_code[6]="$%&123";	
	s_file[7]="Img/Smiley/sVZ_Emoticon_27.gif"; s_code[7]="$%&965";	
	s_file[8]="Img/Smiley/sVZ_Emoticon_28.gif"; s_code[8]="$%&007";	
	s_file[9]="Img/Smiley/sVZ_Emoticon_29.gif"; s_code[9]="$%&635";	
	s_file[0]="Img/Smiley/sVZ_Emoticon_30.gif"; s_code[0]="$%&064";	
	s_file[11]="Img/Smiley/sVZ_Emoticon_31.gif"; s_code[11]="$%&943";	
	s_file[12]="Img/Smiley/sVZ_Emoticon_32.gif"; s_code[12]="$%&467";	
	s_file[13]="Img/Smiley/sVZ_Emoticon_33.gif"; s_code[13]="$%&489";	
	s_file[14]="Img/Smiley/sVZ_Emoticon_34.gif"; s_code[14]="$%&900";	
	s_file[15]="Img/Smiley/sVZ_Emoticon_35.gif"; s_code[15]="$%&167";	
	s_file[16]="Img/Smiley/sVZ_Emoticon_36.gif"; s_code[16]="$%&672";	
	s_file[17]="Img/Smiley/sVZ_Emoticon_37.gif"; s_code[17]="$%&912";	
	s_file[18]="Img/Smiley/sVZ_Emoticon_38.gif"; s_code[18]="$%&281";	
	s_file[19]="20090126-0/Img/Chat/Emoticons/emoticon_33.gif"; s_code[19]="$%&156";
	s_file[20]="20090126-0/Img/Chat/Emoticons/emoticon_34.gif"; s_code[20]="$%&878";
	s_file[21]="20090126-0/Img/Chat/Emoticons/emoticon_35.gif"; s_code[21]="$%&009";
	s_file[22]="20090126-0/Img/Chat/Emoticons/emoticon_36.gif"; s_code[22]="$%&198";
	s_file[23]="20090126-0/Img/Chat/Emoticons/emoticon_41.gif"; s_code[23]="$%&745";
	s_file[24]="20090126-0/Img/Chat/Emoticons/emoticon_16.gif"; s_code[24]="$%&592";


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

		myd=document.createElement("div");
		myd.className="buttonArea";
		myd.style.fontSize="11px";
		myd.align="left";
	
	    	myd.style.marginTop="10px";
		ob.form.appendChild(myd);
		
		for(i=0; i<s_file.length; i++)
		{
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.innerHTML="<img src='http://static.pe.studivz.net/"+ s_file[i] +"' > ";

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

					for(i=0; i<s_txt.length; i++)
					{
						for(j=0; j< s_txt[i].length; j++ )
						{
							//- alles ersetzen
							//- geht leider mit replace nicht => danke an regex
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
		var t_input = ob.form.getElementsByTagName('input');
		var b_s=false;
		for (i=0; i<t_input.length; i++)
		{
			if((t_input[i].type=="submit") || (t_input[i].type=="button"))
			{

				t_input[i].addEventListener("mousedown", submit_f, false);
				b_s=true;
			}
		}	


	}

	//- wenn Link auf der "Inbox" oder "Gesendet" Seite wurde angeklickt
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
			if ((anker[i].href.indexOf( "Messages/Reply", 0)!=-1) || (anker[i].href.indexOf( "Messages/ForwardMessage", 0)!=-1) || (anker[i].href.indexOf( "Messages/Inbox", 0)!=-1))
			{
				//- alle relevanten Links "abhoeren"
				anker[i].addEventListener("click", linkclick, false);
			}
		}
	}

}, false);