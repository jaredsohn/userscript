// ==UserScript==
// @name    FightScript
// @include   http://www.warofdragons.com/main.php
// ==/UserScript==

[General]
Description=Fight script - v1.21 location change working
BeginHotkey=121
BeginHotkeyMod=0
PauseHotkey=0
PauseHotkeyMod=0
StopHotkey=123
StopHotkeyMod=0
RunOnce=1
EnableWindow=
Enable=1
AutoRun=0
[Repeat]
Type=0
Number=1
[CallBack]
OnSetup=
[Comment]
Content=

[Script]
//location: 0=disabled temple 1=Square of Fire 2=Lost Wastelands
location=2
waittime=7000
fightcount=0
attackyellow=1
attackgreen=1
Delay 5000
Gosub setuplog
VBS ttfile.writeline("going to setup up main vars")
Gosub setupmainvars
//Gosub setuphuntvars
While leave=0
    isdone=0
    While strcolor="00023C"
        VBSCall strcolor=GetPixelColor(hpbarright,hpbartop)
        Delay 3000
    EndWhile 
    VBS ttfile.writeline("right hp bar: " & hpbarright & "hp bar top: " & hpbartop & "color: " & strcolor)
    IfColor hpbarright,hpbartop,6b,0
        //check hp is full
        //Gosub selectenemyrabidhound
        VBS ttfile.writeline("gosub beginsearch. fight number:" & fightcount)
        Gosub beginsearch
    Else 
        VBSCall strcolor=GetPixelColor(hpbarleft+2,hpbartop)
        VBS ttfile.writeline("hpbarleft +2 color is: " & strcolor)
        If strcolor<> "00006B"
            VBS ttfile.writeline("left hp bar +2: " & hpbarleft +2 & "right hp bar: " & hpbarright & "hp bar top: " & hpbartop & "color: " & strcolor)
            VBS ttfile.writeline("going to temple.")
            Gosub gototemple
        EndIf 
        Delay 1000
    EndIf 
    // Delay 1000
EndWhile 
Gosub closelog
msgbox ("script done")
EndScript 
//
Sub usepotion
    IfColor 250,259,100b4,1
        VBS ttfile.writeline("belt 1 check=" & hpbarleft-44 & ",360.  Belt 2=" & hpbarleft-44 & "," & hpbartop+175 &" Belt 3=" & hpbarleft-44 &"," &hpbartop+131)
        IfColor hpbarleft-44,360,ffffff,0
            VBS ttfile.writeline("using 360")
            MoveTo 33,346
            //LeftClick 1
            Delay 1000
            LeftClick 1
            waittime=15000
        Else IfColor hpbarleft-44,hpbartop+175,ffffff,0
            VBS ttfile.writeline("using hpbartop+175")
            MoveTo hpbarleft-55,310
            //LeftClick 1
            Delay 1000
            LeftClick 1
            waittime=15000
        Else IfColor hpbarleft-44,hpbartop+130,ffffff,0
            VBS ttfile.writeline("using hpbartop+130")
            MoveTo 33,257
            //LeftClick 1
            Delay 1000
            LeftClick 1
            waittime=15000
        Else IfColor hpbarleft-44,228,ffffff,0
            VBS ttfile.writeline("using 228")
            MoveTo 33,215
            //LeftClick 1
            Delay 1000
            LeftClick 1
            waittime=15000
        EndIf 
    EndIf 
Return 
//
//
Sub selectenemyrfuryhound
    isdone=0
    ux=250
    uy=250
    enemycolor=""
    Delay 1000
    While uy<huntbottom
        VBSCall FindColorEx(ux,uy,ux+700,uy,"000000",0,1.1,x,y)
        If x>=0
            If attackgreen=1
                VBSCall FindColorEx(x-50,y-50,x+50,y+50,"00FF33",0,0.8,v,w)
                If v>=0
                    VBS ttfile.writeline("Checking good enemy 00FF33")
                    enemycolor="green"
                    Gosub checkifgoodenemy
                EndIf 
                VBSCall FindColorEx(x-50,y-50,x+50,y+50,"00FF66",0,0.8,v,w)
                //      VBS ttfile.writeline("Checking for 00FF66")
                If v>=0
                    VBS ttfile.writeline("Checking good enemy 00FF66")
                    enemycolor="green"
                    Gosub checkifgoodenemy
                EndIf 
                VBSCall FindColorEx(x-50,y-50,x+50,y+50,"00FF00",0,0.8,v,w)
                If v>=0
                    VBS ttfile.writeline("Checking good enemy 00FF00")
                    enemycolor="green"
                    Gosub checkifgoodenemy
                EndIf 
                VBSCall FindColorEx(x-50,y-50,x+50,y+50,"00FF99",0,0.8,v,w)
                If v>=0
                    VBS ttfile.writeline("Checking good enemy 00FF99")
                    enemycolor="green"
                    Gosub checkifgoodenemy
                EndIf 
            EndIf 
            If attackyellow=1
                VBSCall FindColorEx(x-50,y-50,x+50,y+50,"00FFFF",1,1.1,v,w)
                If v>=0 and w>=0
                    enemycolor="yellow"
                    Gosub checkifgoodenemy
                EndIf 
            EndIf 
        EndIf 
        uy=uy+5
    EndWhile 
    If found=0
        Gosub nextcompass
    Else 
    EndIf 
    VBS ttfile.writeline("Return from selectenemyrfuryhound")
Return 
//
Sub doattack
    VBS ttfile.writeline("starting attack")
    MoveTo 405,209
    Delay 2000
    VBS ttfile.writeline("checking for passive")
    VBSCall FindColorEx(812,227,883,235,"00FF66",1,0.3,x,y)
    If x<0 and y<0
        VBSCall FindColorEx(812,227,883,235,"00FF99",1,0.3,x,y)
        If x<0 and y<0
            VBSCall FindColorEx(812,227,883,235,"00FF00",1,0.3,x,y)
            If x<0 and y<0
                VBSCall FindColorEx(812,227,883,235,"00FFFF",1,1.1,x,y)
                If x<0 and y<0
                    VBS ttfile.writeline("green passive or yellow calm not in selected")
                    Goto beginsearch
                EndIf 
            EndIf 
        EndIf 
    EndIf 
    VBS ttfile.writeline("checled for passive, it is there.")
    IfColor 412,213,798694,0
        VBS ttfile.writeline("412,213 colour 798694 is present")
        Goto beginsearch
    Else 
        VBS ttfile.writeline("clicking attack")
        LeftClick 1
    EndIf 
    VBS ttfile.writeline("we should have clicked attack or gone to beginsearch by now")
    Delay 10000
    IfColor 403,409,f9f9f9,0
        VBS ttfile.writeline("clicking on block")
        MoveTo 354,404
        LeftClick 1
        Delay 1000
    EndIf 
    //
    VBS ttfile.writeline("starting the moves in battle")
    //
    Rem attack
    fightdone=0
    //if players hp less then half
    //if not victory or defeat colour
    While fightdone=0
        IfColor 97,141,6b,1
            Gosub usepotion
            VBS ttfile.writeline("emergancy potion")
        EndIf 
        IfColor 124,142,d9,1
            VBS ttfile.writeline("player hp low")
            // IfColor 114,146,98,1		half hp
            //check if enemy still has more than 25% hp
            IfColor 567,219,9b,0
                VBS ttfile.writeline("enemy hp high")
                //If enemy has more than 25% hp, use potion
                Gosub usepotion
            EndIf 
        EndIf 
        IfColor 491,410,7a,1
            IfColor 403,409,"F9F9F9",0
                Delay waittime
                Gosub domoves
            Else 
                Delay 1000
            EndIf 
            //Goto attack
        Else 
            fightdone=1
            VBS ttfile.writeline("fightdone=1")
        EndIf 
    EndWhile 
    Gosub fightover
    VBS ttfile.writeline("returning from doattack")
Return 
//
//
Sub domoves
    If enemycolor="green"
        If attackmove=0
            MoveTo 459,413
            LeftClick 1
            attackmove=1
        ElseIf attackmove=1
            MoveTo 434,456
            LeftClick 1
            //Delay waittime
            attackmove=2
        ElseIf attackmove=2
            MoveTo 434,456
            LeftClick 1
            //Delay waittime
            attackmove=0
        EndIf 
    ElseIf enemycolor="yellow"
        If attackmove=0
            MoveTo 431,357
            LeftClick 1
            //Delay waittime
            attackmove=1
        ElseIf attackmove=1
            MoveTo 459,413
            LeftClick 1
            //Delay waittime
            attackmove=0
        EndIf 
    EndIf 
Return 
//
//
Sub fightover
    isdone=0
    While isdone=0
        Rem fightover
        Delay 4000
        //click close on victory
        MoveTo 471,411
        LeftClick 1
        Delay 2000
        VBSCall strcolor=GetPixelColor(hpbarleft+2,hpbartop)
        VBS ttfile.writeline("hpbarleft +2 color is: " & strcolor)
        If strcolor<> "00006B"
            VBS ttfile.writeline("left hp bar +2: " & hpbarleft +2 & "right hp bar: " & hpbarright & "hp bar top: " & hpbartop & "color: " & strcolor)
            VBS ttfile.writeline("going to temple... from fightover")
            isdone=1
            Gosub gototemple
            Goto endoffightover
        EndIf 
        //if Team 1 red background exists
        Delay 2000
        IfColor 393,222,a0,0
            //if belt 4 is empty, then
            Delay 1000
            IfColor 43,360,ffffff,1
                strcolor=""
                VBS ttfile.writeline("Restocking potions")
                isdone=1
                Gosub restockbelt
                VBS ttfile.writeline("Restock potions done")
                Goto beginsearch
                Goto endoffightover
            Else 
                MoveTo 635,381
                //click on hunt
                //Delay 2000
                LeftClick 1
                Delay 2000
                isdone=1
                Goto endoffightover
                Goto beginsearch
            EndIf 
        EndIf 
        Delay 1000
        VBS ttfile.writeline("loop to fightover. isdone=" & isdone)
        If isdone=0
            Goto fightover
        EndIf 
    EndIf 
    IfColor 555,349,f3,0
        isdone=1
    EndIf 
    Rem endoffightover
EndWhile 
VBS ttfile.writeline("Returnig from fightover")
Return 
//
//
Sub restockbelt
    loopcount=0
    //click on backpack
    MoveTo 626,356
    LeftClick 1
    Delay 1000
    //click on equip potion
    While strcolor<>"4A5C95"
        VBSCall strcolor=GetPixelColor(512,250)
        IfColor 536,190,bae1ff,0
            MoveTo 435,132
            LeftClick 1
            Delay 500
            MoveTo 492,147
            LeftClick 1
            Delay 1000
        EndIf 
        Delay 1000
        loopcount=loopcount+1
        If loopcount>=30
            Goto beginsearch
        EndIf 
    EndWhile 
    For 1
        IfColor 43,357,ffffff,1
            VBSCall FindColorEx(455,270,883,330,"00CF36",0,0.3,x,y)
            VBS ttfile.writeline("looking for scroll")
            If x>=0
                //    IfColor 489,302,10077,0
                MoveTo x+20, y-18
                LeftClick 1
                Delay 1000
                VBS ttfile.writeline("added potion")
                While strcolor<>"4A5C95"
                    Delay 1000
                    VBSCall strcolor=GetPixelColor(512,250)
                EndWhile 
            EndIf 
        EndIf 
    EndFor 
    VBS ttfile.writeline("returning from belt")
    isdone=1
    fightcount=fightcount+1
Return 
//
//
Sub gototemple
    MoveTo bearx-60,hpbartop
    LeftClick 1
    Delay 2000
    //to/from square of fire
    If location=1
        MoveTo 1051,226
        LeftClick 1
        Delay 4000
        MoveTo 1051,266
        LeftClick 1
        Delay 10000
        MoveTo 643,641
        LeftClick 1
        Delay 2000
        MoveTo 1029,245
        LeftClick 1
        Delay 2000
    EndIf 
    //to/from lost wastelands
    If location=2
        VBS ttfile.writeline("Going to temple from Lost Wastelands")
        //go TO the city
        //menu pos 2 settlement of angukhon
        MoveTo 1051,247
        LeftClick 1
        Delay 6000
        //menu pos 2 settlement of Faytir
        MoveTo 1051,247
        LeftClick 1
        Delay 6000
        //menu pos 2 City gates
        MoveTo 1051,247
        LeftClick 1
        Delay 6000
        MoveTo 1051,266
        LeftClick 1
        Delay 10000
        MoveTo 643,641
        LeftClick 1
        Delay 2000
        VBS ttfile.writeline("Going to Lost Wastelands from temple ")
        //go back from FROM the city
        //menu pos 1 city gates
        MoveTo 1051,223
        LeftClick 1
        Delay 18000
        //menu pos 1 settlement of angukhon
        MoveTo 1051,223
        LeftClick 1
        Delay 18000
        //menu pos 1 lost wastelands
        MoveTo 1051,223
        LeftClick 1
    EndIf 
Return 
//
Sub nextcompass
    If compasspoint=0
        MoveTo compasscentrex+25,compasscentrey
        LeftClick 1
        Delay 1000
        //north
        compasspoint=1
        Goto donecompass
    ElseIf compasspoint=1
        MoveTo compasscentrex,compasscentrey+20
        LeftClick 1
        Delay 1000
        //east
        compasspoint=2
        Goto donecompass
    ElseIf compasspoint=2
        MoveTo compasscentrex-25,compasscentrey
        LeftClick 1
        Delay 1000
        //south
        compasspoint=3
        Goto donecompass
    ElseIf compasspoint=3
        MoveTo compasscentrex,compasscentrey-20
        LeftClick 1
        Delay 1000
        //west
        compasspoint=0
        Goto donecompass
    EndIf 
    Rem donecompass
Return 
//
//
Sub checkifgoodenemy
    If attackyellow=0
        VBSCall FindColorEx(x-40,y-40,x+40,y+40,"00FFFF",1,1.1,t,u)
        If t>=0 and u>=0
            VBS ttfile.writeline("bad enemy 00FFFF")
            Goto checkdone
        EndIf 
    EndIf 
    VBSCall FindColorEx(x-100,y-100,x+100,y+100,"0099FF",1,1.1,t,u)
    If t>=0 and u>=0
        VBS ttfile.writeline("bad enemy 0099FF")
        Goto checkdone
    EndIf 
    VBSCall FindColorEx(x-100,y-100,x+100,y+100,"00BEFF",1,1.1,t,u)
    If t>=0 and u>=0
        VBS ttfile.writeline("bad enemy 00BEFF")
        Goto checkdone
    EndIf 
    VBSCall FindColorEx(x-100,y-100,x+100,y+100,"0080FF",1,1.1,t,u)
    If t>=0 and u>=0
        VBS ttfile.writeline("bad enemy 0080FF")
        Goto checkdone
    EndIf 
    VBS ttfile.writeline("good enemy, clicking")
    If v<gamecentre
        VBS ttfile.writeline("enemy on left x="& x & " y=" & y & "v =" &v &"w=" &w)
        MoveTo v-10,w-20
        LeftClick 1
        MoveTo v+25,w-20
        LeftClick 1
    Else 
        VBS ttfile.writeline("enemy on left x="& x & " y=" & y & "v =" &v &"w=" &w)
        MoveTo v+5,w-20
        LeftClick 1
        Delay 1000
        MoveTo v+25,w-20
        LeftClick 1
        Delay 1000
    EndIf 
    VBS ttfile.writeline("gosub doattack")
    Gosub doattack
    //msgbox("found enemy")
    Delay 1000
    found=1
    y=huntbottom
    Goto checkdone
    //below is unused at present
    ux=x
    uy=y
    Delay 1000
    VBSCall FindColorEx(x-50,y-50,x+50,y+50,"0099FF",0,0.3,t,u)
    If t>=0
        Goto checkdone
    EndIf 
    VBSCall FindColorEx(x-50,y-50,x+50,y+50,"00ADFF",0,0.3,t,u)
    If t>=0
        Goto checkdone
    Else 
    EndIf 
    u=u+5
    If found=0
    Else 
    EndIf 
    //using from here
    Rem checkdone
Return 
//
//
Sub setuplog
    VBS Dim fso
    VBS const Ttxt="fightmacro.log"
    VBS set fso=CreateObject("Scripting.FileSystemObject")
    VBS const forreading=1
    VBS const forwriting=2
    VBS const forappending=8
    VBS costfile=fso.FileExists(Ttxt)
    //whether delete.bat file exists
    If 0=costfile
        //no, make a delete.bat file
        VBS set ttfile=fso.createtextfile(Ttxt,false)
    EndIf 
    //write delete.bat file
    VBS set fso=CreateObject("Scripting.FileSystemObject")
    VBS set ttfile=fso.opentextfile(Ttxt,forappending)
    VBS ttfile.writeline("Log File for Fight Macro")
Return 
Sub closelog
    VBS ttfile.writeline("End of log")
    VBS ttfile.Close
Return 
//
Sub beginsearch
    Rem beginsearch
    If mainsetupdone=0
        Gosub setupmainvars
    EndIf 
    leave=0
    found=0
    //  Delay 2000
    //msgbox (gamecentre-45 & huntwindowtop -40)
    //VBS ttfile.writeline("Line 62: " & "Game Centre -50: " & gamecentre-50 & " hunt window top -55: " & huntwindowtop-55 & "Hunt window top" & huntwindowtop)
    VBSCall FindColorEx(gamecentre-43,huntwindowtop-40,gamecentre-38,huntwindowtop-30,"0000B6",1,0.8,x,y)
    VBS ttfile.writeline("checking for compass:  coords:" & gamecentre-43 & " ," & huntwindowtop-40 & "to : " & gamecentre -38 & "," & huntwindowtop-30)
    If x<0
        //   msgbox ("compass not found")
        //Delay 1000
        //MoveTo gamecentre-175,hpbartop+10
        VBSCall strcolor=GetPixelColor(gamecentre-175,hpbartop+10)
        //msgbox (strcolor)
        // VBS ttfile.writeline("Game Centre -180: " & gamecentre-180 & " hp bar top: " & hpbartop & gamecentre-170 & hpbartop+10 & "aae6ff")
        VBS ttfile.writeline("firstcheck: " & strcolor & "at corrds: " & gamecentre-175 & "," & hpbartop+10 & "Color is: " & strcolor)
        If strcolor<>"7CA8D0"
            colorfound=0
            VBS ttfile.writeline("colour 7CA8D0 was not found")
            If strcolor="070E17"
                colorfound=0
                VBS ttfile.writeline("colour 7CA8D0 was not found, but found 070E17")
            Else 
                colorfound=1
            EndIf 
        Else 
            colorfound=1
        EndIf 
        If colorfound=0
            //VBSCall FindColorEx(gamecentre-180,hpbartop,gamecentre-170,hpbartop+20,"0000A7",1,.3.1,x,y)
            //    VBS ttfile.writeline("checking character portrait:  coords:" & gamecentre-180 & " ," & hpbartop & "to : " & gamecentre -170& "," & hpbartop+20)
            VBS ttfile.writeline("character portrait.. gamecentre-210,hpbartop.  coorrds: " & gamecentre-210 & "," & hpbartop)
            MoveTo gamecentre-210,hpbartop
            LeftClick 1
            Delay 1000
            VBSCall strcolor=GetPixelColor(gamecentre-170,hpbartop+10)
            VBS ttfile.writeline("after click: " & strcolor)
            Delay waittime
            Goto beginsearch
        Else 
            If mainsetupdone=0
                VBS ttfile.writeline("clicking on location.  coorrds: " & bearx -60 & "," & hpbartop)
                MoveTo bearx-60,hpbartop
                LeftClick 1
                Delay waittime
                Gosub setupmainvars
                Delay waittime
                VBS ttfile.writeline("line 80: main setup: " & mainsetupdone)
                Goto beginsearch
            EndIf 
            If huntvarsdone=0
                VBS ttfile.writeline("line 82: entering huntvars")
                Gosub setuphuntvars
                Delay 1000
                VBS ttfile.writeline("line 80: huntvarsdone: " & huntvarsdone)
            EndIf 
            VBS ttfile.writeline("clicking on bear.  coorrds: " & bearx & "," & hpbartop)
            MoveTo bearx,hpbartop
            LeftClick 1
            Delay 2000
            VBSCall strcolor=GetPixelColor(113,192)
            VBS ttfile.writeline("checking if page has loaded. color at 113,192 is " & strcolor)
            While strcolor="ffffff"
                VBS ttfile.writeline("waiting to load page")
                Delay 3000
            EndWhile 
            Delay 5000
            Goto beginsearch
        EndIf 
    Else 
        compasscentrex=x
        compasscentrey=y
        //Gosub searchenemy
        Gosub selectenemyrfuryhound
    EndIf 
    VBS ttfile.writeline("returning from beginsearch")
Return 
// all below completed and working at both computers
Sub setuphuntvars
    VBS ttfile.writeline("line 100: Setting up hunting vars")
    VBSCall FindColorEx(0,0,1024,768,"72ADC4",0,1.1,x,y)
    If x>=0
        huntleftside=x
        huntrightside=leftside+770
        huntwindowtop=y
        VBSCall FindColorEx(huntleftside,huntwindowtop+200,1280,1024,"5E81CF",0,1.1,x,y)
        If x>=0
            huntbottom=y
            huntvarsdone=1
        EndIf 
        VBS ttfile.writeline("Line 102: left hunt side: " & huntleftside & "huntrightside: " & huntrightside & "huntwindowtop: " & huntwindowtop & "Hunt bottom: " & huntbottom)
    Else 
        VBS ttfile.writeline("Setup of vars failed")
    EndIf 
Return 
Sub setupmainvars
    crafting=0
    // first check if in location, second in hunt
    VBSCall FindColorEx(0,0,300,500,"87CDF9",0,1.1,x,y)
    If x<0
        VBSCall FindColorEx(0,0,300,500,"BEEEF4",0,1.1,x,y)
        If x>=0
            mainsetupdone=1
        EndIf 
    Else 
        mainsetupdone=0
        rightside=x+770
    EndIf 
    leftside=x
    If mainsetupdone=1
        VBSCall FindColorEx(0,0,1280,1024,"92D0DB",1,1.1,x,y)
        If x>=0
            rightside=x
        EndIf 
    EndIf 
    mainwindowtop=y
    VBSCall FindColorEx(0,0,1024,768,"6C9BD4",1,1.1,x,y)
    bottom=y
    Option Explicit
    VBSCall FindColorEx(0,0,500,mainwindowtop,"00006B",0,1.1,x,y)
    hpbartop=y
    hpbarright=x
    VBSCall FindColorEx(0,hpbartop,hpbarright,hpbartop,"0A102A",1,1.1,x,y)
    hpbarleft=x
    hpbarright=hpbarleft+60
    hpbarlength=hpbarright-hpbarleft+1
    VBSCall FindColorEx(0,0,1024,mainwindowtop,"7AA9ED",1,1.1,x,y)
    Delay 1000
    gamecentre=((rightside-leftside)/2)+leftside
    bearx=gamecentre+155
    VBSCall strcolor=GetPixelColor(bearx,hpbartop)
    bearcolor=strcolor
    VBS ttfile.writeline("HP bar left: "& hpbarleft &" Hp Bar top: "&hpbartop & "Hp Bar right: " & hpbarright & "gamecentre: " &gamecentre)
Return 