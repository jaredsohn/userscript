

// ==UserScript==
// @name           joe87
// @version        09.08.13
// ==/UserScript==
'version 2.2.6
'Fixed bug to handle new UI changes
'Added retries on Play by Play where the server did not respond fast enough

Option Explicit

'Please Modify these settings for your team
'Const Language="English"
Const Language_Override=""


'Change this to your team if you are not running via commandline
Const TeamID_Override=3377

'This setting is now an override for global vars... the vars default to the same directory as the vbscript
Const LogName_Override=""
Const GamePlanName_Override=""
Const GamePlanNameDef_Override=""
Const PlayByPlayOffLog_Override=""
Const PlayByPlayDefLog_Override=""

'Don't change these 
Const WinHttpRequestOption_EnableRedirects= 6  'used for HTTP Object
Const ForReading = 1, ForWriting = 2 'used for File System Object
Const ForAppending = 8 'used for File System Object
Const GLB_FQDN = "http://goallineblitz.com"
Const GlobalPad = "."


'*********************** Get Home Pages ************************
Sub GetTeamPages(sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName)
    WriteToFile LogName, "GetTeamBreakDown: Begin"

    Dim sURL, sElement, nLastLocation, sTeam_Record, sOpp_Record
    
    
    'Get Team Page
    sURL = GLB_FQDN & "/game/team.pl?team_id=" & TeamID
    sTeam_Page = HTTPGet(0,sURL,sSession)

    'Get Opponent Page
    sURL = GLB_FQDN & "/game/team.pl?team_id=" & OpponentID
    sOpp_Page = HTTPGet(0,sURL,sSession)



    ' Get Team Name
    'sElement =  "<div id=""team_name"" class=""large_title_bar"">"
    sElement = "<div class=""big_head subhead_head"">"
    nLastLocation = 1
    'sTeamName = GetElement(sTeam_Page, sElement, "<", nLastLocation)
    sTeamName = GetElement(sTeam_Page, sElement, vbcrlf, nLastLocation)
    if right(sTeamName,1) = "(" then sTeamName=Left(sTeamName,Len(sTeamName)-1)
    'sTeamName = Replace(sTeamName,"&#39;","'")

    ' Get Team Record 
    sElement =  "<div id=""team_record""><b>Record</b>:"
    nLastLocation = 1
    sTeam_Record = GetElement(sTeam_Page, sElement, "<", nLastLocation)
       

    ' Get Opponent Name
    'sElement =  "<div id=""team_name"" class=""large_title_bar"" >"
    sElement = "<div class=""big_head subhead_head"">"
    nLastLocation = 1
    'sOppName = GetElement(sOpp_Page, sElement, "<", nLastLocation)
    sOppName = GetElement(sOpp_Page, sElement, vbcrlf, nLastLocation)
    if right(sOppName,1) = "(" then sOppName=Left(sOppName,Len(sOppName)-1)
    'sOppName = Replace(sOppName,"&#39;","'")

    ' Get Opponent Record 
    sElement =  "<div id=""team_record""><b>Record</b>:"
    nLastLocation = 1
    sOpp_Record = GetElement(sOpp_Page, sElement, "<", nLastLocation)

    ' Write to Game Plan team information
    WriteToFile GamePlanName, "[b]" & sTeamName & sTeam_Record & " vs. " & sOppName & sOpp_Record & "[/b]"
   
    WriteToFile LogName, "GetTeamBreakDown: End"
End Sub


'*********************** Get Team Matchup ************************
Sub GetTeamMatchup(sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName)
    WriteToFile LogName, "GetTeamMatchup: Begin"

    Dim nLastLocation, sMatchupURL, sElement, sMatchupPage, sOutput
    Dim sRatingTable, nLocationOfTable, aRatings, sRating, x
    Dim nTeam_Passing, nTeam_Overall, nTeam_Receiving, nTeam_Rushing, nTeam_Blocking, nTeam_PassDef, nTeam_RushDef, nTeam_Kicking
    Dim nOpp_Passing, nOpp_Overall, nOpp_Receiving, nOpp_Rushing, nOpp_Blocking, nOpp_PassDef, nOpp_RushDef, nOpp_Kicking
    
    
     WriteToFile LogName, "!!!!!!!!!!!!! " & sOppName & " team_id=" & OpponentID 
    
    sMatchupURL = "game/compare_teams.pl?team1=" & TeamID & "&team2=" & OpponentID
    sMatchupPage = HTTPGet(0,GLB_FQDN & "/" & sMatchupURL, sSession)
        
    WriteToFile LogName, "***************** Found " & sMatchupURL

    'Get Team Ratings Table
    nLastLocation = 1
    sElement =  "<div class=""medium_head"">"
    sRatingTable = GetElement(sMatchupPage, sElement, sElement, nLastLocation)
    nLocationOfTable = nLastLocation
    'Parse into Array
    aRatings = split(sRatingTable, "<div class=""rating_bar"">")
    
    WriteToFile LogName, "**** Parse Team 1 ****"
    For x = 0 to UBound(aRatings)
           
        if x > 0 then
            nLastLocation = 1
            sRating = GetElement(aRatings(x), ">", "<", nLastLocation)
            if x = 1 then 'Overall
                nTeam_Overall = sRating
            elseif x = 2 then 'Passing
                nTeam_Passing = sRating
            elseif x = 3 then 'Receiving
                nTeam_Receiving = sRating
            elseif x = 4 then 'Rushing
                nTeam_Rushing = sRating
            elseif x = 5 then 'Blocking
                nTeam_Blocking = sRating
            elseif x = 6 then 'Pass Defense
                nTeam_PassDef = sRating
            elseif x = 7 then 'Rush Defense
                nTeam_RushDef = sRating
            elseif x = 8 then 'Kicking
                nTeam_Kicking = sRating
            end if
        end if
    Next

    'Get Opponent Ratings Table
    nLastLocation = nLocationOfTable + LEN(sRatingTable) + 1
    sElement =  "<div class=""medium_head"">"
    sRatingTable = GetElement(sMatchupPage, sElement, sElement, nLastLocation)
    nLocationOfTable = nLastLocation
    'Parse into Array
    aRatings = split(sRatingTable, "<div class=""rating_bar"">")
        
    WriteToFile LogName, "**** Parse Team 2 ****"
    For x = 0 to UBound(aRatings)
            
        if x > 0 then
            nLastLocation = 1
            sRating = GetElement(aRatings(x), ">", "<", nLastLocation)
            if x = 1 then 'Overall
                nOpp_Overall = sRating
            elseif x = 2 then 'Passing
                nOpp_Passing = sRating
            elseif x = 3 then 'Receiving
                nOpp_Receiving = sRating
            elseif x = 4 then 'Rushing
                nOpp_Rushing = sRating
            elseif x = 5 then 'Blocking
                nOpp_Blocking = sRating
            elseif x = 6 then 'Pass Defense
                nOpp_PassDef = sRating
            elseif x = 7 then 'Rush Defense
                nOpp_RushDef = sRating
            elseif x = 8 then 'Kicking
                nOpp_Kicking = sRating
            end if
        end if
    Next

    sOutput = sTeamName & "Overall: " & nTeam_Overall & " vs. " & sOppName & "Overall (Opp): " & nOpp_Overall
    sOutput = sOutput & vbCRLF & Padding("Passing",20,GlobalPad) & nTeam_Passing & " vs. " & Padding("Pass Defense (Opp)",20,GlobalPad) & nOpp_PassDef
    sOutput = sOutput & vbCRLF & Padding("Receiving",20,GlobalPad) & nTeam_Receiving & " vs. " & Padding("Pass Defense (Opp)",20,GlobalPad) & nOpp_PassDef
    sOutput = sOutput & vbCRLF & Padding("Rushing",20,GlobalPad) & nTeam_Rushing & " vs. " & Padding("Rush Defense (Opp)",20,GlobalPad) & nOpp_RushDef
    sOutput = sOutput & vbCRLF & Padding("Blocking",20,GlobalPad) & nTeam_Blocking & " vs. " & Padding("Rush Defense (Opp)",20,GlobalPad) & nOpp_RushDef
    sOutput = sOutput & vbCRLF & Padding("Kicking",20,GlobalPad) & nTeam_Kicking & " vs. " & Padding("Kicking (Opp)",20,GlobalPad) & nOpp_Kicking
    sOutput = sOutput & vbCRLF & Padding("Pass Defense",20,GlobalPad) & nTeam_PassDef & " vs. " & Padding("Passing (Opp)",20,GlobalPad) & nOpp_Passing
    sOutput = sOutput & vbCRLF & Padding("Pass Defense",20,GlobalPad) & nTeam_PassDef & " vs. " & Padding("Receiving (Opp)",20,GlobalPad) & nOpp_Receiving
    sOutput = sOutput & vbCRLF & Padding("Rush Defense",20,GlobalPad) & nTeam_RushDef & " vs. " & Padding("Rushing (Opp)",20,GlobalPad) & nOpp_Rushing
    sOutput = sOutput & vbCRLF & Padding("Rush Defense",20,GlobalPad) & nTeam_RushDef & " vs. " & Padding("Blocking (Opp)",20,GlobalPad) & nOpp_Blocking
                
    
    ' Write to Game Plan team information
    WriteToFile GamePlanName, vbCRLF & "[b]******************* GLB Matchup **************[/b]" & vbCRLF
    WriteToFile GamePlanName, sOutput
    
    WriteToFile LogName, "GetTeamMatchup: End"
End Sub

'*********************** Get Team Averages ************************
Function GetTeamAverage(sSession, sID)
    WriteToFile LogName, "GetTeamAverage: Begin"

    Dim nTeamPlayerLevel, nTeamPlayerCount, nPlayerLvL, sMatchupPage, sRosterPage, sURL, aPlayers, sPosition, x, nLevel
    Dim nTeam_OLine, nTeam_DLine, nTeam_WR, nTeam_DB, nTeam_RB, nTeam_LB, nTeam_QB, nTeam_ST, nTeam_QB_Count, nTeam_ST_Count
    Dim nTeam_RB_Count, nTeam_WR_Count, nTeam_OLine_Count, nTeam_DLine_Count, nTeam_DB_Count, nTeam_LB_Count

    nTeam_QB = 0
    nTeam_RB_Count = 0
    nTeam_RB = 0
    nTeam_RB_Count = 0
    nTeam_WR = 0
    nTeam_WR_Count = 0
    nTeam_OLine = 0
    nTeam_OLine_Count = 0
    nTeam_DLine = 0
    nTeam_DLine_Count = 0
    nTeam_LB = 0
    nTeam_LB_Count = 0
    nTeam_DB = 0
    nTeam_DB_Count = 0
    nTeam_ST = 0
    nTeam_ST_Count = 0
    
    sURL = GLB_FQDN & "/game/roster.pl?team_id=" & sID
    sRosterPage = HTTPGet(0,sURL, sSession)
    
    aPlayers = split(sRosterPage,"alternating_color")

    'WriteToFile LogName, "Get Team Average after split"

    For x = 1 to UBound(aPlayers)
    
        'WriteToFile LogName, "Loop - " & x '& vbcrlf & aPlayers(x) & vbcrlf & "***"
        
        if instr(1, aPlayers(x), "<td class=""player_position"">")>1 then
            
            sPosition = GetElement(aPlayers(x), "<td class=""player_position"">", "</td>", 1)
        
            'WriteToFile LogName, "*** Position ***" & vbcrlf & sPosition & vbcrlf & "***"
            
            sPosition = GetElement(sPosition, ">", "<", 1)
    
            nLevel = GetElement(aPlayers(x), "<td class=""player_level"">", "</td>", 1)
            
            'WriteToFile LogName, "Got level" 
            
            WriteToFile LogName, "*" & sPosition & "* *" & nLevel & "*"
            
            if sPosition = "QB" then 'QB
                nTeam_QB = nTeam_QB + nLevel
                nTeam_QB_Count = nTeam_QB_Count + 1
            elseif sPosition = "HB" or sPosition = "FB" then 'HB/FB
                nTeam_RB = nTeam_RB + nLevel
                nTeam_RB_Count = nTeam_RB_Count + 1
            elseif Left(sPosition,1) = "W" or sPosition = "TE" then 'WR/TE
                nTeam_WR = nTeam_WR + nLevel
                nTeam_WR_Count = nTeam_WR_Count + 1
            elseif Right(sPosition,1) = "C" or Right(sPosition,1) = "T" or Right(sPosition,1) = "G"  then 'ROT, LOT, C, LG, RG
                nTeam_OLine = nTeam_OLine + nLevel
                nTeam_OLine_Count = nTeam_OLine_Count + 1
            elseif right(sPosition,1) = "E" or  right(sPosition,1) = "T" then 'DE/DT
                nTeam_DLine = nTeam_DLine + nLevel
                nTeam_DLine_Count = nTeam_DLine_Count + 1
            elseif right(sPosition,2) = "LB" then 'LB
                nTeam_LB = nTeam_LB + nLevel
                nTeam_LB_Count = nTeam_LB_Count + 1
            elseif Left(sPosition,2) = "CB" or sPosition = "SS" or sPosition = "FS"  then 'CB/SS/FS
                nTeam_DB = nTeam_DB + nLevel
                nTeam_DB_Count = nTeam_DB_Count + 1
            elseif sPosition = "K" or sPosition = "P" then 'K/P
                nTeam_ST = nTeam_ST + nLevel
                nTeam_ST_Count = nTeam_ST_Count + 1
            end if
        
        else
            'WriteToFile LogName, "*** Not a player " & vbcrlf & aPlayers(x) & vbcrlf & "***"
        
        end if

    Next    
        
    nTeamPlayerCount = nTeam_QB_Count + nTeam_RB_Count + nTeam_WR_Count + nTeam_OLine_Count + _
                        nTeam_DLine_Count + nTeam_LB_Count + nTeam_DB_Count + nTeam_ST_Count
    
    nTeamPlayerLevel = nTeam_QB + nTeam_RB + nTeam_WR + nTeam_OLine + nTeam_DLine + _
                        nTeam_LB + nTeam_DB + nTeam_ST
    
    GetTeamAverage = cINT(nTeamPlayerLevel/nTeamPlayerCount)
    
    WriteToFile LogName, "GetTeamAverage: End"
End Function


'*********************** Get Team Players ************************
Sub GetTeamPlayers(sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName)
    WriteToFile LogName, "GetTeamPlayers: Begin"

    Dim sPlayerTable, aPlayer, x, sPlayer, sLevel, nLevel, sElement, nLastLocation, nLocationOfTable
    Dim nTeam_OLine, nTeam_DLine, nTeam_WR, nTeam_DB, nTeam_RB, nTeam_LB
    Dim nOpp_OLine, nOpp_DLine, nOpp_WR, nOpp_DB, nOpp_RB, nOpp_LB, b4_3, sPosition, sOutput
    Dim nTeam_RB_Count, nTeam_WR_Count, nTeam_OLine_Count, nTeam_DLine_Count, nTeam_DB_Count, nTeam_LB_Count
    Dim nOpp_RB_Count, nOpp_WR_Count, nOpp_OLine_Count, nOpp_DLine_Count, nOpp_DB_Count, nOpp_LB_Count, sTeam_Average, sOpp_Average

    'reset counters
    nTeam_OLine = 0 
    nTeam_DLine = 0 
    nTeam_WR = 0 
    nTeam_DB = 0
    nTeam_RB = 0
    nTeam_LB = 0
    nTeam_RB_Count = 0
    nTeam_WR_Count = 0
    nTeam_OLine_Count = 0
    nTeam_DLine_Count = 0
    nTeam_LB_Count = 0
    nTeam_DB_Count = 0
    nOpp_OLine = 0 
    nOpp_DLine = 0 
    nOpp_WR = 0 
    nOpp_DB = 0 
    nOpp_RB = 0
    nOpp_LB = 0
    nOpp_RB_Count = 0
    nOpp_WR_Count = 0
    nOpp_OLine_Count = 0
    nOpp_DLine_Count = 0
    nOpp_LB_Count = 0
    nOpp_DB_Count = 0


    sOutput = vbCRLF & "[b]Starting Lineup for: " & sTeamName & "[/b]" & vbCRLF

    '*** TEAM SECTION FIRST ***
    ' Get Offensive Players Table

    nLastLocation = 1
    sElement =  "<table class=""lineup_table"" cellspacing=""0"" cellpadding=""0"">"
    sPlayerTable = GetElement(sTeam_Page, sElement, "</table>", nLastLocation)
    nLocationOfTable = nLastLocation
    'Parse into Array
    aPlayer = split(sPlayerTable, "<a href=""/game/player.pl?player_id=")
    
    'WriteToFile LogName, "-- 1 GP --" & VBCRLF & sOutput & VBCRLF & "-- 1 GP --"
    
    For x = 0 to UBound(aPlayer)
        
        'WriteToFile LogName, aPlayer(x)
        if x > 0 then
            nLastLocation = 1
            sPlayer = GetElement(aPlayer(x), ">", "<", nLastLocation)

            sLevel = GetElement(aPlayer(x), ">", "<", nLastLocation + 1)
            sLevel = GetElement(aPlayer(x), ">", "<", nLastLocation + 1)

            'WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "*"

            'added for the case of "trade pending"
            if Right(sLevel,1) = " " Then sLevel = Left(sLevel,Len(sLevel)-1)
            
            sLevel = mid(sLevel,7,len(sLevel)- 7)
            nLevel = cINT(sLevel)
            
            sPosition = GetElement(aPlayer(x-1),"<td class=""lineup_position"">","</td>",1)
            sPosition = GetElement(sPosition,">","<",1)
            
            WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "* *" & sPosition & "*"
            
            if sPosition = "HB" or sPosition = "FB" then 'HB/FB
                nTeam_RB = nTeam_RB + nLevel
                nTeam_RB_Count = nTeam_RB_Count + 1
            elseif Left(sPosition,1) = "W" or sPosition = "TE" then 'WR/TE
                nTeam_WR = nTeam_WR + nLevel
                nTeam_WR_Count = nTeam_WR_Count + 1
            elseif Right(sPosition,1) = "C" or Right(sPosition,1) = "T" or Right(sPosition,1) = "G"  then 'ROT, LOT, C, LG, RG
                nTeam_OLine = nTeam_OLine + nLevel
                nTeam_OLine_Count = nTeam_OLine_Count + 1
            end if
            
            sOutput = sOutput & vbCRLF & Padding(sPosition, 8, GlobalPad) & "(" & sLevel & ") " & sPlayer 

        end if
  
    Next

    WriteToFile LogName, "-- 2 GP --" & VBCRLF & sOutput & VBCRLF & "-- 2 GP --"

    ' Get Special Teams Players Table so we know to skip
    nLastLocation = nLocationOfTable + 1 
    sElement =  "<table class=""lineup_table"" cellspacing=""0"" cellpadding=""0"">"
    sPlayerTable = GetElement(sTeam_Page, sElement, "</table>", nLastLocation)
    nLocationOfTable = nLastLocation
    
    'Get Defensive Player Tables
    nLastLocation = nLocationOfTable + 1 
    sElement =  "<table class=""lineup_table"" cellspacing=""0"" cellpadding=""0"">"
    sPlayerTable = GetElement(sTeam_Page, sElement, "</table>", nLastLocation)
    nLocationOfTable = nLastLocation

    'Parse into Array
    aPlayer = split(sPlayerTable, "<a href=""/game/player.pl?player_id=")
    
    
    b4_3 = True
    
    For x= 0 to UBound(aPlayer)
        
        'WriteToFile LogName, aPlayer(x)
        if x > 0 then
            nLastLocation = 1
            sPlayer = GetElement(aPlayer(x), ">", "<", nLastLocation)
            sLevel = GetElement(aPlayer(x), ">", "<", nLastLocation + 1)

            'WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "*" 

            'added for the case of "trade pending"
            if Right(sLevel,1) = " " Then sLevel = Left(sLevel,Len(sLevel)-1)

            sLevel = mid(sLevel,7,len(sLevel)- 7)
                        
            nLevel = cINT(sLevel)
            
            sPosition = GetElement(aPlayer(x-1),"<td class=""lineup_position"">","</td>",1)
            sPosition = GetElement(sPosition,">","<",1)
            
            WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "* *" & sPosition & "*"
            
            if right(sPosition,1) = "E" or  right(sPosition,1) = "T" then 'DE/DT
                nTeam_DLine = nTeam_DLine + nLevel
                nTeam_DLine_Count = nTeam_DLine_Count + 1
            elseif right(sPosition,2) = "LB" then 'LB
                nTeam_LB = nTeam_LB + nLevel
                nTeam_LB_Count = nTeam_LB_Count + 1
                if sPosition = "LILB" or sPosition = "LILB" then b4_3 = False
            elseif Left(sPosition,2) = "CB" or sPosition = "SS" or sPosition = "FS"  then 'CB/SS/FS
                nTeam_DB = nTeam_DB + nLevel
                nTeam_DB_Count = nTeam_DB_Count + 1
            end if

            sPosition = GetElement(aPlayer(x-1),"<td class=""lineup_position"">","</td>",1)
            sPosition = GetElement(sPosition,">","<",1)

            sOutput = sOutput & vbCRLF & Padding(sPosition, 8, GlobalPad) & "(" & sLevel & ") " & sPlayer  

        end if
  
    Next

    WriteToFile LogName, "-- 3 GP --" & VBCRLF & sOutput & VBCRLF & "-- 3 GP --"

    if nTeam_OLine_Count > 0 then
        nTeam_OLine = cINT(nTeam_OLine/nTeam_OLine_Count)
    else
        nTeam_OLine = 0
    end if
    
    if nTeam_DLine_Count > 0 then
        nTeam_DLine = cINT(nTeam_DLine/nTeam_DLine_Count)
    else
        nTeam_DLine = 0
    end if
    
    if nTeam_WR_Count > 0 then
        nTeam_WR = cINT(nTeam_WR/nTeam_WR_Count)
    else
        nTeam_WR = 0
    end if
    
    if nTeam_DB_Count > 0 then
        nTeam_DB = cINT(nTeam_DB/nTeam_DB_Count)
    else
        nTeam_DB = 0
    end if
    
    if nTeam_RB_Count > 0 then
        nTeam_RB = cINT(nTeam_RB/nTeam_RB_Count)
    else
        nTeam_RB = 0
    end if
    
    if nTeam_LB_Count > 0 then
        if b4_3 then
            nTeam_LB = cINT(nTeam_LB/nTeam_LB_Count) & " (4-3)"
        else
            nTeam_LB = cINT(nTeam_LB/nTeam_LB_Count) & " (3-4)"
        end if
    else
        nTeam_LB = 0
    end if

   '*** TEAM OPPONENT NEXT ***

    sOutput = sOutput & vbCRLF & vbCRLF & "[b]Starting Lineup for: " & sOppName & "[/b]" & vbCRLF
    
    WriteToFile LogName, "-- 4 GP --" & VBCRLF & sOutput & VBCRLF & "-- 4 GP --"
    
    ' Get Offensive Players Table
    nLastLocation = 1
    sElement =  "<table class=""lineup_table"" cellspacing=""0"" cellpadding=""0"">"
    sPlayerTable = GetElement(sOpp_Page, sElement, "</table>", nLastLocation)
    nLocationOfTable = nLastLocation
    'Parse into Array
    aPlayer = split(sPlayerTable, "<a href=""/game/player.pl?player_id=")
    
    For x = 0 to UBound(aPlayer)
        
        'WriteToFile LogName, "****** " & aPlayer(x)
        if x > 0 then
            nLastLocation = 1
            sPlayer = GetElement(aPlayer(x), ">", "<", nLastLocation)
            sLevel = GetElement(aPlayer(x), ">", "<", nLastLocation + 1)

            'added for the case of "trade pending"
            if Right(sLevel,1) = " " Then sLevel = Left(sLevel,Len(sLevel)-1)
            
            sLevel = mid(sLevel,7,len(sLevel)- 7)
            'WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "*" 
            nLevel = cINT(sLevel)
            'WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "*" 
            
            sPosition = GetElement(aPlayer(x-1),"<td class=""lineup_position"">","</td>",1)
            sPosition = GetElement(sPosition,">","<",1)
            
            WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "* *" & sPosition
             
            if sPosition = "HB" or sPosition = "FB" then 'HB/FB
                nOpp_RB = nOpp_RB + nLevel
                nOpp_RB_Count = nOpp_RB_Count + 1
            elseif Left(sPosition,1) = "W" or sPosition = "TE" then 'WR/TE
                nOpp_WR = nOpp_WR + nLevel
                nOpp_WR_Count = nOpp_WR_Count + 1
            elseif Right(sPosition,1) = "C" or Right(sPosition,1) = "T" or Right(sPosition,1) = "G"  then 'ROT, LOT, C, LG, RG
                nOpp_OLine = nOpp_OLine + nLevel
                nOpp_OLine_Count = nOpp_OLine_Count + 1
            end if

            sOutput = sOutput & vbCRLF & Padding(sPosition, 8, GlobalPad) & "(" & sLevel & ") "  & sPlayer  

        end if
  
    Next

    WriteToFile LogName, "-- 5 GP --" & VBCRLF & sOutput & VBCRLF & "-- 5 GP --"

    ' Get Special Opps Players Table so we know to skip
    nLastLocation = nLocationOfTable + 1 
    sElement =  "<table class=""lineup_table"" cellspacing=""0"" cellpadding=""0"">"
    sPlayerTable = GetElement(sOpp_Page, sElement, "</table>", nLastLocation)
    nLocationOfTable = nLastLocation
    
    'Get Defensive Player Tables
    nLastLocation = nLocationOfTable + 1 
    sElement =  "<table class=""lineup_table"" cellspacing=""0"" cellpadding=""0"">"
    sPlayerTable = GetElement(sOpp_Page, sElement, "</table>", nLastLocation)
    nLocationOfTable = nLastLocation

    'Parse into Array
    aPlayer = split(sPlayerTable, "<a href=""/game/player.pl?player_id=")

    b4_3 = True

    For x= 0 to UBound(aPlayer)
        
        'WriteToFile LogName, aPlayer(x)
        if x > 0 then
            nLastLocation = 1
            sPlayer = GetElement(aPlayer(x), ">", "<", nLastLocation)
            sLevel = GetElement(aPlayer(x), ">", "<", nLastLocation + 1)

            'added for the case of "trade pending"
            if Right(sLevel,1) = " " Then sLevel = Left(sLevel,Len(sLevel)-1)

            sLevel = mid(sLevel,7,len(sLevel)- 7)
            nLevel = cINT(sLevel)
            'WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "*" 
            
            sPosition = GetElement(aPlayer(x-1),"<td class=""lineup_position"">","</td>",1)
            sPosition = GetElement(sPosition,">","<",1)
            
            WriteToFile LogName, "*" & sPlayer & "* *" & sLevel & "* *" & sPosition
            
            if right(sPosition,1) = "E" or  right(sPosition,1) = "T" then 'DE/DT
                nOpp_DLine = nOpp_DLine + nLevel
                nOpp_DLine_Count = nOpp_DLine_Count + 1
            elseif right(sPosition,2) = "LB" then 'LB
                nOpp_LB = nOpp_LB + nLevel
                nOpp_LB_Count = nOpp_LB_Count + 1
                if sPosition = "LILB" or sPosition = "LILB" then b4_3 = False
            elseif Left(sPosition,2) = "CB" or sPosition = "SS" or sPosition = "FS"  then 'CB/SS/FS
                nOpp_DB = nOpp_DB + nLevel
                nOpp_DB_Count = nOpp_DB_Count + 1
            end if

            sOutput = sOutput & vbCRLF & Padding(sPosition, 8, GlobalPad) & "(" & sLevel & ") "  & sPlayer 

        end if
  
    Next

    WriteToFile LogName, "-- 6 GP --" & VBCRLF & sOutput & VBCRLF & "-- 6 GP --"

    if nOpp_OLine_Count > 0 then
        nOpp_OLine = cINT(nOpp_OLine/nOpp_OLine_Count)
    else
        nOpp_OLine = 0
    end if
    
    if nOpp_DLine_Count > 0 then
        nOpp_DLine = cINT(nOpp_DLine/nOpp_DLine_Count)
    else
        nOpp_DLine = 0
    end if
    
    if nOpp_WR_Count > 0 then
        nOpp_WR = cINT(nOpp_WR/nOpp_WR_Count)
    else
        nOpp_WR = 0
    end if
    
    if nOpp_DB_Count > 0 then
        nOpp_DB = cINT(nOpp_DB/nOpp_DB_Count)
    else
        nOpp_DB = 0
    end if
    
    if nOpp_RB_Count > 0 then
        nOpp_RB = cINT(nOpp_RB/nOpp_RB_Count)
    else
        nOpp_RB = 0
    end if
    
    if nOpp_LB_Count > 0 then
        if b4_3 then
            nOpp_LB = cINT(nOpp_LB/nOpp_LB_Count) & " (4-3)"
        else
            nOpp_LB = cINT(nOpp_LB/nOpp_LB_Count) & " (3-4)"
        end if
    else
        nOpp_LB = 0
    end if

    ' Get Team Play Average
    sTeam_Average = GetTeamAverage(sSession, TeamID)
    sOpp_Average = GetTeamAverage(sSession, OpponentID)

    ' Write to Game Plan team information
    WriteToFile GamePlanName, vbCRLF & "[b]******************* Position Battles **************[/b]" & vbCRLF

    WriteToFile GamePlanName, "[u]Overall Player Averages[/u]"
    WriteToFile GamePlanName, sTeamName & ": " & sTeam_Average
    WriteToFile GamePlanName, sOppName & ": " & sOpp_Average

    WriteToFile GamePlanName,  vbCRLF & "[u]" & sTeamName & " (Offense vs. Defense) " & sOppName  & "[/u]"
    WriteToFile GamePlanName, "OL: " & nTeam_OLine & "  vs.  DL(opp): " & nOpp_DLine
    WriteToFile GamePlanName, "RB: " & nTeam_RB & "  vs.  LB(opp): " & nOpp_LB
    WriteToFile GamePlanName, "WR: " & nTeam_WR & "  vs.  DB(opp): " & nOpp_DB

    WriteToFile GamePlanName, vbCRLF & "[u]" & sOppName & " (Offense vs. Defense) " & sTeamName & "[/u]"
    WriteToFile GamePlanName, "OL(opp): " & nOpp_OLine & "  vs.  DL: " & nTeam_DLine
    WriteToFile GamePlanName, "RB(opp): " & nOpp_RB & "  vs.  LB: " & nTeam_LB
    WriteToFile GamePlanName, "WR(opp): " & nOpp_WR & "  vs.  DB: " & nTeam_DB
 
    WriteToFile GamePlanName, sOutput

    WriteToFile LogName, "GetTeamPlayers: End"
End Sub

'*********************** Parse Rankings ************************
Function ParseRankings(sRankingPage, aRankings, nTeamCount, nStatCount)
    Dim nLastLocation, sTeams, aTeams, x, y, aStats, sStat
    WriteToFile LogName, "ParseRankings: Begin"
    
    'WriteToFile LogName, "*****" & vbcrlf & sRankingPage & vbcrlf & "*****"
    
    nLastLocation =  1
    
    if instr(1, sRankingPage, "<table class") > 0 then
        sTeams = GetElement(sRankingPage, "<table class", "</table>", nLastLocation)
        
        aTeams = split(sTeams, "<tr")
    
        nTeamCount = UBound(aTeams)
    
        WriteToFile LogName, "Team Count=" & nTeamCount
    
        For x = 1 to nTeamCount
            
            aStats = split(aTeams(x), "<td")
    
            'create a double array of (Teams, Stats) by counting the column headers in the first team
            if x = 1 then
                nStatCount = UBound(aStats)
                ReDim aRankings(nTeamCount, nStatCount)
            end if
    
            For y = 1 to nStatCount
    
                nLastLocation =  1
                sStat = GetElement(aStats(y), ">", "<", nLastLocation)
                WriteToFile LogName, "*sStat=" & sStat
                
                if y = 1 and x > 1 then 'first row is the team name but it has a second element for href
                    sStat = GetElement(aStats(y), ">", "<", nLastLocation)
                elseif x = 1 then
                    if y > 2 then
                        sStat = GetElement(aStats(y), ">", "<", nLastLocation)
                    end if
                end if
                
                aRankings(x,y) = sStat
                
            Next
        Next
        
        WriteToFile LogName, "ParseRankings=1"
        ParseRankings=1
    else
        WriteToFile LogName, "ParseRankings=0"
        ParseRankings=0
    end if

    WriteToFile LogName, "ParseRankings: End"
    
End Function


'*********************** Get Rankings ************************
Sub GetRankings(sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName)
    WriteToFile LogName, "GetRankings: Begin"
    
    Dim nLastLocation, sElement, sLeagueID, sURL, sRankingPage, nTeamCount, nStatCount, x, sOutput
    Dim aRankingsPassO, aRankingsPassD, aRankingsRushO, aRankingsRushD, aRankingsD
    Dim nTeamPassOffense, nTeamPassDefense, nTeamRushOffense, nTeamRushDefense, nTeamDefense
    Dim nOppPassOffense, nOppPassDefense, nOppRushOffense, nOppRushDefense, nOppDefense, bParseFound


    WriteToFile LogName, "!!!!!!!!!!!!!! GetRankings"
    'Get LeagueID
    nLastLocation = 1
    sElement =  "league_id="
    sLeagueID = GetElement(sTeam_Page, sElement, """>", nLastLocation)

    'Get Offensive Passing Ratings
    sURL = GLB_FQDN & "/game/team_stats.pl?league_id=" & sLeagueID & "&conference_id=0&stat=passing&sort=passing_yards&playoffs=0"
    
    WriteToFile LogName, "GetRankings: URL = " & sURL

    sRankingPage = HTTPGet(0,sURL, sSession)
    
    
    bParseFound = ParseRankings(sRankingPage, aRankingsPassO, nTeamCount, nStatCount)
    
    if bParseFound=1 then
    
        nTeamPassOffense = 0
        nOppPassOffense = 0
        
        For x = 2 to nTeamCount
            if Trim(aRankingsPassO(x, 1)) = Trim(sTeamName) then nTeamPassOffense = x 'indexing the array only the real ranking is x - 1
            if Trim(aRankingsPassO(x, 1)) = Trim(sOppName) then nOppPassOffense = x  'ditto
        Next
        
        'Get Defensive Passing Ratings
        sURL = GLB_FQDN & "/game/team_stats.pl?league_id=" & sLeagueID & "&conference_id=0&stat=passing&sort=passing_yards_allowed&playoffs=0"
        sRankingPage = HTTPGet(0,sURL, sSession)
    
        bParseFound = ParseRankings(sRankingPage, aRankingsPassD, nTeamCount, nStatCount)
        nTeamPassDefense = 0
        nOppPassDefense = 0
        
        For x = 2 to nTeamCount
            if Trim(aRankingsPassD(x, 1)) = Trim(sTeamName) then nTeamPassDefense = x 'indexing the array only the real ranking is TeamCount - x + 1
            if Trim(aRankingsPassD(x, 1)) = Trim(sOppName) then nOppPassDefense = x  'ditto
        Next
        
        'Get Offensive Rushing Ratings
        sURL = GLB_FQDN & "/game/team_stats.pl?league_id=" & sLeagueID & "&conference_id=0&stat=rushing&sort=carries&playoffs=0"
        sRankingPage = HTTPGet(0,sURL, sSession)
    
        bParseFound = ParseRankings(sRankingPage, aRankingsRushO, nTeamCount, nStatCount)
        nTeamRushOffense = 0
        nOppRushOffense = 0
        
        For x = 2 to nTeamCount
            if Trim(aRankingsRushO(x, 1)) = Trim(sTeamName) then nTeamRushOffense = x 'indexing the array only the real ranking is x - 1
            if Trim(aRankingsRushO(x, 1)) = Trim(sOppName) then nOppRushOffense = x  'ditto
        Next
        
        'Get Defensive Rushing Ratings
        sURL = GLB_FQDN & "/game/team_stats.pl?league_id=" & sLeagueID & "&conference_id=0&stat=rushing&sort=rushing_yards_allowed&playoffs=0"
        sRankingPage = HTTPGet(0,sURL, sSession)
    
        bParseFound = ParseRankings(sRankingPage, aRankingsRushD, nTeamCount, nStatCount)
        nTeamRushDefense = 0
        nOppRushDefense = 0
        
        For x = 2 to nTeamCount
            if Trim(aRankingsRushD(x, 1)) = Trim(sTeamName) then nTeamRushDefense = x 'indexing the array only the real ranking is TeamCount - x + 1
            if Trim(aRankingsRushD(x, 1)) = Trim(sOppName) then nOppRushDefense = x  'ditto
        Next
      
        'Get Defensive Ratings
        sURL = GLB_FQDN & "/game/team_stats.pl?league_id=" & sLeagueID & "&conference_id=0&stat=defense&playoffs=0"
        sRankingPage = HTTPGet(0,sURL, sSession)
    
        bParseFound = ParseRankings(sRankingPage, aRankingsD, nTeamCount, nStatCount)
        nTeamDefense = 0
        nOppDefense = 0
        
        For x = 2 to nTeamCount
            if Trim(aRankingsD(x, 1)) = Trim(sTeamName) then nTeamDefense = x 'not sorted
            if Trim(aRankingsD(x, 1)) = Trim(sOppName) then nOppDefense = x  'ditto
        Next
        
        sOutput = vbCRLF & "[b]******************* League Ranking Matchups **************[/b]" & vbCRLF
        sOutput = sOutput & vbCRLF & "[u]" & sOppName & " (Pass Offense vs. Pass Defense) " & sTeamName & "[/u]" 
        sOutput = sOutput & vbCRLF & "[b]" & Padding("Rank(opp)",20,GlobalPad) & nOppPassOffense-1 & " vs. " & nTeamCount-nTeamPassDefense+1 & " Rank" & "[/b]"
        sOutput = sOutput & vbCRLF & Padding("Comp/Att(opp)",20,GlobalPad) & aRankingsPassO(nOppPassOffense,4) & "/" & aRankingsPassO(nOppPassOffense,5) & " vs. " & aRankingsD(nTeamDefense,8) & " PD"
        sOutput = sOutput & vbCRLF & Padding("Yards(opp)",20,GlobalPad) & aRankingsPassO(nOppPassOffense,3) & " vs. " & aRankingsPassD(nTeamPassDefense,15) & " Yards Allowed"
        sOutput = sOutput & vbCRLF & Padding("TD(opp)",20,GlobalPad) & aRankingsPassO(nOppPassOffense,11) & " vs. " & aRankingsPassD(nTeamPassDefense,17) & " TD Alllowed"        
        sOutput = sOutput & vbCRLF & Padding("INT(opp)",20,GlobalPad) & aRankingsPassO(nOppPassOffense,12) & " vs. " & aRankingsD(nTeamDefense,9) & " INT"
        sOutput = sOutput & vbCRLF & Padding("Hurried(opp)",20,GlobalPad) & aRankingsPassO(nOppPassOffense,13) & " vs. " & aRankingsD(nTeamDefense,5) & " Hurried"
        sOutput = sOutput & vbCRLF & Padding("Sacks(opp)",20,GlobalPad) & aRankingsPassO(nOppPassOffense,14) & " vs. " & aRankingsD(nTeamDefense,6) & " Sacks"
            
        WriteToFile GamePlanName, sOutput
    
        sOutput = vbCRLF & vbCRLF & "[u]" & sTeamName & " (Pass Offense vs. Pass Defense) " & sOppName  & "[/u]"
        sOutput = sOutput & vbCRLF & "[b]" & Padding("Rank",20,GlobalPad) & nTeamPassOffense-1 & " vs. " & nTeamCount-nOppPassDefense+1 & " Rank(opp)" & "[/b]"
        sOutput = sOutput & vbCRLF & Padding("Comp/Att",20,GlobalPad) & aRankingsPassO(nTeamPassOffense,4) & "/" & aRankingsPassO(nTeamPassOffense,5) & " vs. " & aRankingsD(nOppDefense,8) & " PD(opp)"
        sOutput = sOutput & vbCRLF & Padding("Yards",20,GlobalPad) & aRankingsPassO(nTeamPassOffense,3) & " vs. " & aRankingsPassD(nOppPassDefense,15) & " Yards Allowed(opp)"
        sOutput = sOutput & vbCRLF & Padding("TD",20,GlobalPad) & aRankingsPassO(nTeamPassOffense,11) & " vs. " & aRankingsPassD(nOppPassDefense,17) & " TD Alllowed(opp)"        
        sOutput = sOutput & vbCRLF & Padding("INT",20,GlobalPad) & aRankingsPassO(nTeamPassOffense,12) & " vs. " & aRankingsD(nOppDefense,9) & " INT(opp)"
        sOutput = sOutput & vbCRLF & Padding("Hurried",20,GlobalPad) & aRankingsPassO(nTeamPassOffense,13) & " vs. " & aRankingsD(nOppDefense,5) & " Hurried(opp)"
        sOutput = sOutput & vbCRLF & Padding("Sacks",20,GlobalPad) & aRankingsPassO(nTeamPassOffense,14) & " vs. " & aRankingsD(nOppDefense,6) & " Sacks(opp)"
    
        WriteToFile GamePlanName, sOutput
    
        sOutput = vbCRLF  & vbCRLF & "[u]" & sOppName & " (Rushing Offense vs. Rushing Defense) " & sTeamName  & "[/u]"
        sOutput = sOutput & vbCRLF & "[b]" & Padding("Rank(opp)",20,GlobalPad) & nOppRushOffense-1 & " vs. " & nTeamCount-nTeamRushDefense+1 & " Rank" & "[/b]"
        sOutput = sOutput & vbCRLF & Padding("Rushes(opp)",20,GlobalPad) & aRankingsRushO(nOppRushOffense,3) & " vs. N/A"
        sOutput = sOutput & vbCRLF & Padding("Average(opp)",20,GlobalPad) & aRankingsRushO(nOppRushOffense,6) & " vs. N/A"
        sOutput = sOutput & vbCRLF & Padding("Yards(opp)",20,GlobalPad) & aRankingsRushO(nOppRushOffense,5)  & " vs. " & aRankingsRushD(nTeamRushDefense,11) & " Yards Allowed"
        sOutput = sOutput & vbCRLF & Padding("Fumbles(opp)",20,GlobalPad) & aRankingsRushO(nOppRushOffense,9)  & " vs. " & aRankingsD(nTeamDefense,12) & " Fumbles Caused"
    
        WriteToFile GamePlanName, sOutput
        
        sOutput = vbCRLF  & vbCRLF & "[u]" & sTeamName & " (Rushing Offense vs. Rushing Defense) " & sOppName  & "[/u]"
        sOutput = sOutput & vbCRLF & "[b]" & Padding("Rank",20,GlobalPad) & nTeamRushOffense-1 & " vs. " & nTeamCount-nOppRushDefense+1 & " Rank(opp)" & "[/b]"
        sOutput = sOutput & vbCRLF & Padding("Rushes",20,GlobalPad) & aRankingsRushO(nTeamRushOffense,3) & " vs. N/A(opp)"
        sOutput = sOutput & vbCRLF & Padding("Average",20,GlobalPad) & aRankingsRushO(nTeamRushOffense,6) & " vs. N/A(opp)" 
        sOutput = sOutput & vbCRLF & Padding("Yards",20,GlobalPad) & aRankingsRushO(nTeamRushOffense,5)  & " vs. " & aRankingsRushD(nOppRushDefense,11) & " Yards Allowed(opp)"
        sOutput = sOutput & vbCRLF & Padding("Fumbles",20,GlobalPad) & aRankingsRushO(nTeamRushOffense,9)  & " vs. " & aRankingsD(nOppDefense,12) & " Fumbles Caused(opp)"
    
        WriteToFile GamePlanName, sOutput
    
    else
        sOutput = vbCRLF & "[b]******************* League Ranking Matchups **************[/b]" & vbCRLF
        sOutput = sOutput & vbCRLF & "No Rankings set"
        WriteToFile GamePlanName, sOutput
    end if

    WriteToFile LogName, "GetRankings: End"
End Sub


'*********************** CLEANUP REPLAYS ************************
Function CleanupReplays (sJSReplayPlayers, sJSReplayPositions, retries, sPlayString)
   
    'For debug use generates an error without stopping the script
    'On Error Resume Next
   
    Dim Formation, z, y, w, zz, u, ballX, ballY, zball, xRec, yRec, xtraCount, fieldPostionMulti, ballZ
    Dim PlayersPosition, Positioner, passTick, passAttempt, runPitch, passcaughtTick, passDroppedTick, endOfPlayTick, scrimmageX
    Dim QB, WR, HB, FB, TE, DL, LB, CB, ilbDelta, olbDelta, TEShift, deepSafety, blitzTick, tempX, tempY, tempXX, tempYY
    Dim Blitz, HBCoor, FBCoor, TECoor, xMulti, yMulti, passBall, passReceived, passDropped, FSCoor, SSCoor, CB1Coor, CB2Coor
    Dim defense, shift, offense, ballCarrier, sackMaster, screenPass, approximateYds, jumpCatch
    Dim passWhere, runGap, incrementPlay
    Dim MyPosition, MyPositionStats, countPos, CoverageShell, dFocus, coverageDistance, lbFielded
    Set MyPosition = CreateObject("Scripting.Dictionary")
    Set countPos = CreateObject("Scripting.Dictionary")
    Set MyPositionStats = CreateObject("Scripting.Dictionary")
   
    'MyPosition.Item("Name") is the way to retrieve the index for the position array
    'Verify it's existence
    'if objDictionary.Exists("Name") then
        ' Do something
    'else
        ' Do something else
    'end if
    'objDictionary.Remove("Name")
    'objDictionary.RemoveAll
    'Dim ItemsArray, KeysArray
    'ItemsArray = objDictionary.Items
    'KeysArray = objDictionary.Keys
   

    sPlayString = Replace(sPlayString, "'", "")

    WriteToFile LogName, "CleanupReplays: Begin +++++++++++++++ "
   
    '70 runs
    'http://goallineblitz.com/game/game.pl?game_id=373483
   
    incrementPlay = 0
    Blitz = ""
    shift = "center"
    offense = ""
    defense = ""
    xMulti = 1
    yMulti = 1
    ballCarrier = ""
    sackMaster = ""
    passBall = false
    passReceived = false
    passDropped = false
    screenPass = False
    jumpCatch = False
    xRec = 0
    yRec = 0
    passTick = 0
    passAttempt = False
    Positioner = 1
    approximateYds = 0
    runPitch = False
    passcaughtTick=0
    passDroppedTick=0
    endOfPlayTick=0
    xtraCount = 0
    CoverageShell = 2
    fieldPostionMulti = 0
    ilbDelta = 0
    TEShift = "right"
    dFocus = "pass"
    coverageDistance = "medium"
    lbFielded = ""
    tempX = 0
    tempY = 0
    tempXX = 0
    tempYY = 0
    scrimmageX = 0
    passWhere = 0
    runGap = 0
    ballX = 0
    ballY = 0
   
    QB = 0
    WR = 0
    HB = 0
    FB = 0
    TE = 0
    DL = 0
    LB = 0
    CB = 0

    endOfPlayTick = UBound(sJSReplayPositions) - 1
    
    blitzTick = endOfPlayTick * -1 'Default Tick if forward movement is null (sacks, loss), do a abs() on it

    If InStr(sPlayString, "pass to") > 0 Then
        passAttempt = true
    End if
   
    If UBound(sJSReplayPositions) > 0 then
        Redim PlayersPosition(UBound(sJSReplayPositions(0)))
    End If
   
    'Example output for the JS taken from the replay page.
    'JS players(0):'566257': {position : 'LOT', name : 'Tucker Long'}
    'JS positions(0)(0):[{id: 'ball',x: 90,y: 127.25,z: 4
   
    For z=0 To UBound(sJSReplayPlayers)
        
        'WriteToFile LogName, "CleanupReplays players before clean : " & sJSReplayPlayers(z)
        
        sJSReplayPlayers(z) = Replace(sJSReplayPlayers(z), "'", "")
        sJSReplayPlayers(z) = Replace(sJSReplayPlayers(z), "\", "")
        sJSReplayPlayers(z) = Replace(sJSReplayPlayers(z), ": {", ",")
        sJSReplayPlayers(z) = Replace(sJSReplayPlayers(z), "position : ", "")
        sJSReplayPlayers(z) = Replace(sJSReplayPlayers(z), " name : ", "")
        sJSReplayPlayers(z) = Replace(sJSReplayPlayers(z), "}", "")
       
        'WriteToFile LogName, "CleanupReplays players : " & sJSReplayPlayers(z) & " z:" & z
       
        sJSReplayPlayers(z) = Split(sJSReplayPlayers(z),",")
           
            'WriteToFile LogName, "!!**##  sJSReplayPlayers(z)(1)=" & sJSReplayPlayers(z)(1) & "***"
        If UBound(sJSReplayPlayers(z)) > 0 then
           
            'Builds a dictionnary to get the positions index in the array (easily retriveable)
            If Not MyPosition.Exists(sJSReplayPlayers(z)(1)) then
                MyPosition.Add sJSReplayPlayers(z)(1), sJSReplayPlayers(z)(0)
                countPos.Add sJSReplayPlayers(z)(1), 1
                'WriteToFile LogName, "Dictionnary for position --> " & sJSReplayPlayers(z)(1) & " = " & MyPosition.Item(sJSReplayPlayers(z)(1))
            Else
                countPos.Item(sJSReplayPlayers(z)(1)) = countPos.Item(sJSReplayPlayers(z)(1)) + 1
                MyPosition.Add (sJSReplayPlayers(z)(1) & countPos.Item(sJSReplayPlayers(z)(1))), sJSReplayPlayers(z)(0)
                'WriteToFile LogName, "Dictionnary for position --> " &  sJSReplayPlayers(z)(1) & countPos.Item(sJSReplayPlayers(z)(1)) & " = " & MyPosition.Item(sJSReplayPlayers(z)(1) & countPos.Item(sJSReplayPlayers(z)(1)))
            End If
           
            'Also we count the number of WR, TE and RB. (kneel down is a full house formation)
            Select Case sJSReplayPlayers(z)(1)
                Case "QB"
                    QB = QB +1
                    If (ballCarrier = "" And InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0) Or (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "HB"
                    HB = HB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "FB"
                    FB = FB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "WR1"
                    WR = WR +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "WR2"
                    WR = WR +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "WR3"
                    WR = WR +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "WR4"
                    WR = WR +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "WR5"
                    WR = WR +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "TE"
                    TE = TE +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "TE1"
                    TE = TE +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "TE2"
                    TE = TE +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 Then
                        ballCarrier = sJSReplayPlayers(z)(1)
                    End If
                Case "RDE"
                    DL = DL +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "LDE"
                    DL = DL +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "DT"
                    DL = DL +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "NT"
                    DL = DL +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "MLB"
                    LB = LB +1
                    If lbFielded = "" Then
                        lbFielded = sJSReplayPlayers(z)(1)
                    Else
                        lbFielded = lbFielded & "::" & sJSReplayPlayers(z)(1)
                    End If
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "RILB"
                    LB = LB +1
                    If lbFielded = "" Then
                        lbFielded = sJSReplayPlayers(z)(1)
                    Else
                        lbFielded = lbFielded & "::" & sJSReplayPlayers(z)(1)
                    End If
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "LILB"
                    LB = LB +1
                    If lbFielded = "" Then
                        lbFielded = sJSReplayPlayers(z)(1)
                    Else
                        lbFielded = lbFielded & "::" & sJSReplayPlayers(z)(1)
                    End If
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "ROLB"
                    LB = LB +1
                    If lbFielded = "" Then
                        lbFielded = sJSReplayPlayers(z)(1)
                    Else
                        lbFielded = lbFielded & "::" & sJSReplayPlayers(z)(1)
                    End If
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "LOLB"
                    LB = LB +1
                    If lbFielded = "" Then
                        lbFielded = sJSReplayPlayers(z)(1)
                    Else
                        lbFielded = lbFielded & "::" & sJSReplayPlayers(z)(1)
                    End If
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "CB1"
                    CB = CB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "CB2"
                    CB = CB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "CB3"
                    CB = CB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "CB4"
                    CB = CB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "CB5"
                    CB = CB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "FS"
                    CB = CB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
                Case "SS"
                    CB = CB +1
                    If InStr(sPlayString, sJSReplayPlayers(z)(2)) > 0 And (InStr(sPlayString, "sacked") > 0 Or InStr(sPlayString, "Big Sack") > 0) Then
                        sackMaster = sJSReplayPlayers(z)(1)
                    End If
            End Select
            
        End If
    Next
    
    If ballCarrier = "" Then
        ballCarrier = "QB"
    End If
    
    lbFielded = Split(lbFielded,"::")
    
    For zball = 0 to UBound(sJSReplayPositions)
        For y=0 To UBound(sJSReplayPositions(zball))
           
            'Debug on presnaps
            'if y = 0 then
                'WriteToFile LogName, sJSReplayPositions(zball)(y)
            'end if
           
            'First Cleaning up unuseful data
            'Going through the replay gathering data and merging the 2 arrays.
            'Presnap doesn't get to get that string taken out
            
            If Not zball = 0 Then 
                sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), ",[{", "[{")
            End If

            if Language = "French" Then
                sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), "'", "")
            end if
                   
            sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), "[", "")
            sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), "{", "")
            sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), "id: ", "")
            sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), "x: ", "")
            sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), "y: ", "")
            sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), "}", "")
            ''JS positions(0)(0):[{id: 'ball',x: 90,y: 127.25,z: 4
            If InStr(sJSReplayPositions(zball)(y), "z:") And y>0 Then
              If UBound(sJSReplayPositions(zball-1)(y)) > 2 then
                  sJSReplayPositions(zball)(y) = sJSReplayPositions(zball)(y) & ",z: " & sJSReplayPositions(zball-1)(y)(3)
              Else
                  sJSReplayPositions(zball)(y) = sJSReplayPositions(zball)(y) & ",z: 4"
              End If
            End If
            sJSReplayPositions(zball)(y) = Replace(sJSReplayPositions(zball)(y), "z: ", "")
            
            'WriteToFile LogName, "Before split on , -->" & sJSReplayPositions(zball)(y)
            
            sJSReplayPositions(zball)(y) = Split(sJSReplayPositions(zball)(y),",")
           
            if Language = "French" Then
                sJSReplayPositions(zball)(y)(1) = CInt(Replace(sJSReplayPositions(zball)(y)(1),".",","))
                sJSReplayPositions(zball)(y)(2) = CInt(Replace(sJSReplayPositions(zball)(y)(2),".",","))
            end If
           
            '****************************
           	'	Script correction due to shuffle in player position compared to player movement
           	'****************************
           	
           	'Builds a dictionnary to get the positions index in the array (easily retriveable)
            If Not MyPositionStats.Exists(sJSReplayPositions(zball)(y)(0)) then
                MyPositionStats.Add sJSReplayPositions(zball)(y)(0), y
                'WriteToFile LogName, "Dictionnary for coordinates -->" & sJSReplayPositions(zball)(y)(0) &" = "& MyPositionStats.Item(sJSReplayPositions(zball)(y)(0))
            End if
           	
           	'****************************
           	'	END
           	'****************************
           
            if y = 0 Then
           
                if UBound(sJSReplayPositions(zball)(y)) > 2 then
                    if Language = "French" Then
                        sJSReplayPositions(zball)(y)(1) = CInt(Replace(sJSReplayPositions(zball)(y)(1),".",","))
                        sJSReplayPositions(zball)(y)(2) = CInt(Replace(sJSReplayPositions(zball)(y)(2),".",","))
                        sJSReplayPositions(zball)(y)(3) = CInt(Replace(sJSReplayPositions(zball)(y)(3),".",","))
                        ballZ = sJSReplayPositions(zball)(y)(3)
                    end If
                Else
                    if Language = "French" Then
                        sJSReplayPositions(zball)(y)(1) = CInt(Replace(sJSReplayPositions(zball)(y)(1),".",","))
                        sJSReplayPositions(zball)(y)(2) = CInt(Replace(sJSReplayPositions(zball)(y)(2),".",","))
                    End If
                    If UBound(sJSReplayPositions(zball-1)(y)) > 2 then
                        ballZ = sJSReplayPositions(zball-1)(y)(3)
                    Else
                        ballZ = 4
                    End If
                End if
               
                'debug info, do not consider
                ' and (not passReceived or not passDropped)
                'on Error Resume next
   
                '***********Pixel for yards*********Confirmed by redwards******
                '                      3 pixels = 1 yard approximate
                '**************************************************************
                ' Get the different action ticks for plays.
                ' What out for Z of ball on first ticks

                'GEtting the forward progress tick (ball is snap then it's run OR pass, that's the forward movement)
                'Not in classic coordinates yet!
                If cInt(zball) > 2 Then
                    If UBound(sJSReplayPositions(0)) > 0 And ballX = 0 And ballY = 0 Then
                    	
'                    	CoorCx = CInt(sJSReplayPositions(0)(MyPosition.Item("C"))(1))
'    					CoorCy = CInt(sJSReplayPositions(0)(MyPosition.Item("C"))(2))
    					
'    					sJSReplayPositions(0)(MyPosition.Item("C"))(1) = CInt(sJSReplayPositions(0)(MyPosition.Item("RG"))(1))
'    					sJSReplayPositions(0)(MyPosition.Item("C"))(2) = CInt(sJSReplayPositions(0)(MyPosition.Item("RG"))(2))
    					
'    					sJSReplayPositions(0)(MyPosition.Item("RG"))(1) = CoorCx
'    					sJSReplayPositions(0)(MyPosition.Item("RG"))(2) = CoorCy
						
						incrementPlay = CInt(SetIncrement("C", MyPosition, MyPositionStats))

    					'WriteToFile LogName, "C is here : " & incrementPlay
    					
                        ballX = CInt(sJSReplayPositions(0)(incrementPlay)(1))
                        ballY = CInt(sJSReplayPositions(0)(incrementPlay)(2))
                        
						incrementPlay = CInt(SetIncrement("FS", MyPosition, MyPositionStats))
						
						'WriteToFile LogName, "FS is here : " & incrementPlay
                        
                        yMulti = ballY - CInt(sJSReplayPositions(0)(incrementPlay)(2))
                        'WriteToFile LogName, "ymulti : " & yMulti & " ("& ballX & ","& ballY &")"
                        If fieldPostionMulti = 0 then
                            If (CInt(yMulti) < 0) then
                                fieldPostionMulti = -1
                                '
                            Else
                                fieldPostionMulti = 1
                                'WriteToFile LogName, "direction : " & fieldPostionMulti
                            End If
                        End If
                    End if
                    
                    incrementPlay = CInt(SetIncrement("C", MyPosition, MyPositionStats))
                    
                    tempY = SetCoordinates(sJSReplayPositions(0)(incrementPlay)(2),sJSReplayPositions(zball)(y)(2),fieldPostionMulti, "y")
                    'tempY = fieldPostionMulti * CInt(sJSReplayPositions(0)(MyPosition.Item("C"))(2)) - CInt(sJSReplayPositions(zball)(y)(2))
                    tempYY = SetCoordinates(sJSReplayPositions(0)(incrementPlay)(2),sJSReplayPositions(zball-1)(y)(2),fieldPostionMulti, "y")
                    'tempYY = fieldPostionMulti * CInt(sJSReplayPositions(0)(MyPosition.Item("C"))(2)) - CInt(sJSReplayPositions(zball-1)(y)(2))
                    
                    If tempY >=0 And scrimmageX = 0 Then
                        'To know when a run passes the scrim line and get the run gap
                        scrimmageX = SetCoordinates(sJSReplayPositions(0)(incrementPlay)(1),sJSReplayPositions(zball)(y)(1),fieldPostionMulti,"x")
                        'scrimmageX = CInt(sJSReplayPositions(0)(MyPosition.Item("C"))(1)) - CInt(sJSReplayPositions(zball)(y)(1))
                    Else 
                        If tempY < 0 Then
                            scrimmageX = SetCoordinates(sJSReplayPositions(0)(incrementPlay)(1),sJSReplayPositions(zball)(y)(1),fieldPostionMulti,"x")
                            'scrimmageX = CInt(sJSReplayPositions(0)(MyPosition.Item("C"))(1)) - CInt(sJSReplayPositions(zball)(y)(1))
                        End If
                    End If
                End If 
                
                if blitzTick < 0 And cInt(zball) > 2 Then
                    If tempY > tempYY Then
                        blitzTick = zball
                    Else 
                        blitzTick = endOfPlayTick * -1
                    End If
                End if
                
                if cInt(ballZ) > 4 And passAttempt And Not passBall And cInt(zball) > 3 then
                    passBall = True
                    passTick = zball
                Else
                    If cInt(ballZ) > 4 And Not passBall And Not passAttempt And cInt(zball) > 0 then
                        runPitch = true
                    End if
                end if
                if ((cInt(ballZ) = 4) Or (cInt(ballZ) > 4 and zball >= endOfPlayTick)) And (passBall And Not passReceived) then
                    passReceived = True
                    passcaughtTick = zball
                    passDropped = False
                    If (cInt(ballZ) >= 4) Then
                       jumpCatch = True
                    End If
                    if Language = "French" Then
                        xRec = CInt(Replace(sJSReplayPositions(zball)(y)(1),".",","))
                        yRec = CInt(Replace(sJSReplayPositions(zball)(y)(2),".",","))
                    Else
                        xRec = CInt(sJSReplayPositions(zball)(y)(1))
                        yRec = CInt(sJSReplayPositions(zball)(y)(2))
                    End if
                else
                    if passball and cInt(ballZ) < 4 and Not passDropped then
                        passDropped = True
                        passDroppedTick = zball
                        passReceived = False
                        jumpCatch = False
                        if Language = "French" Then
                            xRec = CInt(Replace(sJSReplayPositions(zball)(y)(1),".",","))
                            yRec = CInt(Replace(sJSReplayPositions(zball)(y)(2),".",","))
                        Else
                            xRec = CInt(sJSReplayPositions(zball)(y)(1))
                            yRec = CInt(sJSReplayPositions(zball)(y)(2))
                        End if
                    else
                        if not passball and not passDropped and not passReceived then
                            if Language = "French" Then
                                xRec = CInt(Replace(sJSReplayPositions(zball)(y)(1),".",","))
                                yRec = CInt(Replace(sJSReplayPositions(zball)(y)(2),".",","))
                            Else
                                xRec = CInt(sJSReplayPositions(zball)(y)(1))
                                yRec = CInt(sJSReplayPositions(zball)(y)(2))
                            End if
                        end if
                    end if
                end If
                   
                WriteToFile LogName, "!!**##  Ball Z axis (" & ballZ & ":"& passAttempt &":"& passBall &") *** (" & sJSReplayPositions(zball)(y)(1) & "," & sJSReplayPositions(zball)(y)(2)& ")" & " :: Zball : " & zball & ":" & endOfPlayTick & ":: Blitz:" & blitzTick & " ("&tempY&","&tempYY&")" & ":: Scrimmage X : " & scrimmageX
   
    '****************DEBUG ERROR HANDLING***********************
    '                if Err > 0 then
    '                    WriteToFile LogName, UBound(sJSReplayPositions(zball)(y)) & " :: zball:" & zball & " - y:" & y & "Error: " & Err.Description & " ** " & Err.number & " ** " & Err.Source
    '                end if
    '***********************************************************
            end If
        Next
    Next
    
       
'    If UBound(sJSReplayPositions(0)) > 0 then
'        ballX = CInt(sJSReplayPositions(0)(MyPosition.Item("C"))(1))
'        ballY = CInt(sJSReplayPositions(0)(MyPosition.Item("C"))(2))
'        yMulti = ballY - CInt(sJSReplayPositions(0)(MyPosition.Item("FS"))(2))
'    Else
'        ballX = 0
'        ballY = 0
'        yMulti = 1
'    End if
   
    WriteToFile LogName, "C : (" & ballX & "," & ballY & ")"
    WriteToFile LogName, "FS Y : " & CInt(yMulti)
    'WriteToFile LogName, "LB on the field : " & CStr(lbFielded)
   
'    If (CInt(yMulti) < 0) then
'        fieldPostionMulti = -1
'    Else
'        fieldPostionMulti = 1
'    End if

    'reception made (x,y)
    yRec = SetCoordinates(ballY,yRec,fieldPostionMulti, "y") 'fieldPostionMulti * CInt(ballY - yRec)
    xRec = SetCoordinates(ballX,xRec,fieldPostionMulti, "x") 'fieldPostionMulti * Cint(xRec - ballX)
   
    'Screen detection
    if yRec >= -4 And yRec <= 2 And passBall then
        screenPass = true
    end if
   
    approximateYds = Round(yRec/3, 2)

    WriteToFile LogName, "direction : " & fieldPostionMulti & " :: Pass play - Pass thrown : " & passAttempt & " - " & passBall & " :: Received : " & passReceived & " :: Dropped : " & passDropped & " :: xRec : " & xRec & " :: yRec : " & yRec & " :: screen : " & screenPass & " :: pitch play : " & runPitch & " :: Approximate yards : " & approximateYds & " :: Tick on Ball launch : " & passTick & " :: JumpCatch : " & jumpCatch
   
    If UBound(sJSReplayPositions(0)) > 0 then
   
   
    For zball = 0 to UBound(sJSReplayPositions)
        For y=0 To UBound(sJSReplayPositions(zball))

        sJSReplayPositions(zball)(y)(1) = SetCoordinates(ballX,sJSReplayPositions(zball)(y)(1),fieldPostionMulti, "x")
        sJSReplayPositions(zball)(y)(2) = SetCoordinates(ballY,sJSReplayPositions(zball)(y)(2),fieldPostionMulti, "y")
               
        'Trying To figure out player positions on the field
        'Needs expanding!  Need to make the field a X and Y coordinates compared to the C on presnap
        'Implemented!
        '___________________________________________________________________________
       
        'HTML(0,0)      ^ y
        '               |
        '               |   defense vvv
        '(x neg, y pos) |   (X pos, y pos)(X - center x, center y - player y)
        '               |
        '_______________C(0,0)_____________> x
        '               |
        '               |
        '(x neg, y neg) |   offense ^^^
        '               |   (x pos, y neg)  HTML (X++,Y++)
       
        '___________________________________________________________________________
       
        Next
    Next

    'Blitz detection  Let's ADDDDDDDD!
    'blitzTick
    blitzTick = CInt(Abs(blitzTick) - 1)
    For y=1 To UBound(sJSReplayPositions(0))
    If Not (TE=2 And FB=2) Then  
        'The spiking the ball formation do not get tick 6
        'Blitz detection is failing on CB blitzes, also need to get the DL blitzes
        'WriteToFile LogName, "!!** variables that fuck with me : y:" & y & " and the error : " & sJSReplayPlayers(y-1)(0) & " max:" & UBound(sJSReplayPositions(0)) & " players:" & UBound(sJSReplayPlayers)
        If (Right(sJSReplayPlayers(y-1)(1),2) = "LB" Or _
        Left(sJSReplayPlayers(y-1)(1),2)= "CB" Or _
        Right(sJSReplayPlayers(y-1)(1),1)= "S" Or _
        Right(sJSReplayPlayers(y-1)(1),2) = "DE" Or _
        Right(sJSReplayPlayers(y-1)(1),2) = "DT" Or _
        Right(sJSReplayPlayers(y-1)(1),2) = "NT") Then 
        
        'Right(sJSReplayPlayers(y-1)(1),2) = "LB" Or _
        
            If ((sJSReplayPositions(0)(y)(2) >= sJSReplayPositions(blitzTick)(y)(2)) Or _
                (Abs(sJSReplayPositions(blitzTick)(y)(2)) < 8 And Abs(sJSReplayPositions(blitzTick)(y)(1)) < 30 )) And _
                (Right(sJSReplayPlayers(y-1)(1),2) = "DE" Or _
                sJSReplayPlayers(y-1)(1) = "DT" Or _
                sJSReplayPlayers(y-1)(1) = "NT") Then
                
                If Blitz="" Then
                    Blitz = sJSReplayPlayers(y-1)(1)
                Else
                    Blitz = Blitz & ";" & sJSReplayPlayers(y-1)(1)
                End If
                
            Else
                If ((abs(sJSReplayPositions(0)(y)(1)) > Abs(sJSReplayPositions(blitzTick)(y)(1))) And _
                   sJSReplayPositions(0)(y)(2) > sJSReplayPositions(blitzTick)(y)(2) And _
                   Right(sJSReplayPlayers(y-1)(1),1)= "S") then
                    If Blitz="" Then
                        Blitz = sJSReplayPlayers(y-1)(1)
                    Else
                        Blitz = Blitz & ";" & sJSReplayPlayers(y-1)(1)
                    End If
                Else
                    If (Left(sJSReplayPlayers(y-1)(1),2)= "CB" And _ 
                        sJSReplayPositions(blitzTick)(y)(2) <= 0 And _
                        Abs(sJSReplayPositions(0)(y)(1)) >= Abs(sJSReplayPositions(blitzTick)(y)(1)) And _
                        sJSReplayPositions(0)(y)(2) >= sJSReplayPositions(blitzTick)(y)(2)) Then
                        If Blitz="" Then
                            Blitz = sJSReplayPlayers(y-1)(1)
                        Else
                            Blitz = Blitz & ";" & sJSReplayPlayers(y-1)(1)
                        End If
                    Else
                        If ((abs(sJSReplayPositions(0)(y)(1)) > Abs(sJSReplayPositions(blitzTick)(y)(1))) And _
                           (sJSReplayPositions(0)(y)(2) > sJSReplayPositions(blitzTick)(y)(2)) And _
                           (Right(sJSReplayPlayers(y-1)(1),2) = "LB")) then
                            If Blitz="" Then
                                Blitz = sJSReplayPlayers(y-1)(1)
                            Else
                                Blitz = Blitz & ";" & sJSReplayPlayers(y-1)(1)
                            End If
                        End If
                    End If 
                End If
            End If
        End If
    End If
    Next
    'WriteToFile LogName, "CleanupReplays ID: " & PlayersPosition(y)(0) & ", Position: " & PlayersPosition(y)(1) & ", Nom: " & PlayersPosition(y)(2) & ", X:" & PlayersPosition(y)(3) & ", Y:" & PlayersPosition(y)(4) & ", 3|X:" & PlayersPosition(y)(5) & ", 3|Y:" & PlayersPosition(y)(6)


    '************Coverage identification by Samson*************
    '****************Based on Redwards script******************
    '**********************************************************
   
    incrementPlay = CInt(SetIncrement("HB", MyPosition, MyPositionStats))
    HBCoor = sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2)
    HBCoor = Split(HBCoor,",")
    HBCoor(0) = CInt(HBCoor(0))
    HBCoor(1) = CInt(HBCoor(1))
    incrementPlay = CInt(SetIncrement("FB", MyPosition, MyPositionStats))
    FBCoor = sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2)
    FBCoor = Split(FBCoor,",")
    FBCoor(0) = CInt(FBCoor(0))
    FBCoor(1) = CInt(FBCoor(1))
    incrementPlay = CInt(SetIncrement("TE", MyPosition, MyPositionStats))
    TECoor = sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2)
    TECoor = Split(TECoor,",")
    TECoor(0) = CInt(TECoor(0))
    TECoor(1) = CInt(TECoor(1))
    If TECoor(0) < 0 then
        TEShift = "left"
    Else
        TEShift = "right"
    End If
    incrementPlay = CInt(SetIncrement("FS", MyPosition, MyPositionStats))
    FSCoor = sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2)
    FSCoor = Split(FSCoor,",")
    FSCoor(0) = CInt(FSCoor(0))
    FSCoor(1) = CInt(FSCoor(1))
    incrementPlay = CInt(SetIncrement("SS", MyPosition, MyPositionStats))
    SSCoor = sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2)
    SSCoor = Split(SSCoor,",")
    SSCoor(0) = CInt(SSCoor(0))
    SSCoor(1) = CInt(SSCoor(1))
    incrementPlay = CInt(SetIncrement("CB1", MyPosition, MyPositionStats))
    CB1Coor = sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2)
    CB1Coor = Split(CB1Coor,",")
    CB1Coor(0) = CInt(CB1Coor(0))
    CB1Coor(1) = CInt(CB1Coor(1))
    incrementPlay = CInt(SetIncrement("CB2", MyPosition, MyPositionStats))
    CB2Coor = sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2)
    CB2Coor = Split(CB2Coor,",")
    CB2Coor(0) = CInt(CB2Coor(0))
    CB2Coor(1) = CInt(CB2Coor(1))
       

     Defense = DL & "-" & LB & "-" & CB & " (" & Blitz & ")"
    'WriteToFile LogName, "Defense is : " & Defense
   
    'Coverages based on Y and X of FS and SS, gets you the cover 0,1,2 and 3.
    WriteToFile LogName, "FS is : (" & FSCoor(0) & "," & FSCoor(1) & "); SS is (" & SSCoor(0) & "," & SSCoor(1) & "); CB1 is (" & CB1Coor(0) & "," & CB1Coor(1) & "); CB2 is (" & CB2Coor(0) & "," & CB2Coor(1) & ");"
    if ((abs(FSCoor(0)) < 5) Or (abs(SSCoor(0)) < 5)) Then 'One safety is in the middle of the field
        'Sometimes, it's the SS in the middle of the field. I'm not sure what defensive look forces that.
        if (abs(CB1Coor(1)) > 15) Then
            CoverageShell = 3 'CB1 and CB2 are about 20 feet off the ball in a Cover 3 and Cover 4
        Else
            CoverageShell = 1
        End if
    else
        if ((abs(SSCoor(1)) < 25) And (abs(FSCoor(1)) < 25)) then 'safeties are in tight.
            CoverageShell = 0
            '(abs(FSCoor(1) - SSCoor(1)) < 2 Or abs(FSCoor(0) - SSCoor(0)) < 2) then 'safeties are the same distance deep or same distance from center on X
        else
            If (abs(CB1Coor(1)) > 15) then
                CoverageShell = 4 'CB1 and CB2 are about 20 feet off the ball in a Cover 3 and Cover 4
            Else
                CoverageShell = 2
            End If
        End If
    End If
   
   
    'Redwards contribution, detecting the defense focus.
       
    If FSCoor(1) > SSCoor(1) Then
        deepSafety = FSCoor(1)
    Else
        deepSafety = SSCoor(1)
    End If
   
    if deepSafety > 36 then
        coverageDistance = "long"
    else
        if deepSafety >= 33 then
           coverageDistance = "medium"
        else
            if deepSafety >= 27 then
               coverageDistance = "short"
            else
               coverageDistance = "" 'cover 0
            End If
        End If
    End If
   
    'should be checking the SS for this.   
    if SSCoor(1) > 27 then
        dFocus = "pass"
    else
        if SSCoor(1) >= 20 then
            dFocus = "balanced"
        else
            if SSCoor(1) < 20 then
               dFocus = "run"
            else
               dFocus = "-" '???
            End If
        End If
    End If
   
    'Let's start by identifying the number of LB, this will tell us what to look at.
    '3-4 (4 LBs) 425 (MLB, LOLB) 326 (MLB, ROLB) 43 and 335 (3 LBs)
    
    Dim incrementPlayWRun, incrementPlayLOT, incrementPlayLG, incrementPlayC, incrementPlayRG, incrementPlayROT, incrementPlayWRdeux
    
    incrementPlayWRun = CInt(SetIncrement("WR1", MyPosition, MyPositionStats))
    incrementPlayLOT = CInt(SetIncrement("LOT", MyPosition, MyPositionStats))
    incrementPlayLG = CInt(SetIncrement("LG", MyPosition, MyPositionStats))
    incrementPlayC = CInt(SetIncrement("C", MyPosition, MyPositionStats))
    incrementPlayRG = CInt(SetIncrement("RG", MyPosition, MyPositionStats))
    incrementPlayROT = CInt(SetIncrement("ROT", MyPosition, MyPositionStats))
    incrementPlayWRdeux = CInt(SetIncrement("WR2", MyPosition, MyPositionStats))
    
    WriteToFile LogName, "WR1 : (" & _
    sJSReplayPositions(0)(incrementPlayWRun)(1) & _
    "," & sJSReplayPositions(0)(incrementPlayWRun)(2) & _
    "), LOT : (" & _
    sJSReplayPositions(0)(incrementPlayLOT)(1) & _
    "," & sJSReplayPositions(0)(incrementPlayLOT)(2) & _
    "), LG : (" & _
    sJSReplayPositions(0)(incrementPlayLG)(1) & "," & _
    sJSReplayPositions(0)(incrementPlayLG)(2) & _
    "), C : (" & _
    sJSReplayPositions(0)(incrementPlayC)(1) & "," & _
    sJSReplayPositions(0)(incrementPlayC)(2) & _
    "), RG : (" & _
    sJSReplayPositions(0)(incrementPlayRG)(1) & "," & _
    sJSReplayPositions(0)(incrementPlayRG)(2) & _
    "), ROT : (" & _
    sJSReplayPositions(0)(incrementPlayROT)(1) & "," & _
    sJSReplayPositions(0)(incrementPlayROT)(2) & _
    "), WR2 : (" & _
    sJSReplayPositions(0)(incrementPlayWRdeux)(1) & "," & _
    sJSReplayPositions(0)(incrementPlayWRdeux)(2) & ")"
   
    If TE > 0 Then
    	incrementPlay = CInt(SetIncrement("TE", MyPosition, MyPositionStats))
        WriteToFile LogName, "*******TE : (" & _
        sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2) & ")"
    End If
   
    'LB shift analysis
    For zz=0 To UBound(lbFielded) 
    	incrementPlay = CInt(SetIncrement(lbFielded(zz), MyPosition, MyPositionStats))
        ilbDelta = ilbDelta + sJSReplayPositions(0)(incrementPlay)(1)
        WriteToFile LogName, lbFielded(zz) & " : (" &sJSReplayPositions(0)(incrementPlay)(1) & "," & sJSReplayPositions(0)(incrementPlay)(2) &")"
    Next
    
    WriteToFile LogName, "Shift X LBs : " & ilbDelta 

    If Abs(ilbDelta) <= 5 Then
        shift = "center"
    Else
        If ilbDelta < 0 Then
            shift = "weak"
        Else
            shift = "strong"
        End If
    End If
    'End LB shift
   
   WriteToFile LogName, "Offensive positions : " & Offense & " -- HB:" & HBCoor(0) &";"& HBCoor(1) & " FB:" & FBCoor(0) &";"& FBCoor(1) & " TE:" & TECoor(0) &";"& TECoor(1) & " dif TE-FB:" & (TECoor(0) - FBCoor(0))
   
    If HB=1 And FB=1 And WR=2 And TE=1 then 'Either Iform, Weak I, pro set or Strong I"
        If (HBCoor(0) = FBCoor(0)) And (Abs(HBCoor(1)) >= 15 And Abs(HBCoor(1)) <= 22) Then
            Offense = "Iform standard"
        Else
            If (HBCoor(0) = FBCoor(0)) And (Abs(HBCoor(1)) >= 23 And Abs(HBCoor(1)) <= 30) Then
            	'Iform Big
                Offense = "Iform standard"
            Else
                If (Abs(TECoor(0) - FBCoor(0)) = 27) And HBCoor(0) = 0  Then
                    Offense = "Weak I"
                Else
                    If (Abs(TECoor(0) - FBCoor(0)) = 13) And HBCoor(0) = 0  Then
                        Offense = "Strong I"
                    Else
                        Offense = "Pro set"
                    End If
                End If
            End If
        End If
    Else
        If HB=1 And FB=0 And WR=3 And TE=1 Then 'Single Back or Shotgun
            If HBCoor(0) = 0 Then
                Offense = "Single back"
            Else
                Offense = "ShotGun"
            End If
        Else
            If HB=1 And FB=0 And TE=2 then
                Offense = "Single back 2TE"
            Else
                If WR=5 then
                    Offense = "5 WR sets"
                Else
                    If TE=2 And FB=2 then
                        Offense = "Kneel Down"
                    Else
                        Offense = "Goaline"  '3 TE (TE-TE2-TE3)
                    End If
                End If
            End If
        End If
    End If
    
    'Let determine the running Gaps for those RBs and FBs
    'WR1 : (-45,1), LOT : (-13,-1), LG : (-6,0), C : (0,0), RG : (6,0), ROT : (13,-1), WR2 : (45,-4), TE (20,-1)
    '1) SL-WR 2) WR-LOT 3) LOT-LG 4) LG-C 5) C-RG 6) RG-ROT 7) ROT-TE 8) TE-WR 9) WR-SL
    'runGap (1 to 10)
    'ScrimmageX
    If Not passAttempt then
        If scrimmageX <= -45 Then
            runGap = 1
        Else
            If scrimmageX > -45 And scrimmageX <= -13 Then
                runGap = 2
            Else
                If scrimmageX > -13 And scrimmageX <= -6 Then
                    runGap = 3
                Else 
                    If scrimmageX > -6 And scrimmageX <= 0 Then
                        runGap = 4
                    Else
                        If scrimmageX > 0 And scrimmageX <= 6 Then
                            runGap = 5
                        Else
                            If scrimmageX > 6 And scrimmageX <= 13 Then
                                runGap = 6
                            Else
                                If scrimmageX > 13 And scrimmageX <= 20 Then
                                    runGap = 7
                                Else
                                    If scrimmageX > 20 And scrimmageX <= 45 Then
                                        runGap = 8
                                    Else
                                        runGap = 9
                                    End If
                                End If
                            End If
                        End If
                    End If
                End If
            End If
        End If
    Else
    
'     Now for passes use approximateYds and xRec
'     3 pixels = 1 yard
'******************************
'     SL---10y---0y---10y----SL
'     |------|----|----|------|
'     |---4--|--7-|-10-|--14--|
'12yds|______|____|____|______|
'     |------|----|----|------|
'     |---3--|--6-|-9--|--13--|
'5 yds|______|____|____|______|
'     |------|----|----|------|
'     |---2--|--5-|-8--|--12--|
'0 yds|______|____|____|______|
'     |------|---------|------|
'     |---1--|---QB----|--11--|
'     |______|---------|______|
'******************************
'     outside left  :   behind : up to 0 short : 0 to 5 medium : 5 to 12  long : 12+    (<-30)        (1 to 4)
'     middle  left  :                    short : 0 to 5 medium : 5 to 12  long : 12+    (-30 to -1)   (5 to 7)
'     middle  right :                    short : 0 to 5 medium : 5 to 12  long : 12+    (0 to 30)     (8 to 10)
'     outside right :   behind : up to 0 short : 0 to 5 medium : 5 to 12  long : 12+    (>30)         (11 to 14)
        
        'outside left
        If xRec < -30 Then
            If approximateYds <= 0 Then
                passWhere = 1
            Else
                If approximateYds > 0 And approximateYds <= 5 Then
                    passWhere = 2
                Else
                    If approximateYds > 5 And approximateYds <= 12 Then
                        passWhere = 3
                    Else
                        passWhere = 4
                    End If
                End If
            End If
        Else
            'middle left
            If xRec >= -30 And xRec < 0 Then
                If  approximateYds <= 5 Then
                    passWhere = 5
                Else
                    If approximateYds > 5 And approximateYds <= 12 Then
                        passWhere = 6
                    Else
                        passWhere = 7
                    End If
                End If
            Else
                'middle right
                If xRec >= 0 And xRec <= 30 Then
                    If  approximateYds <= 5 Then
                        passWhere = 8
                    Else
                        If approximateYds > 5 And approximateYds <= 12 Then
                            passWhere = 9
                        Else
                            passWhere = 10
                        End If
                    End If
                Else
                    'outside right
                    If approximateYds <= 0 Then
                        passWhere = 11
                    Else
                        If approximateYds > 0 And approximateYds <= 5 Then
                            passWhere = 12
                        Else
                            If approximateYds > 5 And approximateYds <= 12 Then
                                passWhere = 13
                            Else
                                'Long pass right > 12 yards
                                passWhere = 14
                            End If
                        End If
                    End If
                End If
            End If
        End If
    End If
    
    End if
       
    'Offense = Offense
    'WriteToFile LogName, "Gaps is : "& runGap &" :: PassWhere: "& passWhere 
    'WriteToFile LogName, "Offense is : " & Offense & " -- HB:" & HB & " FB:" & FB & " WR:" & WR & " TE:" & TE
   
    'CleanupReplays = PlayersPosition
    CleanupReplays = Offense & "::" & defense & "::" & ballCarrier & "::" & sackMaster & "::" & shift & "::Cover " & CoverageShell & "::" & dFocus & "::" & coverageDistance &"::" & TEShift & "::" & runGap & "::" & passWhere & "::" & approximateYds

    WriteToFile LogName, "CleanupReplays: End carrier:" & ballCarrier & " :: Sacker:" & sackMaster & " :: Cover :" & CoverageShell & " :: focus :" & dFocus & " :: distance :" & coverageDistance &" :: TE Shift :" & TEShift & " :: Gap is : "& runGap &" :: Pass is to : "& passWhere 
   
End Function



'*********************** Cleanup PlayList ************************
Sub CleanupPlayList(sPlayByPlayPage, sName, aPlayList, sSession, GameNumber, StartAtPlayByPlay)
    
    'On Error Resume next
    
    WriteToFile LogName, "CleanupPlayList: Begin"
    Dim nLastLocation, sElement, sTable, aPossession, x, bImOffense, sPrimaryTeamOwner, aPlays, nPlayCount, aPlayBreakDown, y, z
    Dim sDown, sYardsToGo, sPlay, sPlayType, sPlayAction, sPlayDirection, sYards, nLastYard
    Dim sAdjustedName, nCebu, aYards, avant, pendant, sReplayLink, sReplayPage, sJSReplayPlayers, sJSReplayPositions, Formation
    Dim sNewText, s1,iChar, nTryAgain, nHolder, tempHolder

    sNewText = ""
    for x=1 to len(sName)
        s1 = Mid(sName, x, 1)
        iChar = Asc(s1)
        s1 = chr(iChar)
        sNewText = sNewText & s1
    Next
    
    'undo escaped characters
    sNewText = Replace(sNewText,"&quot;","""") ' (")
    sNewText = Replace(sNewText,"&#39;","'")  ' (')

    sAdjustedName = Trim(sNewText)
    
    
    nPlayCount = 0 
    nLastLocation = 1
    sElement = "<tr class=""nonalternating_color2 pbp_team"">"
    'Create an array split up by possession
    aPossession = split(sPlayByPlayPage, sElement)
    
    bImOffense = False
    
    ReDim aPlayList(1)
    
    'For each possession
    For x = 1 to UBound(aPossession)
        nLastLocation = 1
        sPrimaryTeamOwner = GetElement(aPossession(x),"<td colspan=""5"">","</td>",nLastLocation)

        'WriteToFile LogName, "^^^^^ BEGIN:" & vbCRLF &  aPossession(x) & vbCRLF & "^^^^^ END"
    
        WriteToFile LogName, "Primary Owner(1) = *" & sPrimaryTeamOwner & "* (" & Len(sPrimaryTeamOwner)& ") Adjusted Name = *" & sAdjustedName & "* (" & Len(sAdjustedName) & ")" 
        
        'Get primary team running offense 
        if Len(sPrimaryTeamOwner) > Len(sAdjustedName) Then
            sPrimaryTeamOwner = Left(sPrimaryTeamOwner, Len(sAdjustedName))
        end if
            
        WriteToFile LogName, "Primary Owner(2) = *" & sPrimaryTeamOwner & "* Adjusted Name = *" & sAdjustedName & "*"
        if sPrimaryTeamOwner = sAdjustedName Then 
            bImOffense = True
        Else
            bImOffense = False
        End if
    
        WriteToFile LogName, "!!!!!!!!!!!!!!!" & sPrimaryTeamOwner & "(" & bImOffense & ")" & " - " & sAdjustedName

        'Break Possesion into Plays
        aPlays = Split(aPossession(x), "pbp_play_row")
 
        if isArray(aPlays) Then

            For y = 1 to UBound(aPlays)
                'make sure the play is a run or pass
                WriteToFile LogName, "Line 2198"
                nLastLocation = instr(1,aPlays(y),"pbp_down")
                if nLastLocation > 0 then 'if run or pass add to play list
                    WriteToFile LogName, "Line 2201"
                    'WriteToFile LogName, aPlays(y)
                    if (Left(aPlays(y),5) <> "_turn") or (Left(aPlays(y),5) = "_turn" and instr(1,aPlays(y),"sacked by") > 1) then 
                        WriteToFile LogName, "Line 2204"
                        sPlay = GetElement(aPlays(y), "<td class=""pbp_play"">", "<", 1)
                        sPlay = Replace(sPlay, "no loss", "0 yd gain")
                        
                        if instr(1,sPlay,"Punt")=0 and instr(1,sPlay,"goal")=0 and instr(1,sPlay,"penalty")=0 and _
                          instr(1,sPlay,"intercepted")=0 and instr(1,sPlay,"fumble")=0 and _
                          instr(1,sPlay,"calls timeout")=0 and instr(1,sPlay,"spikes ball")=0 and instr(1,sPlay,"Timeout Called")=0 then 'we don't want to count special teams stuff
                            WriteToFile LogName, "Line 2211"
                            nPlayCount = nPlayCount + 1
                            ReDim Preserve aPlayList(nPlayCount)
							
                            if GameNumber > StartAtPlayByPlay then
                                
                                nTryAgain = 1
                                Do while nTryAgain <=10
                                    WriteToFile LogName, "Line 2219"
                                    'GETTING FORMATIONS INFORMATIONS
                                    nHolder = nLastLocation
                                    sReplayLink = GLB_FQDN & GetElement(aPlays(y),"<td class=""pbp_replay""><a href=""",""">Replay</a></td>",nLastLocation)
                                    'WriteToFile LogName, "^^^^^ replay: " & sReplayLink
                                    sReplayPage=HTTPGet(0,sReplayLink, sSession)
                                
                                    if instr(1, sReplayPage, "we were unable to process the redirection")>1 then 
                                        nTryAgain = nTryAgain + 1
                                        WriteToFile LogName, "$%^ Trying again"
                                        nLastLocation = nHolder
                                    else
                                        nTryAgain = 11
                                    end if
                                Loop
                                
                                'WriteToFile LogName, "sReplayPage1=**" & sReplayPage & "**"
                                sJSReplayPlayers = GetElement(sReplayPage,"var players = {","};",nLastLocation)
                                'sJSReplayPlayers = GetElement(sReplayPage,"var players = {","};",1)
                                WriteToFile LogName, "Line 2238"
                                'WriteToFile LogName, "sJSReplayPlayers=" & sJSReplayPlayers
                                'removing COMMAs from player names!
                                sJSReplayPlayers = Replace(sJSReplayPlayers, ",'}", "'}")
                                sJSReplayPlayers = split(sJSReplayPlayers,",'")
                                'WriteToFile LogName, "sReplayPage2=" & sReplayPage
                                sJSReplayPositions = GetElement(sReplayPage,"var play_data = [","];",nLastLocation)
                                'sJSReplayPositions = GetElement(sReplayPage,"var play_data = [","];",1)
                                WriteToFile LogName, "Line 2246"
                                'WriteToFile LogName, "sJSReplayPositions=" & sJSReplayPositions
                                sJSReplayPositions = split(sJSReplayPositions,"]")
                                For z=0 To UBound(sJSReplayPositions)
                                    'Split the ticks by player with },{
                                    'WriteToFile LogName, "sJSReplayPositions(" & z & ")=" & sJSReplayPositions(z)
                                    sJSReplayPositions(z) = Split(sJSReplayPositions(z),"},{")
                                Next
                                WriteToFile LogName, "Line 2254"
                                If (UBound(sJSReplayPlayers) > 1) Then
                                    'Offense & "::" & defense & "::" & ballCarrier & "::" & sackMaster & "::" & shift & "::Cover " & CoverageShell & 
                                    '"::" & dFocus & "::" & coverageDistance &"::" & TEShift & "::" & runGap & "::" & passWhere & "::" & approximateYds
                                    Formation = CleanupReplays(sJSReplayPlayers, sJSReplayPositions, 0, sPlay)
                                Else
                                    Formation =  "NA::NA::NA::NA::NA::NA::NA::NA::NA::NA::NA::NA"
                                    WriteToFile LogName, "!@# Erreur on HTML GET, returned nothing."
                                End If
                                WriteToFile LogName, "!@# Formation: " & Formation 
                                'WriteToFile LogName, "^^^^^ JS players:" & sJSReplayPlayers(0)(0)
                                'WriteToFile LogName, "^^^^^ JS positions:" & sJSReplayPositions(0)(0)(0) & " - " & sJSReplayPositions(0)(0)(1) & " - " & sJSReplayPositions(0)(0)(2)
                            else
                                Formation = "NA::NA::NA::NA::NA::NA::NA::NA::NA::NA::NA::NA"
                            end if

                            'Build String Offense(T/F) :: Down(1-4) :: Yards :: Play Action (rush/pass) :: Play Type (inside/outside | Short/medium/long) :: Direction (Left/Right/Middle) :: Yards To Go

                            'Get Down
                            sDown = GetElement(aPlays(y), "<td class=""pbp_down"">", "<", 1)
                            sYardsToGo = Right(sDown,Len(sDown)-6)
                            
                            'Yards switch to approximative yards.
                            tempHolder = Split(Formation, "::")
                            'Get Yards
                            nLastYard = 1
                            
                            aYards = split(sPlay,"(") 'This is needed to make sure we are pulling tackle correctly
                            if UBound(aYards)<=1 then 'if this is true then a normal play
                                WriteToFile LogName, "@@ No extras " + sPlay & " line 2101"
                                sYards = GetElement(sPlay,"(",")",nLastYard)
                            else 'if this is true then a play with other "()" defined which could be a special ability or in a player name
                                if instr(1,aYards(UBound(aYards)),"tackle")>0 Then 'if this is true we are looking at a special ability
                                    WriteToFile LogName, "@@ Extra but not a player name " + sPlay
                                    sYards = aYards(UBound(aYards))
                                    nLastYard = Instr(1,sYards,")")
                                    sYards = Left(sYards, nLastYard)
                                else 'if this is true we are looking at a player name that did the tackle
                                    WriteToFile LogName, "@@ Extra Checking what the correct parse is " + sPlay
                                    sYards = aYards(UBound(aYards))
                                    if instr(1,sYards,"yd gain")>0 or instr(1,sYards,"incomplete")>0 then
                                        WriteToFile LogName, "Last Spot"
                                        sYards = aYards(UBound(aYards))
                                    else
                                        WriteToFile LogName, "Last Spot - 1"
                                        sYards = aYards(UBound(aYards)-1)
                                    end if
                                    nLastYard = Instr(1,sYards,")")
                                    sYards = Left(sYards, nLastYard)
                                end if
                            end if

                                                        
                            WriteToFile LogName, "+++++++++++++++++++++++  " & sYards &" ++++++"                          
                            
                            if instr(1,sYards,"no gain")>0 or instr(1,sYards,"incomplete")>0 then
                                sYards = 0
                            elseif instr(1,sYards,"gain")>0 then
                                sYards = Left(sYards, LEN(sYards) - 8)
                            else
                                if instr(1,sYards,"yd") > 0 then
                                    sYards = "-" & Left(sYards, LEN(sYards) - 8)
                                else
                                    sYards = GetElement(sPlay,"(",")",nLastYard)
                                    if instr(1,sYards,"no gain")>0 or instr(1,sYards,"incomplete")>0 then
                                        sYards = 0
                                    else
                                        if instr(1,sYards,"yd") > 0 Then
                                            sYards = "-" & Left(sYards, LEN(sYards) - 8)
                                        else
                                            sYards = 0 
                                        end if
                                    end if
                                end if
                            end If
                            
                            'If Trim(tempHolder(11))<>"NA" then
                            '    sYards = tempHolder(11)
                            '    sYards = Trim(sYards)
                            'End If
                            
                            'French OS adjustment
                            if Language = "French" Then 
                                sYards = Replace(sYards, ".", ",")
                            End If
                            
                            'Action: " & sPlay & " 
                            WriteToFile LogName, "+++++++++++++++++++++++ Yards ( " & sYards & " ) ++++++"                          
                            'Get Play Action / Type
                            if instr(1,sPlay,"rush")>1 then
                                sPlayAction = "rush"
                                sPlayType = "inside"
                            elseif instr(1,sPlay,"pitch")>1 then 
                                sPlayAction = "rush"
                                sPlayType = "outside"
                            elseif instr(1,sPlay,"pass")>1 then 
                                sPlayAction = "pass"
                                
                                if CInt(sYards) <=5 then
                                    sPlayType = "short"
                                elseif CInt(sYards) > 5 and CINT(sYards) < 12 then
                                    sPlayType = "medium"
                                else
                                    sPlayType = "long"
                                end if
                                
                                if instr(1,sPlay,"incomplete")>0 then 
                                    sPlayType = "incomplete"
                                end if
                                
                            else
                                sPlayAction = "unknown"
                                sPlayType = "unknown"
                            end if

                            'Direction
                            if instr(1,sPlay,"left") then
                                sPlayDirection = "left"
                            elseif instr(1,sPlay,"right") then
                                sPlayDirection = "right"
                            else
                                sPlayDirection = "middle"                                
                            end If
                            
                                                            
                            'Adding formation information to current data passed back to function in variable aPlayList
                            aPlayList(nPlayCount) = bImOffense & "::" & Left(sDown,1) & "::" &  sYards & "::" & sPlayAction & "::" & sPlayType & "::" & sPlayDirection & "::" & sYardsToGo & "::" & Formation
    
                            WriteToFile LogName, "    **** " & aPlayList(nPlayCount)
                            
                        end if
                        
                    End if
                    
                End if
            Next
            
        End if

    Next 

    WriteToFile LogName, "CleanupPlayList: End"
    
'    If Err.Number > 0 Then
'	    GetDataFromURL = "HTTPGet : Error, " & Err.Number & " " & Err.Source & " " & _
'	    Err.Description & " sYards : " & sYards
'	    WriteToFile LogName, GetDataFromURL
'	End If
    
End Sub

'*********************** GetGameBreakDown ************************
Sub GetGameBreakDown(sSession, sPage, sName, bRegularGame)
    
    WriteToFile LogName, "GetGameBreakDown: Begin"

    Dim nLastLocation, sElement, sTable, aRows, x, y, sGame, nTotalGames, sPlayByPlayPage
    Dim aPlayList, nInsideRunCount, nInsideRunTotal, sOutput
    Dim nGames, aPlay, nSideOfBall
    Dim nInsideRun_FirstDown_Count, nOutsideRun_FirstDown_Count, nOutsideRun_FirstDown_Yards, nInsideRun_FirstDown_Yards 
    Dim nMediumPass_FirstDown_Count, nMediumPass_FirstDown_Yards, nShortPass_FirstDown_Count, nShortPass_FirstDown_Yards, nLongPass_FirstDown_Count, nLongPass_FirstDown_Yards 
    Dim nTotalRunCount, nTotalInsideRunCount, nTotalOutSideRunCount, nTotalInsideRunYards, nTotalOutSideRunYards, nTotalRunYards
    Dim nTotalShortPassCount, nTotalMediumPassCount, nTotalLongPassCount, nTotalPassCount, nTotalRun_FirstDown_Count, nTotalPass_FirstDown_Count
    Dim nTotalShortPassYards, nTotalMediumPassYards, nTotalLongPassYards, nTotalPassYards , nTotalPlayCount  
    Dim nIncompletePass_FirstDown_Yards, nIncompletePass_FirstDown_Count, nTotalIncompletePassCount

    Dim nInsideRun_SecondDown_Count, nOutsideRun_SecondDown_Count, nOutsideRun_SecondDown_Yards, nInsideRun_SecondDown_Yards, nIncompletePass_SecondDown_Yards, nIncompletePass_SecondDown_Count
    Dim nMediumPass_SecondDown_Count, nMediumPass_SecondDown_Yards, nShortPass_SecondDown_Count, nShortPass_SecondDown_Yards, nLongPass_SecondDown_Count, nLongPass_SecondDown_Yards 
    Dim nTotalRun_SecondDown_Count, nTotalPass_SecondDown_Count

    Dim nInsideRun_ThirdDown_Count, nOutsideRun_ThirdDown_Count, nOutsideRun_ThirdDown_Yards, nInsideRun_ThirdDown_Yards, nIncompletePass_ThirdDown_Yards, nIncompletePass_ThirdDown_Count
    Dim nMediumPass_ThirdDown_Count, nMediumPass_ThirdDown_Yards, nShortPass_ThirdDown_Count, nShortPass_ThirdDown_Yards, nLongPass_ThirdDown_Count, nLongPass_ThirdDown_Yards 
    Dim nTotalRun_ThirdDown_Count, nTotalPass_ThirdDown_Count

    Dim nInsideRun_FourthDown_Count, nOutsideRun_FourthDown_Count, nOutsideRun_FourthDown_Yards, nInsideRun_FourthDown_Yards, nIncompletePass_FourthDown_Yards, nIncompletePass_FourthDown_Count
    Dim nMediumPass_FourthDown_Count, nMediumPass_FourthDown_Yards, nShortPass_FourthDown_Count, nShortPass_FourthDown_Yards, nLongPass_FourthDown_Count, nLongPass_FourthDown_Yards 
    Dim nTotalRun_FourthDown_Count, nTotalPass_FourthDown_Count
    
    Dim nTotalPassComp_FirstDown_Count, nTotalPassComp_SecondDown_Count, nTotalPassComp_ThirdDown_Count, nTotalPassComp_FourthDown_Count, nTotalPassCompCount, nBlitzer
    
    Dim aOffensiveFormations, nOFormation, nDistanceToGo, nGap, nPassZone, nAction, a,b,c,d,e, aDefensiveFormations, sBlitzer, aBlitzer, sTrue, nBlitzSpot, nSuccess
    
    Dim sOutputBlitzSuccess, offTarget, succesCompare, sOutputDef

    if Language = "French" Then
    	If LanguageExt(1)="fr" Then
			sTrue = "Vrai"
		Else 
			sTrue = "True"
		End If 
    else
		sTrue = "True"
    end if

    nInsideRun_FirstDown_Count = 0
    nInsideRun_FirstDown_Yards = 0 
    nOutsideRun_FirstDown_Count = 0 
    nOutsideRun_FirstDown_Yards = 0 
    
    nShortPass_FirstDown_Count = 0 
    nShortPass_FirstDown_Yards = 0
    nMediumPass_FirstDown_Count = 0
    nMediumPass_FirstDown_Yards = 0
    nLongPass_FirstDown_Count = 0
    nLongPass_FirstDown_Yards = 0
    nIncompletePass_FirstDown_Count = 0
    nIncompletePass_FirstDown_Yards = 0
           

    nInsideRun_SecondDown_Count = 0
    nInsideRun_SecondDown_Yards = 0 
    nOutsideRun_SecondDown_Count = 0 
    nOutsideRun_SecondDown_Yards = 0 
    
    nShortPass_SecondDown_Count = 0 
    nShortPass_SecondDown_Yards = 0
    nMediumPass_SecondDown_Count = 0
    nMediumPass_SecondDown_Yards = 0
    nLongPass_SecondDown_Count = 0
    nLongPass_SecondDown_Yards = 0
    nIncompletePass_SecondDown_Count = 0
    nIncompletePass_SecondDown_Yards = 0


    nInsideRun_ThirdDown_Count = 0
    nInsideRun_ThirdDown_Yards = 0 
    nOutsideRun_ThirdDown_Count = 0 
    nOutsideRun_ThirdDown_Yards = 0 
    
    nShortPass_ThirdDown_Count = 0 
    nShortPass_ThirdDown_Yards = 0
    nMediumPass_ThirdDown_Count = 0
    nMediumPass_ThirdDown_Yards = 0
    nLongPass_ThirdDown_Count = 0
    nLongPass_ThirdDown_Yards = 0
    nIncompletePass_ThirdDown_Count = 0
    nIncompletePass_ThirdDown_Yards = 0

    nInsideRun_FourthDown_Count = 0
    nInsideRun_FourthDown_Yards = 0 
    nOutsideRun_FourthDown_Count = 0 
    nOutsideRun_FourthDown_Yards = 0 
    
    nShortPass_FourthDown_Count = 0 
    nShortPass_FourthDown_Yards = 0
    nMediumPass_FourthDown_Count = 0
    nMediumPass_FourthDown_Yards = 0
    nLongPass_FourthDown_Count = 0
    nLongPass_FourthDown_Yards = 0
    nIncompletePass_FourthDown_Count = 0
    nIncompletePass_FourthDown_Yards = 0

    WriteToFile LogName, "GetGameBreakDown: initialised variables"

    
    'Get Game Schedules 
    nLastLocation = 1
    sElement = "<table class=""schedule_content"" cellspacing=""0"" cellpadding=""0"">"
    sTable = GetElement(sPage, sElement, "</table>", nLastLocation)
    
    if bRegularGame=1 then 'Run for regular games
        WriteToFile LogName, "Regular Game " & vbcrlf & "*" & sTable & "*"
        
        aRows = split(sTable, "<tr")
        
        For x=2 to UBound(aRows)
            sGame = ""
            sElement = "<a href=""/game/game.pl?game_id="
            
            nLastLocation = instr(1, aRows(x), sElement)
    
            if nLastLocation > 0 then
                nTotalGames = x
                nLastLocation = 1
                sGame = GLB_FQDN & "/game/game.pl?game_id=" & GetElement(aRows(x), sElement, """>", nLastLocation) &  "&mode=pbp"
            end if
    
            aRows(x) = sGame
    
        Next
    else
        'we need to get the next table for the scrimages
        sTable = GetElement(sPage, sElement, "</table>", nLastLocation)
        
        WriteToFile LogName, "Regular Game " & vbcrlf & "*" & sTable & "*"
        
        aRows = split(sTable, "<tr")
        
        For x=2 to UBound(aRows)
            sGame = ""
            sElement = "<a href=""/game/game.pl?game_id="
            
            nLastLocation = instr(1, aRows(x), sElement)
    
            if nLastLocation > 0 then
                nTotalGames = x
                nLastLocation = 1
                sGame = GLB_FQDN & "/game/game.pl?game_id=" & GetElement(aRows(x), sElement, """>", nLastLocation) &  "&mode=pbp"
            end if
    
            aRows(x) = sGame
    
        Next
    end if
    
    If nTotalGames < 2 then 
        WriteToFile GamePlanName, "No games found"
        WriteToFile LogName, "GetGameBreakDown: End"
        Exit Sub
    end if
    
    nGames = 0

    WriteToFile PlayByPlayOffLog, "Offense,Down,YardsToGo,Action,Type,Direction,BallCarrier"

    'aOffensiveFormations(Formation, Down, Distance To Go, Pass, Run, Success)
    
    '*** Formation ***
    '0 5 WR sets
    '1 Goaline
    '2 Iform Big
    '3 Iform standard
    '4 Pro set
    '5 ShotGun
    '6 Single back
    '7 Single back 2TE
    '8 Strong I
    '9 Weak I
    '-  Kneel Down (Not Counted)
    
    '*** Down ***
    '0 - not used
    '1 - first down
    '2 - etc.
    '3 - etc.
    '4 - etc.
    
    '*** Distance To Go ***
    '0 Short
    '1 Medium
    '2 Long
    '3 Very Long
    '4 Goal
    
    '*** Pass ***
    '0 Not used
    '1 Incomplete
    '2 short
    '3 medium
    '4 long
    
    '*** Run ***
    '0 Not Used
    '1 Left
    '2 Middle
    '3 Right
    
    '*** Success Rate ***
    '0 Not Used
    '1 Success Rate Counter
    
    ReDim aOffensiveFormations(11,5,5,9,15,10,3)

    aOffensiveFormations(1,0,0,0,0,0,0) = "5 WR sets"
    aOffensiveFormations(2,0,0,0,0,0,0) = "Goaline"
    aOffensiveFormations(3,0,0,0,0,0,0) = "Iform Big"
    aOffensiveFormations(4,0,0,0,0,0,0) = "Iform standard"
    aOffensiveFormations(5,0,0,0,0,0,0) = "Pro set"
    aOffensiveFormations(6,0,0,0,0,0,0) = "ShotGun"
    aOffensiveFormations(7,0,0,0,0,0,0) = "Single back"
    aOffensiveFormations(8,0,0,0,0,0,0) = "Single back 2TE"
    aOffensiveFormations(9,0,0,0,0,0,0) = "Strong I"
    aOffensiveFormations(10,0,0,0,0,0,0) = "Weak I"
    
    aOffensiveFormations(0,1,0,0,0,0,0) = "First"
    aOffensiveFormations(0,2,0,0,0,0,0) = "Second"
    aOffensiveFormations(0,3,0,0,0,0,0) = "Third"
    aOffensiveFormations(0,4,0,0,0,0,0) = "Fourth"
    
    aOffensiveFormations(0,0,0,0,0,0,0) = "Short"
    aOffensiveFormations(0,0,1,0,0,0,0) = "Medium"
    aOffensiveFormations(0,0,2,0,0,0,0) = "Long"
    aOffensiveFormations(0,0,3,0,0,0,0) = "Very Long"
    aOffensiveFormations(0,0,4,0,0,0,0) = "Goal"
    
    'Ball carriers
    aOffensiveFormations(0,0,0,1,0,0,0) = "QB"
    aOffensiveFormations(0,0,0,2,0,0,0) = "HB"
    aOffensiveFormations(0,0,0,3,0,0,0) = "FB"
    aOffensiveFormations(0,0,0,4,0,0,0) = "WR1"
    aOffensiveFormations(0,0,0,5,0,0,0) = "WR2"
    aOffensiveFormations(0,0,0,6,0,0,0) = "WR3"
    aOffensiveFormations(0,0,0,7,0,0,0) = "WR4"
    aOffensiveFormations(0,0,0,8,0,0,0) = "WR5"
    aOffensiveFormations(0,0,0,9,0,0,0) = "TE"

'**********My version****Mem error*******************
'    ReDim aOffensiveFormations(11,5,5,5,4,2,9,9,14)

'    aOffensiveFormations(1,0,0,0,0,0,0,0) = "5 WR sets"
'    aOffensiveFormations(2,0,0,0,0,0,0,0) = "Goaline"
'    aOffensiveFormations(3,0,0,0,0,0,0,0) = "Iform Big"
'    aOffensiveFormations(4,0,0,0,0,0,0,0) = "Iform standard"
'    aOffensiveFormations(5,0,0,0,0,0,0,0) = "Pro set"
'    aOffensiveFormations(6,0,0,0,0,0,0,0) = "ShotGun"
'    aOffensiveFormations(7,0,0,0,0,0,0,0) = "Single back"
'    aOffensiveFormations(8,0,0,0,0,0,0,0) = "Single back 2TE"
'    aOffensiveFormations(9,0,0,0,0,0,0,0) = "Strong I"
'    aOffensiveFormations(10,0,0,0,0,0,0,0) = "Weak I"
    
'    aOffensiveFormations(0,1,0,0,0,0,0,0) = "First"
'    aOffensiveFormations(0,2,0,0,0,0,0,0) = "Second"
'    aOffensiveFormations(0,3,0,0,0,0,0,0) = "Third"
'    aOffensiveFormations(0,4,0,0,0,0,0,0) = "Fourth"
    
'    aOffensiveFormations(0,0,0,0,0,0,0,0) = "Short"
'    aOffensiveFormations(0,0,1,0,0,0,0,0) = "Medium"
'    aOffensiveFormations(0,0,2,0,0,0,0,0) = "Long"
'    aOffensiveFormations(0,0,3,0,0,0,0,0) = "Very Long"
'    aOffensiveFormations(0,0,4,0,0,0,0,0) = "Goal"
    
    'Ball carriers
'    aOffensiveFormations(0,0,0,0,0,1,0,0) = "QB"
'    aOffensiveFormations(0,0,0,0,0,2,0,0) = "HB"
'    aOffensiveFormations(0,0,0,0,0,3,0,0) = "FB"
'    aOffensiveFormations(0,0,0,0,0,4,0,0) = "WR1"
'    aOffensiveFormations(0,0,0,0,0,5,0,0) = "WR2"
'    aOffensiveFormations(0,0,0,0,0,6,0,0) = "WR3"
'    aOffensiveFormations(0,0,0,0,0,7,0,0) = "WR4"
'    aOffensiveFormations(0,0,0,0,0,8,0,0) = "WR5"
'    aOffensiveFormations(0,0,0,0,0,9,0,0) = "TE"
    
    'Running gaps
    '1) SL-WR 2) WR-LOT 3) LOT-LG 4) LG-C 5) C-RG 6) RG-ROT 7) ROT-TE 8) TE-WR 9) WR-SL
'    aOffensiveFormations(0,0,0,0,0,0,1,0) = "Out-WR1"
'    aOffensiveFormations(0,0,0,0,0,0,2,0) = "WR1-LOT"
'    aOffensiveFormations(0,0,0,0,0,0,3,0) = "LOT-LG"
'    aOffensiveFormations(0,0,0,0,0,0,4,0) = "LG-C"
'    aOffensiveFormations(0,0,0,0,0,0,5,0) = "C-RG"
'    aOffensiveFormations(0,0,0,0,0,0,6,0) = "RG-ROT"
'    aOffensiveFormations(0,0,0,0,0,0,7,0) = "ROT-TE"
'    aOffensiveFormations(0,0,0,0,0,0,8,0) = "TE-WR2"
'    aOffensiveFormations(0,0,0,0,0,0,9,0) = "WR2-Out"
    
    'Passing Zones
'    aOffensiveFormations(0,0,0,0,0,0,0,1) = "Flat left"
'    aOffensiveFormations(0,0,0,0,0,0,0,2) = "Short left"
'    aOffensiveFormations(0,0,0,0,0,0,0,3) = "Medium left"
'    aOffensiveFormations(0,0,0,0,0,0,0,4) = "Long left"
'    aOffensiveFormations(0,0,0,0,0,0,0,5) = "Short left middle"
'    aOffensiveFormations(0,0,0,0,0,0,0,6) = "Medium left middle"
'    aOffensiveFormations(0,0,0,0,0,0,0,7) = "Long left middle"
'    aOffensiveFormations(0,0,0,0,0,0,0,8) = "Short right middle"
'    aOffensiveFormations(0,0,0,0,0,0,0,9) = "Medium right middle"
'    aOffensiveFormations(0,0,0,0,0,0,0,10) = "Long right middle"
'    aOffensiveFormations(0,0,0,0,0,0,0,11) = "Flat right"
'    aOffensiveFormations(0,0,0,0,0,0,0,12) = "Short right"
'    aOffensiveFormations(0,0,0,0,0,0,0,13) = "Medium right"
'    aOffensiveFormations(0,0,0,0,0,0,0,14) = "Long right"

    WriteToFile PlayByPlayDefLog, "Defense,Down,YardsToGo,Offense,Sacker"
    'aDefensiveFormations(OffensiveFormation, Down, Distance To Go, DefensiveFormation, Blitzer, Success Rate)

    '*** Down ***
    '0 - not used
    '1 - first down
    '2 - etc.
    '3 - etc.
    '4 - etc.
    
    '*** Distance To Go ***
    '0 Short
    '1 Medium
    '2 Long
    '3 Very Long
    '4 Goal
    
    '*** Offensive Formation ***
    '0 5 WR sets
    '1 Goaline
    '2 Iform Big
    '3 Iform standard
    '4 Pro set
    '5 ShotGun
    '6 Single back
    '7 Single back 2TE
    '8 Strong I
    '9 Weak I
    '-  Kneel Down (Not Counted)

    '*** Defensive Formation ***
    '0 Not Used
    '1 3-4-4
    '2 4-3-4
    '3 4-2-5
    '4 4-1-6
    '5 3-1-7
    '6 3-3-5
    '7 3-2-6
    '8 GoalLine

    '*** Blitzer ***
    '0 Not Used
    '1 CB1
    '2 CB2
    '3 CB3
    '4 CB4
    '5 CB5
    '6 SS
    '7 FS
    '8 LOLB
    '9 ROLB    
    '10 LILB
    '11 RILB
    '12 MLB
    '13 RDE
    '14 LDE
    '15 DT
    '16 NT

    '*** Success Rate ***
    '0 Not Used
    '1 Success Rate Counter
    
    '*** Pass/Run ***
    '0 Not Used
    '1 Pass
    '2 Run

    ReDim aDefensiveFormations(11,5,5,24,16,2,3)

    aDefensiveFormations(1,0,0,0,0,0,0) = "5 WR sets"
    aDefensiveFormations(2,0,0,0,0,0,0) = "Goaline"
    aDefensiveFormations(3,0,0,0,0,0,0) = "Iform Big"
    aDefensiveFormations(4,0,0,0,0,0,0) = "Iform standard"
    aDefensiveFormations(5,0,0,0,0,0,0) = "Pro set"
    aDefensiveFormations(6,0,0,0,0,0,0) = "ShotGun"
    aDefensiveFormations(7,0,0,0,0,0,0) = "Single back"
    aDefensiveFormations(8,0,0,0,0,0,0) = "Single back 2TE"
    aDefensiveFormations(9,0,0,0,0,0,0) = "Strong I"
    aDefensiveFormations(10,0,0,0,0,0,0) = "Weak I"
    
    aDefensiveFormations(0,1,0,0,0,0,0) = "First"
    aDefensiveFormations(0,2,0,0,0,0,0) = "Second"
    aDefensiveFormations(0,3,0,0,0,0,0) = "Third"
    aDefensiveFormations(0,4,0,0,0,0,0) = "Fourth"
    
    aDefensiveFormations(0,0,0,0,0,0,0) = "Short"
    aDefensiveFormations(0,0,1,0,0,0,0) = "Medium"
    aDefensiveFormations(0,0,2,0,0,0,0) = "Long"
    aDefensiveFormations(0,0,3,0,0,0,0) = "Very Long"
    aDefensiveFormations(0,0,4,0,0,0,0) = "Goal"

    aDefensiveFormations(0,0,0,1,0,0,0) = "3-4-4 (center)"
    aDefensiveFormations(0,0,0,2,0,0,0) = "3-4-4 (strong)"
    aDefensiveFormations(0,0,0,3,0,0,0) = "3-4-4 (weak)"
    aDefensiveFormations(0,0,0,4,0,0,0) = "4-3-4 (center)"
    aDefensiveFormations(0,0,0,5,0,0,0) = "4-3-4 (strong)"
    aDefensiveFormations(0,0,0,6,0,0,0) = "4-3-4 (weak)"
    aDefensiveFormations(0,0,0,7,0,0,0) = "4-2-5 (center)"
    aDefensiveFormations(0,0,0,8,0,0,0) = "4-2-5 (strong)"
    aDefensiveFormations(0,0,0,9,0,0,0) = "4-2-5 (weak)"
    aDefensiveFormations(0,0,0,10,0,0,0) = "4-1-6 (center)"
    aDefensiveFormations(0,0,0,11,0,0,0) = "4-1-6 (strong)"
    aDefensiveFormations(0,0,0,12,0,0,0) = "4-1-6 (weak)"
    aDefensiveFormations(0,0,0,13,0,0,0) = "3-1-7 (center)"
    aDefensiveFormations(0,0,0,14,0,0,0) = "3-1-7 (strong)"
    aDefensiveFormations(0,0,0,15,0,0,0) = "3-1-7 (weak)"
    aDefensiveFormations(0,0,0,16,0,0,0) = "3-3-5 (center)"
    aDefensiveFormations(0,0,0,17,0,0,0) = "3-3-5 (strong)"
    aDefensiveFormations(0,0,0,18,0,0,0) = "3-3-5 (weak)"
    aDefensiveFormations(0,0,0,19,0,0,0) = "3-2-6 (center)"
    aDefensiveFormations(0,0,0,20,0,0,0) = "3-2-6 (strong)"
    aDefensiveFormations(0,0,0,21,0,0,0) = "3-2-6 (weak)"
    aDefensiveFormations(0,0,0,22,0,0,0) = "GoalLine (center)"
    aDefensiveFormations(0,0,0,23,0,0,0) = "GoalLine (strong)"
    aDefensiveFormations(0,0,0,24,0,0,0) = "GoalLine (weak)"

    aDefensiveFormations(0,0,0,0,1,0,0) = "CB1"
    aDefensiveFormations(0,0,0,0,2,0,0) = "CB2"
    aDefensiveFormations(0,0,0,0,3,0,0) = "CB3"
    aDefensiveFormations(0,0,0,0,4,0,0) = "CB4"
    aDefensiveFormations(0,0,0,0,5,0,0) = "CB5"
    aDefensiveFormations(0,0,0,0,6,0,0) = "SS"
    aDefensiveFormations(0,0,0,0,7,0,0) = "FS"
    aDefensiveFormations(0,0,0,0,8,0,0) = "LOLB"
    aDefensiveFormations(0,0,0,0,9,0,0) = "ROLB"
    aDefensiveFormations(0,0,0,0,10,0,0) = "LILB"
    aDefensiveFormations(0,0,0,0,11,0,0) = "RILB"
    aDefensiveFormations(0,0,0,0,12,0,0) = "MLB"
    aDefensiveFormations(0,0,0,0,13,0,0) = "RDE"
    aDefensiveFormations(0,0,0,0,14,0,0) = "LDE"
    aDefensiveFormations(0,0,0,0,15,0,0) = "DT"
    aDefensiveFormations(0,0,0,0,16,0,0) = "NT"
    
'    aDefensiveFormations(0,0,0,0,0,0,0,1) = "weak"
'    aDefensiveFormations(0,0,0,0,0,0,0,2) = "center"
'    aDefensiveFormations(0,0,0,0,0,0,0,3) = "strong"


    sOutputBlitzSuccess = ""

    'Get Game Stats
    For x = 2 to nTotalGames
        
        WriteToFile LogName, "######################" & aRows(x) &  "#####################"
        sPlayByPlayPage=HTTPGet(0,aRows(x), sSession)
        
        'gets populated by the cleanupPlayList function
        set aPlayList = nothing
        
        'Calling the cleanup Play list function that returns the game data and formation analysis.
        'bImOffense & "::" & Left(sDown,1) & "::" &  sYards & "::" & sPlayAction & "::" & sPlayType & "::" & sPlayDirection & "::" & sYardsToGo & "::" & 
        'Offense & "::" & defense & "::" & ballCarrier & "::" & sackMaster & "::" & shift & "::Cover " & CoverageShell & 
        '"::" & dFocus & "::" & coverageDistance &"::" & TEShift & "::" & runGap & "::" & passWhere & "::" & approximateYds
        CleanupPlayList sPlayByPlayPage, sName, aPlayList, sSession, x, nTotalGames-PlayByPlayHistory
        
        nGames = nGames + 1 
        
        WriteToFile LogName, "*** Total Rows: " & UBound(aPlayList)
        
        
        For y = 1 to UBound(aPlayList)
            WriteToFile LogName, "Row(" & y & "):" & aPlayList(y)

            'Offense(T/F) :: Down(1-4) :: Yards :: Play Action (rush/pass) :: Play Type (inside/outside | short/medium/long) :: Direction (Left/Right/Middle) 
            ':: Yards to Go :: Offense Formation :: Defense Formation (Blitzers) :: Carrier :: Sacker
            aPlay = Split(aPlayList(y), "::")
            if aPlay(0) = sTrue then
                nSideOfBall = 0
            else
                nSideOfBall = 1
            end if

            WriteToFile LogName, "<<<Play recap>>>"
            WriteToFile LogName, "Side of ball: " & nSideOfBall & "::" & aPlay(0)
            WriteToFile LogName, "Down:**" & aPlay(1) & "**"
            WriteToFile LogName, "Yards: " & aPlay(2) 
            WriteToFile LogName, "Play (run): " & aPlay(3)
            WriteToFile LogName, "Type (inside): " & aPlay(4)
            WriteToFile LogName, "Direction (middle): " & aPlay(5)
            WriteToFile LogName, "Yards to go: " & aPlay(6)
            WriteToFile LogName, "Offense: " & aPlay(7)
            WriteToFile LogName, "Blitzer: " & aPlay(8)
            WriteToFile LogName, "Ball Carrier: " & aPlay(9)
            WriteToFile LogName, "Sacker: " & aPlay(10)
            WriteToFile LogName, "Shift: " & aPlay(11)
            WriteToFile LogName, "Shell: " & aPlay(12)
            WriteToFile LogName, "Focus: " & aPlay(13)
            WriteToFile LogName, "Distance: " & aPlay(14)
            WriteToFile LogName, "TE on: " & aPlay(15)
            WriteToFile LogName, "Run to: " & aPlay(16)
            WriteToFile LogName, "Pass to: " & aPlay(17)
            WriteToFile LogName, "Approximative yards: " & aPlay(18)
            
            if aPlay(7)<>"NA" then
            
                nSuccess = 0
                offTarget = 0

                Select Case aPlay(7)
                    Case "5 WR sets"
                        nOFormation = 1
                    Case "Goaline"
                        nOFormation = 2
                    Case "Iform Big"
                        nOFormation = 3
                    Case "Iform standard"
                        nOFormation = 4
                    Case "Pro set"
                        nOFormation = 5
                    Case "ShotGun"
                        nOFormation = 6
                    Case "Single back"
                        nOFormation = 7
                    Case "Single back 2TE"
                        nOFormation = 8
                    Case "Strong I"
                        nOFormation = 9
                    Case "Weak I"
                        nOFormation = 10
                    Case "Kneel Down (Not Counted)"
                        nOFormation = 11
                End select 
                
                'On Error Resume Next
                
                If aPlay(6)="G" then aPlay(6) = -1
                If aPlay(6)="inches" then aPlay(6) = 0
                if Language = "French" Then 
                	aPlay(6) = Replace(aPlay(6), ".", ",")
					aPlay(2) = Replace(aPlay(2), ".", ",")
            	end if
                
                if aPlay(6) = -1 then 
                    nDistanceToGo = 4 'Goal
                elseif aPlay(6)>=0 and aPlay(6)<=3 then
                    nDistanceToGo = 0 'short
                elseif aPlay(6)>3 and aPlay(6)<=7 Then
                    nDistanceToGo = 1 'medium
                elseif aPlay(6) > 7 and aPlay(6)<=12 Then
                    nDistanceToGo = 2 'long
                else 
                    nDistanceToGo = 3 'very long
                End If
                
                If aPlay(1) < 3 Then
                    If aPlay(6) = -1 Then
                        succesCompare = 3
                    Else
                        succesCompare = CInt(aPlay(6))/(4-CInt(aPlay(1)))
                    End If
                Else
                    If aPlay(6) = -1 Then
                        succesCompare = 3
                    Else
                        succesCompare = CInt(aPlay(6))
                    End If
                End If   
                
                WriteToFile LogName, "*****!success yards!*****" & succesCompare & "::real--" &  aPlay(2)
                
'                If Err > 0 Then
'                	WriteToFile LogName, "Erreur aPlay(6) = " & aPlay(6)
'                End If
                
                If nOFormation < 11 Then 'Don't count Kneel downs 
                    WriteToFile LogName, "*****!Not kneel down!*****"            
                    If nSideOfBall = 0 Then 'Get Offensive Formation
                        'Offense,Down,YardsToGo,Action,Type,Direction
                        WriteToFile PlayByPlayOffLog, aPlay(7) & "," & aPlay(1) & "," & aPlay(6) & "," & aPlay(3) & "," & aPlay(4) & "," & aPlay(5) & "," & aPlay(9) 
                        WriteToFile LogName, "*****!Offensive side!*****"
                        Select Case aPlay(9)
                            Case "QB"
                                offTarget =1
                            Case "HB"
                                offTarget =2
                            Case "FB"   
                                offTarget =3
                            Case "WR1"
                                offTarget =4
                            Case "WR2"
                                offTarget =5
                            Case "WR3"
                                offTarget =6
                            Case "WR4"
                                offTarget =7
                            Case "WR5"
                                offTarget =8
                            Case "TE"
                                offTarget =9
                        End Select
                        
                        if aPlay(3)="pass" Then
                        WriteToFile LogName, "*****Pass*****"
                            Select Case aPlay(4)
                                Case "incomplete"
                                    nAction=aPlay(17)
                                    nSuccess = 0
                                    aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,nAction,0,2) = aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,nAction,0,2) + 1
                                    aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,offTarget,nAction,0,2) = aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,offTarget,nAction,0,2) + 1
                                Case "short"
                                    nAction=aPlay(17)
                                    if aPlay(2) >= succesCompare then 
                                        nSuccess = 1
                                    Else
                                        nSuccess = 0
                                    End If
                                Case "medium"
                                    nAction=aPlay(17)
                                    if aPlay(2) >= succesCompare then 
                                        nSuccess = 1
                                    Else
                                        nSuccess = 0
                                    End If
                                Case "long"
                                    nAction=aPlay(17)
                                    if aPlay(2) >= succesCompare then 
                                        nSuccess = 1
                                    Else
                                        nSuccess = 0
                                    End If
                            End Select
                            
                            'nAction=aPlay(17)
                            
                            WriteToFile LogName, "Pass success : " & nSuccess & " ("& aPlay(2) &" >= "& succesCompare &")"
                            
                            aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,nAction,0,0) = aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,nAction,0,0) + 1
                            aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,nAction,0,1) = aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,nAction,0,1) + nSuccess
                            aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,offTarget,nAction,0,0) = aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,offTarget,nAction,0,0) + 1
                            'WriteToFile PlayByPlayOffLog, "(" & nOFormation & ", " & aPlay(1) & ", " & nDistanceToGo & ", " & nAction & ", 0) = " & aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,nAction,0)
                        Else
                        	WriteToFile LogName, "*****Run*****"
                            Select Case aPlay(5)
                                Case "left"
                                    nAction=aPlay(16)
                                Case "middle"
                                    nAction=aPlay(16)
                                Case "right"
                                    nAction=aPlay(16)
                                Case "unknown"
                                    nAction=0  'sacks are a gap 5 or 6 so we turn it back to 0
                            End Select
                            
                            'nAction=aPlay(16)
                            
                            if CInt(aPlay(2)) >= CInt(succesCompare) And aPlay(5) <> "unknown" then 
                                nSuccess = 1 
                            Else
                                nSuccess = 0
                            End If
                            
                            WriteToFile LogName, "Rush success : " & nSuccess & " ("& aPlay(2) &" >= "& succesCompare &")"
                            'WriteToFile LogName, "nAction : " & nAction
                            
                            aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,0,nAction,0) = aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,0, nAction,0) + 1
                            aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,0,nAction,1) = aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0,0, nAction,1) + nSuccess
                            'WriteToFile PlayByPlayOffLog, "(" & nOFormation & ", " & aPlay(1) & ", " & nDistanceToGo & ", 0, " & nAction & ") = " & aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,0, nAction)
                            aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,offTarget,0,nAction,0) = aOffensiveFormations(nOFormation,aPlay(1),nDistanceToGo,offTarget,0,nAction,0) + 1
                            
                        end if
                        
                    else
                        if aPlay(10)="" Then
                            WriteToFile PlayByPlayDefLog, aPlay(8) & "," & aPlay(1) & "," & aPlay(6) & "," & aPlay(7) & ",none"
                        else
                            WriteToFile PlayByPlayDefLog, aPlay(8) & "," & aPlay(1) & "," & aPlay(6) & "," & aPlay(7) & "," & aPlay(10)
                        end if
                        
                        if aPlay(10) > "" then 
                            sOutputBlitzSuccess = sOutputBlitzSuccess & vbcrlf & aPlay(8) & " (" & Trim(aPlay(11)) & ") vs " & aPlay(7) & " [sacked by " & aPlay(10) & "]"
                        end if
                        
                        Dim sDefenseFormation
                        
                        if left(aPlay(8),1)="G" then 
                            sDefenseFormation = "Goaline (" & Trim(aPlay(11)) & ")" 
                        else
                            sDefenseFormation = Trim(left(aPlay(8),5)) & " (" & Trim(aPlay(11)) & ")" 
                        end if
                        
                                                
                        sBlitzer = GetElement(aPlay(8), "(", ")", 1)
                        
                        aBlitzer = Split(sBlitzer,";")
                        
                        nBlitzer = cint(UBound(aBlitzer))
                        
                        WriteToFile LogName, "Formation: " & sDefenseFormation & " Blitz Number: " & nBlitzer
                        
                        Select Case sDefenseFormation
                            Case "3-4-4 (center)"
                                nAction = 1
                            Case "3-4-4 (strong)"
                                nAction = 2
                            Case "3-4-4 (weak)"
                                nAction = 3
                            Case "4-3-4 (center)"
                                nAction = 4
                            Case "4-3-4 (strong)"
                                nAction = 5
                            Case "4-3-4 (weak)"
                                nAction = 6
                            Case "4-2-5 (center)"
                                nAction = 7
                            Case "4-2-5 (strong)"
                                nAction = 8
                            Case "4-2-5 (weak)"
                                nAction = 9
                            Case "4-1-6 (center)"
                                nAction = 10
                            Case "4-1-6 (strong)"
                                nAction = 11
                            Case "4-1-6 (weak)"
                                nAction = 12
                            Case "3-1-7 (center)"
                                nAction = 13
                            Case "3-1-7 (strong)"
                                nAction = 14
                            Case "3-1-7 (weak)"
                                nAction = 15
                            Case "3-3-5 (center)"
                                nAction = 16
                            Case "3-3-5 (strong)"
                                nAction = 17
                            Case "3-3-5 (weak)"
                                nAction = 18
                            Case "3-2-6 (center)"
                                nAction = 19
                            Case "3-2-6 (strong)"
                                nAction = 20
                            Case "3-2-6 (weak)"
                                nAction = 21
                            Case "Goaline (center)"
                                nAction = 22 
                            Case "Goaline (strong)"
                                nAction = 23
                            Case "Goaline (weak)"
                                nAction = 24                               
                        End Select
                        
                        If CInt(aPlay(2)) < CInt(succesCompare) then 
                            nSuccess = 1 
                        Else
                            nSuccess = 0
                        End If
                        
                        WriteToFile LogName, "Defense success : " & nSuccess & " ("& aPlay(2) &" < "& succesCompare &")"
                        
                        if aPlay(3)="pass" then
                            aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,0,1) = aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,0,1) + 1
                            aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,1,1) = aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,1,1) + nSuccess
                        else
                            aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,0,2) = aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,0,2) + 1
                            aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,1,2) = aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,1,2) + nSuccess
                        end if
                        
                        'WriteToFile LogName, "a(" & nOFormation & ") b(" & aPlay(1) & ") c(" & nDistanceToGo & ") d(" & nAction & ") e(0) = " & aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,0)
                        If nBlitzer = 0 then 'this means one play nobody blitzed
                            aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,0,0) = aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, 0,0,0) + 1
                        else
                            For a = 0 to nBlitzer
                                Select Case aBlitzer(a)
                                    Case "CB1"
                                        nBlitzSpot =1 
                                    Case "CB2"
                                        nBlitzSpot =2 
                                    Case "CB3"
                                        nBlitzSpot =3 
                                    Case "CB4"
                                        nBlitzSpot =4 
                                    Case "CB5"
                                        nBlitzSpot =5 
                                    Case "SS"
                                        nBlitzSpot =6 
                                    Case "FS"
                                        nBlitzSpot =7 
                                    Case "LOLB"
                                        nBlitzSpot =8 
                                    Case "ROLB"   
                                        nBlitzSpot =9 
                                    Case "LILB"
                                        nBlitzSpot =10 
                                    Case "RILB"
                                        nBlitzSpot =11 
                                    Case "MLB"
                                        nBlitzSpot =12
                                    Case "RDE"
                                        nBlitzSpot =13
                                    Case "LDE"
                                        nBlitzSpot =14
                                    Case "DT"
                                        nBlitzSpot =15
                                    Case "NT"
                                        nBlitzSpot =16
                                End Select
                                aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, nBlitzSpot,0,0) = aDefensiveFormations(nOFormation,aPlay(1),nDistanceToGo, nAction, nBlitzSpot,0,0) + 1
                            Next 
                        end if

                    end if

                end if

            end if
            
            
            
            if Language = "French" Then 
                aPlay(2) = Replace(aPlay(2), ".", ",")
            end if
            
            if nSideOfBall = 0 then
                if aPlay(1) = "1" then 'First Down
                    if aPlay(3) = "rush" then 'run
                        if aPlay(4) = "inside" then
                            nInsideRun_FirstDown_Count = nInsideRun_FirstDown_Count + 1
                            nInsideRun_FirstDown_Yards = nInsideRun_FirstDown_Yards + aPlay(2)
                        else
                            nOutsideRun_FirstDown_Count = nOutsideRun_FirstDown_Count + 1
                            nOutsideRun_FirstDown_Yards = nOutsideRun_FirstDown_Yards + aPlay(2)
                        end if
                    else 'Pass
                        if aPlay(4) = "short" then
                            nShortPass_FirstDown_Count = nShortPass_FirstDown_Count + 1
                            nShortPass_FirstDown_Yards = nShortPass_FirstDown_Yards + aPlay(2)
                        elseif aPlay(4) = "medium" then
                            nMediumPass_FirstDown_Count = nMediumPass_FirstDown_Count + 1
                            nMediumPass_FirstDown_Yards = nMediumPass_FirstDown_Yards + aPlay(2)
                        elseif aPlay(4) = "long" then
                            nLongPass_FirstDown_Count = nLongPass_FirstDown_Count + 1
                            nLongPass_FirstDown_Yards = nLongPass_FirstDown_Yards + aPlay(2)
                        else 
                            nIncompletePass_FirstDown_Count = nIncompletePass_FirstDown_Count + 1
                            nIncompletePass_FirstDown_Yards = nIncompletePass_FirstDown_Yards + aPlay(2)
                        end if

                    end if
                elseif aPlay(1) = "2" then 'Second Down

                    if aPlay(3) = "rush" then 'run
                        if aPlay(4) = "inside" then
                            nInsideRun_SecondDown_Count = nInsideRun_SecondDown_Count + 1
                            nInsideRun_SecondDown_Yards = nInsideRun_SecondDown_Yards + aPlay(2)
                        else
                            nOutsideRun_SecondDown_Count = nOutsideRun_SecondDown_Count + 1
                            nOutsideRun_SecondDown_Yards = nOutsideRun_SecondDown_Yards + aPlay(2)
                        end if
                    else 'Pass
                        if aPlay(4) = "short" then
                            nShortPass_SecondDown_Count = nShortPass_SecondDown_Count + 1
                            nShortPass_SecondDown_Yards = nShortPass_SecondDown_Yards + aPlay(2)
                        elseif aPlay(4) = "medium" then
                            nMediumPass_SecondDown_Count = nMediumPass_SecondDown_Count + 1
                            nMediumPass_SecondDown_Yards = nMediumPass_SecondDown_Yards + aPlay(2)
                        elseif aPlay(4) = "long" then
                            nLongPass_SecondDown_Count = nLongPass_SecondDown_Count + 1
                            nLongPass_SecondDown_Yards = nLongPass_SecondDown_Yards + aPlay(2)
                        else 
                            nIncompletePass_SecondDown_Count = nIncompletePass_SecondDown_Count + 1
                            nIncompletePass_SecondDown_Yards = nIncompletePass_SecondDown_Yards + aPlay(2)
                        end if
                    end if
               
                elseif aPlay(1) = "3" then 'Third Down

                    if aPlay(3) = "rush" then 'run
                        if aPlay(4) = "inside" then
                            nInsideRun_ThirdDown_Count = nInsideRun_ThirdDown_Count + 1
                            nInsideRun_ThirdDown_Yards = nInsideRun_ThirdDown_Yards + aPlay(2)
                        else
                            nOutsideRun_ThirdDown_Count = nOutsideRun_ThirdDown_Count + 1
                            nOutsideRun_ThirdDown_Yards = nOutsideRun_ThirdDown_Yards + aPlay(2)
                        end if
                    else 'Pass
                        if aPlay(4) = "short" then
                            nShortPass_ThirdDown_Count = nShortPass_ThirdDown_Count + 1
                            nShortPass_ThirdDown_Yards = nShortPass_ThirdDown_Yards + aPlay(2)
                        elseif aPlay(4) = "medium" then
                            nMediumPass_ThirdDown_Count = nMediumPass_ThirdDown_Count + 1
                            nMediumPass_ThirdDown_Yards = nMediumPass_ThirdDown_Yards + aPlay(2)
                        elseif aPlay(4) = "long" then
                            nLongPass_ThirdDown_Count = nLongPass_ThirdDown_Count + 1
                            nLongPass_ThirdDown_Yards = nLongPass_ThirdDown_Yards + aPlay(2)
                        else 
                            nIncompletePass_ThirdDown_Count = nIncompletePass_ThirdDown_Count + 1
                            nIncompletePass_ThirdDown_Yards = nIncompletePass_ThirdDown_Yards + aPlay(2)
                        end if
                    end if
               
                elseif aPlay(1) = "4" then 'Fourth Down

                    if aPlay(3) = "rush" then 'run
                        if aPlay(4) = "inside" then
                            nInsideRun_FourthDown_Count = nInsideRun_FourthDown_Count + 1
                            nInsideRun_FourthDown_Yards = nInsideRun_FourthDown_Yards + aPlay(2)
                        else
                            nOutsideRun_FourthDown_Count = nOutsideRun_FourthDown_Count + 1
                            nOutsideRun_FourthDown_Yards = nOutsideRun_FourthDown_Yards + aPlay(2)
                        end if
                    else 'Pass
                        if aPlay(4) = "short" then
                            nShortPass_FourthDown_Count = nShortPass_FourthDown_Count + 1
                            nShortPass_FourthDown_Yards = nShortPass_FourthDown_Yards + aPlay(2)
                        elseif aPlay(4) = "medium" then
                            nMediumPass_FourthDown_Count = nMediumPass_FourthDown_Count + 1
                            nMediumPass_FourthDown_Yards = nMediumPass_FourthDown_Yards + aPlay(2)
                        elseif aPlay(4) = "long" then
                            nLongPass_FourthDown_Count = nLongPass_FourthDown_Count + 1
                            nLongPass_FourthDown_Yards = nLongPass_FourthDown_Yards + aPlay(2)
                        else 
                            nIncompletePass_FourthDown_Count = nIncompletePass_FourthDown_Count + 1
                            nIncompletePass_FourthDown_Yards = nIncompletePass_FourthDown_Yards + aPlay(2)
                        end if
                    end if
               
                end if

            end if

            WriteToFile LogName, "nInsideRun_FirstDown_Count = " & nInsideRun_FirstDown_Count
		    WriteToFile LogName, "nInsideRun_FirstDown_Yards = " & nInsideRun_FirstDown_Yards
		    WriteToFile LogName, "nOutsideRun_FirstDown_Count = " & nOutsideRun_FirstDown_Count
		    WriteToFile LogName, "nOutsideRun_FirstDown_Yards = " & nOutsideRun_FirstDown_Yards
		    
		    WriteToFile LogName, "nShortPass_FirstDown_Count = " & nShortPass_FirstDown_Count
		    WriteToFile LogName, "nShortPass_FirstDown_Yards = " & nShortPass_FirstDown_Yards
		    WriteToFile LogName, "nMediumPass_FirstDown_Count = " & nMediumPass_FirstDown_Count
		    WriteToFile LogName, "nMediumPass_FirstDown_Yards = " & nMediumPass_FirstDown_Yards
		    WriteToFile LogName, "nLongPass_FirstDown_Count = " & nLongPass_FirstDown_Count
		    WriteToFile LogName, "nLongPass_FirstDown_Yards = " & nLongPass_FirstDown_Yards
		    WriteToFile LogName, "nIncompletePass_FirstDown_Count = " & nIncompletePass_FirstDown_Count
		    WriteToFile LogName, "nIncompletePass_FirstDown_Yards = " & nIncompletePass_FirstDown_Yards
		           
		
		    WriteToFile LogName, "nInsideRun_SecondDown_Count = " & nInsideRun_SecondDown_Count
		    WriteToFile LogName, "nInsideRun_SecondDown_Yards = " &  nInsideRun_SecondDown_Yards
		    WriteToFile LogName, "nOutsideRun_SecondDown_Count = " &  nOutsideRun_SecondDown_Count
		    WriteToFile LogName, "nOutsideRun_SecondDown_Yards = " &  nOutsideRun_SecondDown_Yards
		    
		    WriteToFile LogName, "nShortPass_SecondDown_Count = " &  nShortPass_SecondDown_Count
		    WriteToFile LogName, "nShortPass_SecondDown_Yards = " & nShortPass_SecondDown_Yards
		    WriteToFile LogName, "nMediumPass_SecondDown_Count = " & nMediumPass_SecondDown_Count
		    WriteToFile LogName, "nMediumPass_SecondDown_Yards = " & nMediumPass_SecondDown_Yards
		    WriteToFile LogName, "nLongPass_SecondDown_Count = " & nLongPass_SecondDown_Count
		    WriteToFile LogName, "nLongPass_SecondDown_Yards = " & nLongPass_SecondDown_Yards
		    WriteToFile LogName, "nIncompletePass_SecondDown_Count = " & nIncompletePass_SecondDown_Count
		    WriteToFile LogName, "nIncompletePass_SecondDown_Yards = " & nIncompletePass_SecondDown_Yards
		
		
		    WriteToFile LogName, "nInsideRun_ThirdDown_Count = " & nInsideRun_ThirdDown_Count
		    WriteToFile LogName, "nInsideRun_ThirdDown_Yards = " &  nInsideRun_ThirdDown_Yards
		    WriteToFile LogName, "nOutsideRun_ThirdDown_Count = " &  nOutsideRun_ThirdDown_Count
		    WriteToFile LogName, "nOutsideRun_ThirdDown_Yards = " &  nOutsideRun_ThirdDown_Yards
		    
		    WriteToFile LogName, "nShortPass_ThirdDown_Count = " &  nShortPass_ThirdDown_Count
		    WriteToFile LogName, "nShortPass_ThirdDown_Yards = " & nShortPass_ThirdDown_Yards
		    WriteToFile LogName, "nMediumPass_ThirdDown_Count = " & nMediumPass_ThirdDown_Count
		    WriteToFile LogName, "nMediumPass_ThirdDown_Yards = " & nMediumPass_ThirdDown_Yards
		    WriteToFile LogName, "nLongPass_ThirdDown_Count = " & nLongPass_ThirdDown_Count
		    WriteToFile LogName, "nLongPass_ThirdDown_Yards = " & nLongPass_ThirdDown_Yards
		    WriteToFile LogName, "nIncompletePass_ThirdDown_Count = " & nIncompletePass_ThirdDown_Count
		    WriteToFile LogName, "nIncompletePass_ThirdDown_Yards = " & nIncompletePass_ThirdDown_Yards
		
		    WriteToFile LogName, "nInsideRun_FourthDown_Count = " & nInsideRun_FourthDown_Count
		    WriteToFile LogName, "nInsideRun_FourthDown_Yards = " &  nInsideRun_FourthDown_Yards
		    WriteToFile LogName, "nOutsideRun_FourthDown_Count = " &  nOutsideRun_FourthDown_Count
		    WriteToFile LogName, "nOutsideRun_FourthDown_Yards = " &  nOutsideRun_FourthDown_Yards
		    
		    WriteToFile LogName, "nShortPass_FourthDown_Count = " &  nShortPass_FourthDown_Count
		    WriteToFile LogName, "nShortPass_FourthDown_Yards = " & nShortPass_FourthDown_Yards
		    WriteToFile LogName, "nMediumPass_FourthDown_Count = " & nMediumPass_FourthDown_Count
		    WriteToFile LogName, "nMediumPass_FourthDown_Yards = " & nMediumPass_FourthDown_Yards
		    WriteToFile LogName, "nLongPass_FourthDown_Count = " & nLongPass_FourthDown_Count
		    WriteToFile LogName, "nLongPass_FourthDown_Yards = " & nLongPass_FourthDown_Yards
		    WriteToFile LogName, "nIncompletePass_FourthDown_Count = " & nIncompletePass_FourthDown_Count
		    WriteToFile LogName, "nIncompletePass_FourthDown_Yards = " & nIncompletePass_FourthDown_Yards
            
        Next
    
    	WriteToFile LogName, "*** Done with Row"
    
    Next 
    
    WriteToFile LogName, "*** Done with All Games" 

    nTotalRun_FirstDown_Count = nInsideRun_FirstDown_Count + nOutsideRun_FirstDown_Count
    nTotalPass_FirstDown_Count = nShortPass_FirstDown_Count + nMediumPass_FirstDown_Count + nLongPass_FirstDown_Count + nIncompletePass_FirstDown_Count
    nTotalPassComp_FirstDown_Count = nShortPass_FirstDown_Count + nMediumPass_FirstDown_Count + nLongPass_FirstDown_Count    

    WriteToFile LogName, "*** 1"

    nTotalRun_SecondDown_Count = nInsideRun_SecondDown_Count + nOutsideRun_SecondDown_Count
    nTotalPass_SecondDown_Count = nShortPass_SecondDown_Count + nMediumPass_SecondDown_Count + nLongPass_SecondDown_Count + nIncompletePass_SecondDown_Count
    nTotalPassComp_SecondDown_Count = nShortPass_SecondDown_Count + nMediumPass_SecondDown_Count + nLongPass_SecondDown_Count 

    WriteToFile LogName, "*** 2"

    nTotalRun_ThirdDown_Count = nInsideRun_ThirdDown_Count + nOutsideRun_ThirdDown_Count
    nTotalPass_ThirdDown_Count = nShortPass_ThirdDown_Count + nMediumPass_ThirdDown_Count + nLongPass_ThirdDown_Count + nIncompletePass_ThirdDown_Count
    nTotalPassComp_ThirdDown_Count = nShortPass_ThirdDown_Count + nMediumPass_ThirdDown_Count + nLongPass_ThirdDown_Count

    WriteToFile LogName, "*** 3"

    nTotalRun_FourthDown_Count = nInsideRun_FourthDown_Count + nOutsideRun_FourthDown_Count
    nTotalPass_FourthDown_Count = nShortPass_FourthDown_Count + nMediumPass_FourthDown_Count + nLongPass_FourthDown_Count + nIncompletePass_FourthDown_Count
    nTotalPassComp_FourthDown_Count = nShortPass_FourthDown_Count + nMediumPass_FourthDown_Count + nLongPass_FourthDown_Count 

    WriteToFile LogName, "*** 4"

    nTotalInsideRunCount = nInsideRun_FirstDown_Count + nInsideRun_SecondDown_Count + nInsideRun_ThirdDown_Count + nInsideRun_FourthDown_Count
    nTotalOutSideRunCount = nOutsideRun_FirstDown_Count + nOutsideRun_SecondDown_Count + nOutsideRun_ThirdDown_Count + nOutsideRun_FourthDown_Count
    nTotalRunCount =  nTotalInsideRunCount + nTotalOutSideRunCount

    WriteToFile LogName, "*** 5"

    nTotalInsideRunYards = nInsideRun_FirstDown_Yards + nInsideRun_SecondDown_Yards + nInsideRun_ThirdDown_Yards + nInsideRun_FourthDown_Yards
    nTotalOutSideRunYards = nOutsideRun_FirstDown_Yards + nOutsideRun_SecondDown_Yards + nOutsideRun_ThirdDown_Yards + nOutsideRun_FourthDown_Yards
    nTotalRunYards =  nTotalInsideRunYards + nTotalOutSideRunYards

    WriteToFile LogName, "*** 6"

    nTotalShortPassCount = nShortPass_FirstDown_Count + nShortPass_SecondDown_Count + nShortPass_ThirdDown_Count + nShortPass_FourthDown_Count
    nTotalMediumPassCount = nMediumPass_FirstDown_Count + nMediumPass_SecondDown_Count + nMediumPass_ThirdDown_Count + nMediumPass_FourthDown_Count
    nTotalLongPassCount = nLongPass_FirstDown_Count + nLongPass_SecondDown_Count + nLongPass_ThirdDown_Count + nLongPass_FourthDown_Count
    nTotalIncompletePassCount = nIncompletePass_FirstDown_Count + nIncompletePass_SecondDown_Count + nIncompletePass_ThirdDown_Count + nIncompletePass_FourthDown_Count
    nTotalPassCount =  nTotalShortPassCount + nTotalMediumPassCount + nTotalLongPassCount + nTotalIncompletePassCount
    nTotalPassCompCount =  nTotalShortPassCount + nTotalMediumPassCount + nTotalLongPassCount

    WriteToFile LogName, "*** 7"

    nTotalShortPassYards = nShortPass_FirstDown_Yards + nShortPass_SecondDown_Yards + nShortPass_ThirdDown_Yards + nShortPass_FourthDown_Yards
    nTotalMediumPassYards = nMediumPass_FirstDown_Yards + nMediumPass_SecondDown_Yards + nMediumPass_ThirdDown_Yards + nMediumPass_FourthDown_Yards
    nTotalLongPassYards = nLongPass_FirstDown_Yards + nLongPass_SecondDown_Yards +  nLongPass_ThirdDown_Yards + nLongPass_FourthDown_Yards
    nTotalPassYards =  nTotalShortPassYards + nTotalMediumPassYards + nTotalLongPassYards 

    WriteToFile LogName, "*** 8"

    nTotalPlayCount = nTotalPassCount + nTotalRunCount

    WriteToFile LogName, "*** 9"

    WriteToFile LogName, "nShortPass_FirstDown_Count = " & nShortPass_FirstDown_Count
    WriteToFile LogName, "nTotalRunCount = " & nTotalRunCount
    WriteToFile LogName, "nTotalPlayCount = " & nTotalPlayCount
    WriteToFile LogName, "nTotalInsideRunCount = " & nTotalInsideRunCount
    WriteToFile LogName, "nTotalOutSideRunCount = " & nTotalOutSideRunCount
    WriteToFile LogName, "nTotalPassCount = " & nTotalPassCount


    sOutput = vbCRLF & "[b]******************* PLAY BREAK DOWNS (" & sName & ") **************[/b]" & vbCRLF
    'sOutput = sOutput & vbCRLF & "[b]*** TEAM: " & sName & "[/b]"
    if nTotalRunCount > 0 then
        sOutput = sOutput & vbCRLF & cINT(nTotalRunCount/nTotalPlayCount*100) & "% rushing - (" & cINT(nTotalInsideRunCount/nTotalRunCount*100) & _
                "% inside, " & cINT(nTotalOutSideRunCount/nTotalRunCount*100) & "% outside)"
    else
        sOutput = sOutput & vbCRLF & "0% rushing - (0% inside, 0% outside)"
    end If
    if nTotalPassCount > 0 then
        sOutput = sOutput & vbCRLF & cINT(nTotalPassCount/nTotalPlayCount*100) & "% passing - (" & cINT(nTotalShortPassCount/nTotalPassCompCount*100) & _
                "% short, " & cINT(nTotalMediumPassCount/nTotalPassCompCount*100) & "% medium, " & cINT(nTotalLongPassCount/nTotalPassCompCount*100) & _
                "% long, " & cINT(nTotalIncompletePassCount/nTotalPassCount*100) & "% incomplete)"
    else
        sOutput = sOutput & vbCRLF & "0% passing - (0% short, 0% medium, 0% long, 0% incomplete)"
    end if
                
    WriteToFile LogName, "Written so far = " & sOutput         
    
    WriteToFile GamePlanName, sOutput
    
    'sOutput = sOutput & vbCRLF & vbCRLF & "FIRST DOWN PLAYS"
    sOutput = vbCRLF & "[u]FIRST DOWN PLAYS[/u]"
    if nTotalRun_FirstDown_Count > 0 then
    sOutput = sOutput & vbCRLF & cINT(nTotalRun_FirstDown_Count/(nTotalRun_FirstDown_Count+nTotalPass_FirstDown_Count)*100) & _
                "% rushing - (" & cINT(nInsideRun_FirstDown_Count/nTotalRun_FirstDown_Count*100) & "% inside, " & _
                cINT(nOutsideRun_FirstDown_Count/nTotalRun_FirstDown_Count*100) & "% outside)"
    else
            sOutput = sOutput & vbCRLF & "0% rushing -(0% inside, 0% outside)"
    end If
    
    if nTotalPassComp_FirstDown_Count > 0 then     
        sOutput = sOutput & vbCRLF & cINT(nTotalPass_FirstDown_Count/(nTotalRun_FirstDown_Count+nTotalPass_FirstDown_Count)*100) & "% passing - (" & _
                cINT(nShortPass_FirstDown_Count/nTotalPassComp_FirstDown_Count*100) &  "% short, " &  cINT(nMediumPass_FirstDown_Count/nTotalPassComp_FirstDown_Count*100) & _
                "% medium, " & cINT(nLongPass_FirstDown_Count/nTotalPassComp_FirstDown_Count*100) & "% long, " & _
                cINT(nIncompletePass_FirstDown_Count/nTotalPass_FirstDown_Count*100) & "% incomplete)"
    else
        sOutput = sOutput & vbCRLF & "0% passing - (0% short, 0% medium, 0% long, 0% incomplete)"
    end if

    WriteToFile GamePlanName, sOutput

    'sOutput = sOutput & vbCRLF & vbCRLF & "SECOND DOWN PLAYS"
    
    sOutput = vbCRLF & vbCRLF & "[u]SECOND DOWN PLAYS[/u]"
    if nTotalRun_SecondDown_Count > 0 then     
    sOutput = sOutput & vbCRLF & cINT(nTotalRun_SecondDown_Count/(nTotalRun_SecondDown_Count+nTotalPass_SecondDown_Count)*100) & _
                "% rushing - (" & cINT(nInsideRun_SecondDown_Count/nTotalRun_SecondDown_Count*100) & "% inside, " & _
                cINT(nOutsideRun_SecondDown_Count/nTotalRun_SecondDown_Count*100) & "% outside)"
    else
            sOutput = sOutput & vbCRLF & "0% rushing -(0% inside, 0% outside)"
    end If
    
    if nTotalPass_SecondDown_Count > 0 then
    sOutput = sOutput & vbCRLF & cINT(nTotalPass_SecondDown_Count/(nTotalRun_SecondDown_Count+nTotalPass_SecondDown_Count)*100) & "% passing - (" & _
                cINT(nShortPass_SecondDown_Count/nTotalPassComp_SecondDown_Count*100) &  "% short, " &  cINT(nMediumPass_SecondDown_Count/nTotalPassComp_SecondDown_Count*100) & _
                "% medium, " & cINT(nLongPass_SecondDown_Count/nTotalPassComp_SecondDown_Count*100) & "% long, " & _
                cINT(nIncompletePass_SecondDown_Count/nTotalPass_SecondDown_Count*100) & "% incomplete)"
    else
        sOutput = sOutput & vbCRLF & "0% passing - (0% short, 0% medium, 0% long, 0% incomplete)"
    end If
    
    WriteToFile GamePlanName, sOutput
    
    'sOutput = sOutput & vbCRLF & vbCRLF & "THIRD DOWN PLAYS"
    sOutput = vbCRLF & vbCRLF & "[u]THIRD DOWN PLAYS[/u]"
    if nTotalRun_ThirdDown_Count > 0 then     
        sOutput = sOutput & vbCRLF & cINT(nTotalRun_ThirdDown_Count/(nTotalRun_ThirdDown_Count+nTotalPass_ThirdDown_Count)*100) & _
                    "% rushing - (" & cINT(nInsideRun_ThirdDown_Count/nTotalRun_ThirdDown_Count*100) & "% inside, " & _
                    cINT(nOutsideRun_ThirdDown_Count/nTotalRun_ThirdDown_Count*100) & "% outside)"
    else
            sOutput = sOutput & vbCRLF & "0% rushing -(0% inside, 0% outside)"
    end If
    
    if nTotalPassComp_ThirdDown_Count > 0 then     
        sOutput = sOutput & vbCRLF & cINT(nTotalPass_ThirdDown_Count/(nTotalRun_ThirdDown_Count+nTotalPass_ThirdDown_Count)*100) & "% passing - (" & _
                cINT(nShortPass_ThirdDown_Count/nTotalPassComp_ThirdDown_Count*100) &  "% short, " &  cINT(nMediumPass_ThirdDown_Count/nTotalPassComp_ThirdDown_Count*100) & _
                "% medium, " & cINT(nLongPass_ThirdDown_Count/nTotalPassComp_ThirdDown_Count*100) & "% long, " & _
                cINT(nIncompletePass_ThirdDown_Count/nTotalPass_ThirdDown_Count*100) & "% incomplete)"
    else
        sOutput = sOutput & vbCRLF & "0% passing - (0% short, 0% medium, 0% long, 0% incomplete)"
    end If
    
    WriteToFile GamePlanName, sOutput
    
    
    'sOutput = sOutput & vbCRLF & vbCRLF & "FOURTH DOWN PLAYS"
    sOutput = vbCRLF & vbCRLF & "[u]FOURTH DOWN PLAYS[/u]"
    if nTotalRun_FourthDown_Count > 0 then 
        sOutput = sOutput & vbCRLF & cINT(nTotalRun_FourthDown_Count/(nTotalRun_FourthDown_Count+nTotalPass_FourthDown_Count)*100) & _
                    "% rushing - (" & cINT(nInsideRun_FourthDown_Count/nTotalRun_FourthDown_Count*100) & "% inside, " & _
                    cINT(nOutsideRun_FourthDown_Count/nTotalRun_FourthDown_Count*100) & "% outside)"
    else
        sOutput = sOutput & vbCRLF & "0% rushing -(0% inside, 0% outside)"
    end if

    WriteToFile LogName, "nTotalPassComp_FourthDown_Count = " & nTotalPassComp_FourthDown_Count

    if nTotalPassComp_FourthDown_Count > 0 then 
        sOutput = sOutput & vbCRLF & cINT(nTotalPass_FourthDown_Count/(nTotalRun_FourthDown_Count+nTotalPass_FourthDown_Count)*100) & "% passing - (" & _
                    cINT(nShortPass_FourthDown_Count/nTotalPassComp_FourthDown_Count*100) &  "% short, " &  cINT(nMediumPass_FourthDown_Count/nTotalPassComp_FourthDown_Count*100) & _
                    "% medium, " & cINT(nLongPass_FourthDown_Count/nTotalPassComp_FourthDown_Count*100) & "% long, " & _
                    cINT(nIncompletePass_FourthDown_Count/nTotalPass_FourthDown_Count*100) & "% incomplete)"
    else
        sOutput = sOutput & vbCRLF & "0% passing -(0% short, 0% medium, 0% long, 0% incomplete)"
    end if

    WriteToFile GamePlanName, sOutput

    sOutput = vbCRLF & "[u]*** Inside Rushing Average ***[/u]" 
    if nTotalInsideRunCount > 0 then
        sOutput = sOutput & vbCRLF & "Total: " & nTotalInsideRunCount & " runs for an average of " & FormatNumber(nTotalInsideRunYards/nTotalInsideRunCount,1,true)
    '    sOutput = sOutput & vbCRLF & "Left: "  
    '    sOutput = sOutput & vbCRLF & "Middle: " 
    '    sOutput = sOutput & vbCRLF & "Right: " 
    else
        sOutput = sOutput & vbCRLF & "Total: " & 0 & " runs for an average of " & 0
    end if
    
    sOutput = sOutput & vbCRLF 
    sOutput = sOutput & vbCRLF & "[u]*** Outside Rushing Average ***[/u]" 
    if nTotalOutsideRunCount > 0 then
        sOutput = sOutput & vbCRLF & "Total: " & nTotalOutsideRunCount & " runs for an average of " & FormatNumber(nTotalOutsideRunYards/nTotalOutsideRunCount,1,true)
    else
        sOutput = sOutput & vbCRLF & "Total: " & 0 & " runs for an average of " & 0
    end if
'    sOutput = sOutput & vbCRLF & "Left: "  
'    sOutput = sOutput & vbCRLF & "Middle: " 
'    sOutput = sOutput & vbCRLF & "Right: " 
    
    sOutput = sOutput & vbCRLF 
    sOutput = sOutput & vbCRLF & "[u]*** Short Passing Average ***[/u]" 
    if nTotalShortPassCount > 0 then
        sOutput = sOutput & vbCRLF & "Total: " & nTotalShortPassCount & " passes for an average of " & FormatNumber(nTotalShortPassYards/nTotalShortPassCount,1,true)
    else
        sOutput = sOutput & vbCRLF & "Total: 0 passes for an average of 0"
    end if
'    sOutput = sOutput & vbCRLF & "Left: "  
'    sOutput = sOutput & vbCRLF & "Middle: " 
'    sOutput = sOutput & vbCRLF & "Right: " 

    sOutput = sOutput & vbCRLF 
    sOutput = sOutput & vbCRLF & "[u]*** Medium Passing Average ***[/u]" 
    if nTotalMediumPassCount > 0 then
        sOutput = sOutput & vbCRLF & "Total: " & nTotalMediumPassCount & " passes for an average of " & FormatNumber(nTotalMediumPassYards/nTotalMediumPassCount,1,true)
    else
        sOutput = sOutput & vbCRLF & "Total: 0 passes for an average of 0"
    end if
'    sOutput = sOutput & vbCRLF & "Left: " 
'    sOutput = sOutput & vbCRLF & "Middle: " 
'    sOutput = sOutput & vbCRLF & "Right: " 

    sOutput = sOutput & vbCRLF 
    sOutput = sOutput & vbCRLF & "[u]*** Long Passing Average ***[/u]" 
    if nTotalLongPassCount > 0 then
        sOutput = sOutput & vbCRLF & "Total: " & nTotalLongPassCount & " passes for an average of " & FormatNumber(nTotalLongPassYards/nTotalLongPassCount,1,true)
    else
        sOutput = sOutput & vbCRLF & "Total: 0 passes for an average of 0"
    end if
'    sOutput = sOutput & vbCRLF & "Left: "  
'    sOutput = sOutput & vbCRLF & "Middle: " 
'    sOutput = sOutput & vbCRLF & "Right: " 


    WriteToFile GamePlanName, sOutput

    Dim nPassTotal, nPassIncomplete, nPassLeftFlat, nPassLeftShort, nPassLeftMedium, nPassLeftLong, nPassRightFlat, nPassRightShort, nPassRightMedium
    Dim nPassRightLong, nPassMidRightShort, nPassMidRightMedium, nPassMidRightLong, nPassMidLeftShort, nPassMidLeftMedium, nPassMidLeftLong, nBackfield
    Dim nRunTotal, nRunLeftSLWR, nRunLeftWRLOT, nRunLeftLOTLG, nRunMiddleLGC, nRunMiddleCRG, nRunRightRGROT, nRunRightROTTE, nRunRightTEWR, nRunRightWRSL
    Dim nDownAndDistance, nSuccessRun, nSuccessPass, aOffTargetsPass, aOffTargetsRun, sCarriersPass, sCarriersRun

    sOutput = vbCRLF & "[b]******************* Offensive Formation Breakdown (" & sName & ") **************[/b]" 

    sOutput = sOutput & vbCRLF & "[i]Pass (Incomplete/Left(flat,short,medium,long)/Mid left(short,medium,long)/Mid Right(short,medium,long)/Right(flat,short,medium,long))[/i]"
    sOutput = sOutput & vbCRLF & "***************************************"
    sOutput = sOutput & vbCRLF & "..........SL+++10y+++0y+++10y++++SL"
    sOutput = sOutput & vbCRLF & "...........|+++++|+++++|+++++|+++++|"
    sOutput = sOutput & vbCRLF & "...........|++4++|++7++|+10++|+14++|"
    sOutput = sOutput & vbCRLF & "12yds|_____|_____|_____|_____|"
    sOutput = sOutput & vbCRLF & "...........|+++++|+++++|+++++|+++++|"
    sOutput = sOutput & vbCRLF & "...........|++3++|++6++|++9++|++13+|"
    sOutput = sOutput & vbCRLF & "5 yds |_____|_____|_____|_____|"
    sOutput = sOutput & vbCRLF & "...........|+++++|+++++|+++++|+++++|"
    sOutput = sOutput & vbCRLF & "...........|++2++|++5++|++8++|+12++|"
    sOutput = sOutput & vbCRLF & "0 yds |_____|_____|_____|_____|"
    sOutput = sOutput & vbCRLF & "...........|+++++|+++++|+++++|+++++|"
    sOutput = sOutput & vbCRLF & "...........|++1++|++++QB++++|++11+|"
    sOutput = sOutput & vbCRLF & "...........|_____|_____|_____|_____|"
    sOutput = sOutput & vbCRLF & "***************************************"
    sOutput = sOutput & vbCRLF & "[i]Run gaps (Out| |WR1| |LOT| |LG| |C| |RG| |ROT| |TE| |WR2| |Out)[/i]" 
    sOutput = sOutput & vbCRLF & "[i]sr = Success Rate[/i]" 
    sOutput = sOutput & vbCRLF & vbCRLF & "[b]********** Overall Breakdown **********[/b]" 
 
    WriteToFile GamePlanName, sOutput

    For a = 1 to 10 'Loop by Formation
        nPassTotal = 0
        nSuccessPass = 0
        nRunTotal = 0
        nSuccessRun = 0
        nPassIncomplete = 0
        nPassLeftFlat = 0
        nPassLeftShort = 0
        nPassLeftMedium = 0
        nPassLeftLong = 0
        nPassRightFlat = 0
        nPassRightShort = 0
        nPassRightMedium = 0
        nPassRightLong = 0
        nPassMidRightShort = 0
        nPassMidRightMedium = 0
        nPassMidRightLong = 0
        nPassMidLeftShort = 0
        nPassMidLeftMedium = 0
        nPassMidLeftLong = 0
        nRunLeftSLWR = 0
        nRunLeftWRLOT = 0
        nRunLeftLOTLG = 0
        nRunMiddleLGC = 0
        nRunMiddleCRG = 0
        nRunRightRGROT = 0
        nRunRightROTTE = 0
        nRunRightTEWR = 0
        nRunRightWRSL = 0
        nBackfield = 0
        sCarriersPass = ""
        sCarriersRun = ""
        
        ReDim aOffTargetsPass(15)
        ReDim aOffTargetsRun(10)
        
        For b = 1 to 4 'Loop by Down
            For c = 0 to 4 'Loop by Distance to go
                
                nPassIncomplete = nPassIncomplete + cint(aOffensiveFormations(a,b,c,0,1,0,2)) + cint(aOffensiveFormations(a,b,c,0,2,0,2)) + _
                cint(aOffensiveFormations(a,b,c,0,3,0,2)) + cint(aOffensiveFormations(a,b,c,0,4,0,2)) + cint(aOffensiveFormations(a,b,c,0,5,0,2)) + _
                cint(aOffensiveFormations(a,b,c,0,6,0,2)) + cint(aOffensiveFormations(a,b,c,0,7,0,2)) + cint(aOffensiveFormations(a,b,c,0,8,0,2)) + _
                cint(aOffensiveFormations(a,b,c,0,9,0,2)) + cint(aOffensiveFormations(a,b,c,0,10,0,2)) + cint(aOffensiveFormations(a,b,c,0,11,0,2)) + _
                + cint(aOffensiveFormations(a,b,c,0,12,0,2)) + cint(aOffensiveFormations(a,b,c,0,13,0,2)) + cint(aOffensiveFormations(a,b,c,0,14,0,2))
'                nPassShort = nPassShort + cint(aOffensiveFormations(a,b,c,2,0,0))
'                nPassMedium =  nPassMedium + cint(aOffensiveFormations(a,b,c,3,0,0))
'                nPassLong = nPassLong + cint(aOffensiveFormations(a,b,c,4,0,0))

                nBackfield = nBackfield + cint(aOffensiveFormations(a,b,c,0,0,0,0))
                
                nPassLeftFlat = nPassLeftFlat + cint(aOffensiveFormations(a,b,c,0,1,0,0)) + cint(aOffensiveFormations(a,b,c,0,1,0,2))
                nPassLeftShort = nPassLeftShort + cint(aOffensiveFormations(a,b,c,0,2,0,0))  + cint(aOffensiveFormations(a,b,c,0,2,0,2))
                nPassLeftMedium = nPassLeftMedium + cint(aOffensiveFormations(a,b,c,0,3,0,0))  + cint(aOffensiveFormations(a,b,c,0,3,0,2))
                nPassLeftLong = nPassLeftLong + cint(aOffensiveFormations(a,b,c,0,4,0,0))  + cint(aOffensiveFormations(a,b,c,0,4,0,2))
                nPassRightFlat = nPassRightFlat + cint(aOffensiveFormations(a,b,c,0,11,0,0)) + cint(aOffensiveFormations(a,b,c,0,11,0,2))
                nPassRightShort = nPassRightShort + cint(aOffensiveFormations(a,b,c,0,12,0,0)) + cint(aOffensiveFormations(a,b,c,0,12,0,2))
                nPassRightMedium = nPassRightMedium + cint(aOffensiveFormations(a,b,c,0,13,0,0)) + cint(aOffensiveFormations(a,b,c,0,13,0,2))
                nPassRightLong = nPassRightLong + cint(aOffensiveFormations(a,b,c,0,14,0,0)) + cint(aOffensiveFormations(a,b,c,0,14,0,2))
                nPassMidRightShort = nPassMidRightShort + cint(aOffensiveFormations(a,b,c,0,8,0,0)) + cint(aOffensiveFormations(a,b,c,0,8,0,2))
                nPassMidRightMedium = nPassMidRightMedium + cint(aOffensiveFormations(a,b,c,0,9,0,0)) + cint(aOffensiveFormations(a,b,c,0,9,0,2))
                nPassMidRightLong = nPassMidRightLong + cint(aOffensiveFormations(a,b,c,0,10,0,0)) + cint(aOffensiveFormations(a,b,c,0,10,0,2))
                nPassMidLeftShort = nPassMidLeftShort + cint(aOffensiveFormations(a,b,c,0,5,0,0)) + cint(aOffensiveFormations(a,b,c,0,5,0,2))
                nPassMidLeftMedium = nPassMidLeftMedium + cint(aOffensiveFormations(a,b,c,0,6,0,0)) + cint(aOffensiveFormations(a,b,c,0,6,0,2))
                nPassMidLeftLong = nPassMidLeftLong + cint(aOffensiveFormations(a,b,c,0,7,0,0)) + cint(aOffensiveFormations(a,b,c,0,7,0,2))
                
                nSuccessPass = nSuccessPass + cint(aOffensiveFormations(a,b,c,0,1,0,1)) + cint(aOffensiveFormations(a,b,c,0,2,0,1)) + _
                cint(aOffensiveFormations(a,b,c,0,3,0,1)) + cint(aOffensiveFormations(a,b,c,0,4,0,1)) + cint(aOffensiveFormations(a,b,c,0,5,0,1)) + _
                cint(aOffensiveFormations(a,b,c,0,6,0,1)) + cint(aOffensiveFormations(a,b,c,0,7,0,1)) + cint(aOffensiveFormations(a,b,c,0,8,0,1)) + _
                cint(aOffensiveFormations(a,b,c,0,9,0,1)) + cint(aOffensiveFormations(a,b,c,0,10,0,1)) + cint(aOffensiveFormations(a,b,c,0,11,0,1)) + _
                + cint(aOffensiveFormations(a,b,c,0,12,0,1)) + cint(aOffensiveFormations(a,b,c,0,13,0,1)) + cint(aOffensiveFormations(a,b,c,0,14,0,1))
                
                'nRunLeft = nRunLeft + cint(aOffensiveFormations(a,b,c,0,1,0))
                'nRunMiddle = nRunMiddle + cint(aOffensiveFormations(a,b,c,0,2,0))
                'nRunRight = nRunRight + cint(aOffensiveFormations(a,b,c,0,3,0))
                
                nRunLeftSLWR = nRunLeftSLWR + cint(aOffensiveFormations(a,b,c,0,0,1,0))
                nRunLeftWRLOT = nRunLeftWRLOT + cint(aOffensiveFormations(a,b,c,0,0,2,0))
                nRunLeftLOTLG = nRunLeftLOTLG + cint(aOffensiveFormations(a,b,c,0,0,3,0))
                nRunMiddleLGC = nRunMiddleLGC + cint(aOffensiveFormations(a,b,c,0,0,4,0))
                nRunMiddleCRG = nRunMiddleCRG + cint(aOffensiveFormations(a,b,c,0,0,5,0))
                nRunRightRGROT = nRunRightRGROT + cint(aOffensiveFormations(a,b,c,0,0,6,0))
                nRunRightROTTE = nRunRightROTTE + cint(aOffensiveFormations(a,b,c,0,0,7,0))
                nRunRightTEWR = nRunRightTEWR + cint(aOffensiveFormations(a,b,c,0,0,8,0))
                nRunRightWRSL = nRunRightWRSL + cint(aOffensiveFormations(a,b,c,0,0,9,0))
                
                nSuccessRun = nSuccessRun + cint(aOffensiveFormations(a,b,c,0,0,1,1) + aOffensiveFormations(a,b,c,0,0,2,1) + aOffensiveFormations(a,b,c,0,0,3,1) + _
                aOffensiveFormations(a,b,c,0,0,4,1) + aOffensiveFormations(a,b,c,0,0,5,1) + aOffensiveFormations(a,b,c,0,0,6,1) + aOffensiveFormations(a,b,c,0,0,7,1) + _
                aOffensiveFormations(a,b,c,0,0,8,1) + aOffensiveFormations(a,b,c,0,0,9,1)) 
            
                For d = 1 to 9 'Carriers
                    For e = 0 To 14
                        If aOffensiveFormations(a,b,c,d,e,0,0) > 0 then
                            aOffTargetsPass(d) = aOffTargetsPass(d) + aOffensiveFormations(a,b,c,d,e,0,0) + aOffensiveFormations(a,b,c,d,e,0,2)
                        end If
                    Next
                    For e = 0 To 9
                        If aOffensiveFormations(a,b,c,d,0,e,0) > 0 then
                            aOffTargetsRun(d) = aOffTargetsRun(d) + aOffensiveFormations(a,b,c,d,0,e,0)
                        end If
                    Next
                Next
            
            Next
        Next

        nPassTotal = nPassLeftFlat + nPassLeftShort + nPassLeftMedium + nPassLeftLong + nPassRightFlat + nPassRightShort + _
        nPassRightMedium + nPassRightLong + nPassMidRightShort + nPassMidRightMedium + nPassMidRightLong + nPassMidLeftShort + _
        nPassMidLeftMedium + nPassMidLeftLong
        
        nRunTotal = nRunLeftSLWR + nRunLeftWRLOT + nRunLeftLOTLG + nRunMiddleLGC + nRunMiddleCRG + nRunRightRGROT + nRunRightROTTE  + _
        nRunRightTEWR + nRunRightWRSL + nBackfield

        if nRunTotal>0 or nPassTotal>0 then
            
            sCarriersPass = ""
            sCarriersRun = ""

            If nPassTotal > 0 then 
                nSuccessPass = cint(nSuccessPass/nPassTotal * 100)
                For x = 1 To 9 'Carriers
                    If aOffTargetsPass(x) > 0 Then
                        If sCarriersPass = "" Then
                            sCarriersPass = aOffensiveFormations(0,0,0,x,0,0,0) & " " & cint(aOffTargetsPass(x)/nPassTotal*100) & "%"
                        Else
                            sCarriersPass = sCarriersPass & " / " & aOffensiveFormations(0,0,0,x,0,0,0) & " " & cint(aOffTargetsPass(x)/nPassTotal*100) & "%"
                        end if
                    End if
                Next
            else
                nSuccessPass = 0
            end if

            If nRunTotal > 0 then 
                nSuccessRun = cint(nSuccessRun/nRunTotal * 100)
                For x = 1 To 9 'Carriers
                    If aOffTargetsRun(x) > 0 Then
                        If sCarriersRun = "" Then
                            sCarriersRun = aOffensiveFormations(0,0,0,x,0,0,0) & " " & cint(aOffTargetsRun(x)/nRunTotal*100) & "%"
                        Else
                            sCarriersRun = sCarriersRun & " / " & aOffensiveFormations(0,0,0,x,0,0,0) & " " & cint(aOffTargetsRun(x)/nRunTotal*100) & "%"
                        end if
                    End if
                Next
            else
                nSuccessRun = 0
            end If
            
            if sCarriersPass = ""="" then sCarriersPass = ""="None"
            if sCarriersRun = ""="" then sCarriersRun = ""="None"

            sOutput = vbCRLF & "[u]" & Padding(aOffensiveFormations(a,0,0,0,0,0,0),20,GlobalPad) & "Total Plays: " & nRunTotal+nPassTotal & "[/u]" & vbcrlf 
                
            if nPassTotal>0 Then
                sOutput = sOutput & "....Pass.......................(" & nSuccessPass & "% success rate): " & nPassTotal & vbCrLf & _
                          "---- Incomplete............([b]" & nPassIncomplete & "[/b]) (" & cint(nPassIncomplete/nPassTotal * 100) & "%)"& vbcrlf & _
                          "---- Overall...........(left : "& CInt((nPassLeftFlat+nPassLeftShort+nPassLeftMedium+nPassLeftLong)/nPassTotal*100) &"% / "& _
                          "middle : " & CInt((nPassMidLeftShort+nPassMidLeftMedium+nPassMidLeftLong+nPassMidRightShort+nPassMidRightMedium+nPassMidRightLong)/nPassTotal*100) & "% " & _
                          "/ right : " & CInt((nPassRightFlat+nPassRightShort+nPassRightMedium+nPassRightLong)/nPassTotal*100) & "%) "& _
                          "| (Flat : "& CInt((nPassLeftFlat+nPassRightFlat)/nPassTotal*100) &"% " & _
                          "/ Short : "& CInt((nPassLeftShort+nPassMidLeftShort+nPassMidRightShort+nPassRightShort)/nPassTotal*100) &"% " & _
                          "/ Medium : "& CInt((nPassLeftMedium+nPassRightMedium+nPassMidRightMedium+nPassMidLeftMedium)/nPassTotal*100) &"% " & _
                          "/ Long : "& CInt((nPassLeftLong+nPassRightLong+nPassMidRightLong+nPassMidLeftLong)/nPassTotal*100) &"%)"& vbcrlf & _
                          "---- Left :........................(Flat : [b]"& nPassLeftFlat & "[/b] - short : [b]" & nPassLeftShort & "[/b] - medium : [b]" & nPassLeftMedium & "[/b] - long : [b]"& nPassLeftLong & "[/b]) "& vbcrlf & _
                          "---- middle Left :.......(short : [b]" & nPassMidLeftShort & "[/b] - medium : [b]" & nPassMidLeftMedium & "[/b] - long : [b]"& nPassMidLeftLong & ")[/b] "& vbcrlf & _
                          "---- middle Right :....(short : [b]" & nPassMidRightShort & "[/b] - medium : [b]" & nPassMidRightMedium & "[/b] - long : [b]"& nPassMidRightLong & ")[/b] "& vbcrlf & _
                          "---- Right :.....................(Flat : [b]"& nPassRightFlat & "[/b] - short : [b]" & nPassRightShort & "[/b] - medium : [b]" & nPassRightMedium & "[/b] - long : [b]"& nPassRightLong & "[/b]) "& vbcrlf
                          
                          
                 sOutput = sOutput & "---- Pass Targets........("& sCarriersPass &")"
                          
                if nRunTotal>0 then  sOutput = sOutput & vbCrLf & vbCrLf 
            
            End If
                    
            if nRunTotal>0 then 
                sOutput = sOutput & "....Run.........................(" & nSuccessRun & "% success rate): " & nRunTotal & vbcrlf & _
                "---- Out [b]("& nRunLeftSLWR &")[/b] WR1[b](" & nRunLeftWRLOT & ")[/b] LOT [b](" & nRunLeftLOTLG & ")[/b] LOG[b](" & nRunMiddleLGC & ")[/b] C [b]("& _
                nRunMiddleCRG &")[/b] ROG [b]("& nRunRightRGROT &")[/b] ROT [b]("& nRunRightROTTE &")[/b] TE [b]("& nRunRightTEWR&")[/b] WR2 [b]("& nRunRightWRSL &")[/b] Out " & vbCrLf
                If nBackfield>0 then
                    sOutput = sOutput & "---- Backfield (Sacks) :....("& nBackfield &")"& vbCrLf
                End if 
                sOutput = sOutput & "---- Run Carriers.........("& sCarriersRun &")"
                
            end if
                    
            WriteToFile GamePlanName, sOutput
                    
        end if

    Next

    sOutput = vbCRLF & "[b]********** Breakdown By Down **********[/b]" 
    WriteToFile GamePlanName, sOutput
    
    For b = 1 to 4 'Loop by Down
        For c = 0 to 4 'Loop by Distance to go
            nDownAndDistance = 0
            For a = 1 to 10 'Loop by Formation
                
                ReDim aOffTargetsPass(15)
                ReDim aOffTargetsRun(10)
                
                sCarriersPass = ""
                sCarriersRun = ""
                
                nPassIncomplete = cint(aOffensiveFormations(a,b,c,0,1,0,2)) + cint(aOffensiveFormations(a,b,c,0,2,0,2)) + _
                cint(aOffensiveFormations(a,b,c,0,3,0,2)) + cint(aOffensiveFormations(a,b,c,0,4,0,2)) + cint(aOffensiveFormations(a,b,c,0,5,0,2)) + _
                cint(aOffensiveFormations(a,b,c,0,6,0,2)) + cint(aOffensiveFormations(a,b,c,0,7,0,2)) + cint(aOffensiveFormations(a,b,c,0,8,0,2)) + _
                cint(aOffensiveFormations(a,b,c,0,9,0,2)) + cint(aOffensiveFormations(a,b,c,0,10,0,2)) + cint(aOffensiveFormations(a,b,c,0,11,0,2)) + _
                + cint(aOffensiveFormations(a,b,c,0,12,0,2)) + cint(aOffensiveFormations(a,b,c,0,13,0,2)) + cint(aOffensiveFormations(a,b,c,0,14,0,2))
                
                nBackfield = cint(aOffensiveFormations(a,b,c,0,0,0,0))
                
                nPassLeftFlat = cint(aOffensiveFormations(a,b,c,0,1,0,0)) + cint(aOffensiveFormations(a,b,c,0,1,0,2)) 
                nPassLeftShort = cint(aOffensiveFormations(a,b,c,0,2,0,0)) + cint(aOffensiveFormations(a,b,c,0,2,0,2)) 
                nPassLeftMedium = cint(aOffensiveFormations(a,b,c,0,3,0,0)) + cint(aOffensiveFormations(a,b,c,0,3,0,2)) 
                nPassLeftLong = cint(aOffensiveFormations(a,b,c,0,4,0,0)) + cint(aOffensiveFormations(a,b,c,0,4,0,2)) 
                nPassRightFlat = cint(aOffensiveFormations(a,b,c,0,11,0,0)) + cint(aOffensiveFormations(a,b,c,0,11,0,2)) 
                nPassRightShort = cint(aOffensiveFormations(a,b,c,0,12,0,0)) + cint(aOffensiveFormations(a,b,c,0,12,0,2)) 
                nPassRightMedium = cint(aOffensiveFormations(a,b,c,0,13,0,0)) + cint(aOffensiveFormations(a,b,c,0,13,0,2)) 
                nPassRightLong = cint(aOffensiveFormations(a,b,c,0,14,0,0)) + cint(aOffensiveFormations(a,b,c,0,14,0,2)) 
                nPassMidRightShort = cint(aOffensiveFormations(a,b,c,0,8,0,0)) + cint(aOffensiveFormations(a,b,c,0,8,0,2)) 
                nPassMidRightMedium = cint(aOffensiveFormations(a,b,c,0,9,0,0)) + cint(aOffensiveFormations(a,b,c,0,9,0,2)) 
                nPassMidRightLong = cint(aOffensiveFormations(a,b,c,0,10,0,0)) + cint(aOffensiveFormations(a,b,c,0,10,0,2)) 
                nPassMidLeftShort = cint(aOffensiveFormations(a,b,c,0,5,0,0)) + cint(aOffensiveFormations(a,b,c,0,5,0,2)) 
                nPassMidLeftMedium = cint(aOffensiveFormations(a,b,c,0,6,0,0)) + cint(aOffensiveFormations(a,b,c,0,6,0,2)) 
                nPassMidLeftLong = cint(aOffensiveFormations(a,b,c,0,7,0,0)) + cint(aOffensiveFormations(a,b,c,0,7,0,2)) 
                
                nPassTotal = cint(nPassLeftFlat + nPassLeftShort + nPassLeftMedium + nPassLeftLong + nPassRightFlat + nPassRightShort + _
        nPassRightMedium + nPassRightLong + nPassMidRightShort + nPassMidRightMedium + nPassMidRightLong + nPassMidLeftShort + _
        nPassMidLeftMedium + nPassMidLeftLong)

                'Get Success Counts
                nSuccessPass = cint(aOffensiveFormations(a,b,c,0,1,0,1)) + cint(aOffensiveFormations(a,b,c,0,2,0,1)) + _
                cint(aOffensiveFormations(a,b,c,0,3,0,1)) + cint(aOffensiveFormations(a,b,c,0,4,0,1)) + cint(aOffensiveFormations(a,b,c,0,5,0,1)) + _
                cint(aOffensiveFormations(a,b,c,0,6,0,1)) + cint(aOffensiveFormations(a,b,c,0,7,0,1)) + cint(aOffensiveFormations(a,b,c,0,8,0,1)) + _
                cint(aOffensiveFormations(a,b,c,0,9,0,1)) + cint(aOffensiveFormations(a,b,c,0,10,0,1)) + cint(aOffensiveFormations(a,b,c,0,11,0,1)) + _
                + cint(aOffensiveFormations(a,b,c,0,12,0,1)) + cint(aOffensiveFormations(a,b,c,0,13,0,1)) + cint(aOffensiveFormations(a,b,c,0,14,0,1))
                
                If nPassTotal > 0 then 
                    For d = 1 to 9 'Carriers
                        For e = 1 To 14
                            If aOffensiveFormations(a,b,c,d,e,0,0) > 0 then
                                aOffTargetsPass(d) = aOffTargetsPass(d) + aOffensiveFormations(a,b,c,d,e,0,0) + aOffensiveFormations(a,b,c,d,e,0,2)
                            end If
                        Next
                    Next
                    nSuccessPass = cint(nSuccessPass/nPassTotal * 100)
                    For x = 1 To 9 'Carriers
                        If aOffTargetsPass(x) > 0 Then
                            If sCarriersPass = "" Then
                                sCarriersPass = aOffensiveFormations(0,0,0,x,0,0,0) & " " & cint(aOffTargetsPass(x)/nPassTotal*100) & "%"
                            Else
                                sCarriersPass = sCarriersPass & " / " & aOffensiveFormations(0,0,0,x,0,0,0) & " " & cint(aOffTargetsPass(x)/nPassTotal*100) & "%"
                            end if
                        End if
                    Next
                else
                    nSuccessPass = 0
                end if
                
                nRunLeftSLWR = cint(aOffensiveFormations(a,b,c,0,0,1,0))
                nRunLeftWRLOT = cint(aOffensiveFormations(a,b,c,0,0,2,0))
                nRunLeftLOTLG = cint(aOffensiveFormations(a,b,c,0,0,3,0))
                nRunMiddleLGC = cint(aOffensiveFormations(a,b,c,0,0,4,0))
                nRunMiddleCRG = cint(aOffensiveFormations(a,b,c,0,0,5,0))
                nRunRightRGROT = cint(aOffensiveFormations(a,b,c,0,0,6,0))
                nRunRightROTTE = cint(aOffensiveFormations(a,b,c,0,0,7,0))
                nRunRightTEWR = cint(aOffensiveFormations(a,b,c,0,0,8,0))
                nRunRightWRSL = cint(aOffensiveFormations(a,b,c,0,0,9,0))
                
                nRunTotal = nRunLeftSLWR + nRunLeftWRLOT + nRunLeftLOTLG + nRunMiddleLGC + nRunMiddleCRG + nRunRightRGROT + nRunRightROTTE  + _
        nRunRightTEWR + nRunRightWRSL + nBackfield

                'Get Success Counts
                nSuccessRun = cint(aOffensiveFormations(a,b,c,0,0,1,1) + aOffensiveFormations(a,b,c,0,0,2,1) + aOffensiveFormations(a,b,c,0,0,3,1) + _
                aOffensiveFormations(a,b,c,0,0,4,1) + aOffensiveFormations(a,b,c,0,0,5,1) + aOffensiveFormations(a,b,c,0,0,6,1) + aOffensiveFormations(a,b,c,0,0,7,1) + _
                aOffensiveFormations(a,b,c,0,0,8,1) + aOffensiveFormations(a,b,c,0,0,9,1))
                
                If nRunTotal > 0 then 
                    For d = 1 to 9 'Carriers
                        For e = 0 To 9
                            If aOffensiveFormations(a,b,c,d,0,e,0) > 0 then
                                aOffTargetsRun(d) = aOffTargetsRun(d) + aOffensiveFormations(a,b,c,d,0,e,0)
                            end If
                        Next
                    Next
                    nSuccessRun = cint(nSuccessRun/nRunTotal * 100)
                    For x = 1 To 9 'Carriers
                        If aOffTargetsRun(x) > 0 Then
                            If sCarriersRun = "" Then
                                sCarriersRun = aOffensiveFormations(0,0,0,x,0,0,0) & " " & cint(aOffTargetsRun(x)/nRunTotal*100) & "%"
                            Else
                                sCarriersRun = sCarriersRun & " / " & aOffensiveFormations(0,0,0,x,0,0,0) & " " & cint(aOffTargetsRun(x)/nRunTotal*100) & "%"
                            end if
                        End if
                    Next
                else
                    nSuccessRun = 0
                end If
            
                if sCarriersPass = "" then sCarriersPass ="None"
                if sCarriersRun = "" then sCarriersRun ="None"
                
                if nRunTotal>0 or nPassTotal>0 Then
                    
                    if nDownAndDistance = 0 then 'print header
                        sOutput = vbCRLF & "[b]*** " &  aOffensiveFormations(0,b,0,0,0,0,0) & " and " & aOffensiveFormations(0,0,c,0,0,0,0) & " ***[/b]" 
                        WriteToFile GamePlanName, sOutput
                    end if
                    
                    sOutput = vbCRLF & "[u]" & Padding(aOffensiveFormations(a,0,0,0,0,0,0),20,GlobalPad) & "Total Plays: " & nRunTotal+nPassTotal & "[/u]" & vbcrlf 
                 
                    
                if nPassTotal>0 then
                
                sOutput = sOutput & "....Pass.......................(" & nSuccessPass & "% success rate): " & nPassTotal & vbCrLf & _
                          "---- Incomplete............([b]" & nPassIncomplete & "[/b])"& vbcrlf & _
                          "---- Overall.................(left : "& CInt((nPassLeftFlat+nPassLeftShort+nPassLeftMedium+nPassLeftLong)/nPassTotal*100) &"% / "& _
                          "middle : " & CInt((nPassMidLeftShort+nPassMidLeftMedium+nPassMidLeftLong+nPassMidRightShort+nPassMidRightMedium+nPassMidRightLong)/nPassTotal*100) & "% " & _
                          "/ right : " & CInt((nPassRightFlat+nPassRightShort+nPassRightMedium+nPassRightLong)/nPassTotal*100) & "%) "& _
                          ".:. (Flat : "& CInt((nPassLeftFlat+nPassRightFlat)/nPassTotal*100) &"% " & _
                          "/ Short : "& CInt((nPassLeftShort+nPassMidLeftShort+nPassMidRightShort+nPassRightShort)/nPassTotal*100) &"% " & _
                          "/ Medium : "& CInt((nPassLeftMedium+nPassRightMedium+nPassMidRightMedium+nPassMidLeftMedium)/nPassTotal*100) &"% " & _
                          "/ Long : "& CInt((nPassLeftLong+nPassRightLong+nPassMidRightLong+nPassMidLeftLong)/nPassTotal*100) &"%)"& vbcrlf & _
                          "---- Left :........................(Flat : [b]"& nPassLeftFlat & "[/b] - short : [b]" & nPassLeftShort & "[/b] - medium : [b]" & nPassLeftMedium & "[/b] - long : [b]"& nPassLeftLong & "[/b]) "& vbcrlf & _
                          "---- middle Left :.......(short : [b]" & nPassMidLeftShort & "[/b] - medium : [b]" & nPassMidLeftMedium & "[/b] - long : [b]"& nPassMidLeftLong & ")[/b] "& vbcrlf & _
                          "---- middle Right :....(short : [b]" & nPassMidRightShort & "[/b] - medium : [b]" & nPassMidRightMedium & "[/b] - long : [b]"& nPassMidRightLong & ")[/b] "& vbcrlf & _
                          "---- Right :.....................(Flat : [b]"& nPassRightFlat & "[/b] - short : [b]" & nPassRightShort & "[/b] - medium : [b]" & nPassRightMedium & "[/b] - long : [b]"& nPassRightLong & "[/b]) "& vbcrlf
                          
                 sOutput = sOutput & "---- Pass Targets........("& sCarriersPass &")"
                          
                if nRunTotal>0 then  sOutput = sOutput & vbCrLf & vbCrLf 
            
            End If
                    
            if nRunTotal>0 then 
                sOutput = sOutput & "....Run.........................(" & nSuccessRun & "% success rate): " & nRunTotal & vbcrlf & _
                "---- Out- [b]("& nRunLeftSLWR &")[/b] -WR1- [b](" & nRunLeftWRLOT & ")[/b] -LOT- [b](" & nRunLeftLOTLG & ")[/b] -LOG- [b](" & nRunMiddleLGC & ")[/b] -C- [b]("& _
                nRunMiddleCRG &")[/b] -ROG- [b]("& nRunRightRGROT &")[/b] -ROT- [b]("& nRunRightROTTE &")[/b] -TE- [b]("& nRunRightTEWR&")[/b] -WR2- [b]("& nRunRightWRSL &")[/b] -Out" & vbCrLf
                If nBackfield>0 then
                    sOutput = sOutput & "---- Backfield (Sacks) :....("& nBackfield &")"& vbCrLf
                End if 
                sOutput = sOutput & "---- Run Carriers.........("& sCarriersRun &")"
                
            end if
                    
                    WriteToFile GamePlanName, sOutput
                    sOutput = ""
                    
                    nDownAndDistance = nDownAndDistance + 1
                end if
             
            Next
        Next
    Next

    'WriteToFile GamePlanName, sOutput

    Dim nTotalPlays, aBlitzers, bAddedTitle, bDownAdded, SkipDown
    
    'vbCRLF & vbCRLF & 
    sOutput = vbCRLF & vbCRLF & vbCRLF & "[b]******************* Defensive Formation Breakdown (" & sName & ") **************[/b]" & vbCRLF
    sOutput = sOutput & vbCRLF & "[b]********** Overall Breakdown **********[/b]"

    WriteToFile GamePlanName, sOutput

    'aDefensiveFormations(11,5,5,24,16)
    nTotalPlays=0
    For a = 1 to 10 'Loop by Defensive Formations
        bAddedTitle = 0
        For d = 1 to 24 'Defensive Formation
            sBlitzer = ""
            nTotalPlays = 0
            nSuccess = 0
            nSuccessRun = 0
            nSuccessPass = 0
            nRunTotal = 0
            nPassTotal = 0
            redim aBlitzers(16)
            For b = 1 to 4 'By Downs
                For c = 0 to 4 'By Distance
                    'WriteToFile LogName, "a(" & a & ") b(" & b & ") c(" & c & ") d(" & d & ") e(0) f(0) g(0) = " & cint(aDefensiveFormations(a,b,c,d,0,0,0))
                    WriteToFile LogName, "PASS -- a(" & a & ") b(" & b & ") c(" & c & ") d(" & d & ") e(0) f(0) g(1) = " & cint(aDefensiveFormations(a,b,c,d,0,0,1))
                    WriteToFile LogName, "RUN  -- a(" & a & ") b(" & b & ") c(" & c & ") d(" & d & ") e(0) f(0) g(2) = " & cint(aDefensiveFormations(a,b,c,d,0,0,2))
                    
                    if aDefensiveFormations(a,b,c,d,0,0,1) >= 1 or aDefensiveFormations(a,b,c,d,0,0,2) >= 1 then
                        
                        nTotalPlays = nTotalPlays + aDefensiveFormations(a,b,c,d,0,0,1) + aDefensiveFormations(a,b,c,d,0,0,2)
                        nSuccess = nSuccess + aDefensiveFormations(a,b,c,d,0,1,1) + aDefensiveFormations(a,b,c,d,0,1,2)
                        
                        nPassTotal = nPassTotal + aDefensiveFormations(a,b,c,d,0,0,1)
                        nSuccessPass = nSuccessPass + aDefensiveFormations(a,b,c,d,0,1,1)
                        
                        nRunTotal = nRunTotal + aDefensiveFormations(a,b,c,d,0,0,2)
                        nSuccessRun = nSuccessRun + aDefensiveFormations(a,b,c,d,0,1,2)
                        
                    end if
                    For e = 1 to 16 'Blitzer
                        If aDefensiveFormations(a,b,c,d,e,0,0) > 0 then
                            aBlitzers(e) = aBlitzers(e) + aDefensiveFormations(a,b,c,d,e,0,0)
                        end if
                    next
                next
            next
            
            
            sBlitzer = ""
            if nTotalPlays > 0 then
                For x = 1 To 16
                    If aBlitzers(x) > 0 Then
                        If sBlitzer = "" Then
                            sBlitzer = aDefensiveFormations(0,0,0,0,x,0,0) & " " & cint(aBlitzers(x)/nTotalPlays*100) & "%"
                        Else
                            sBlitzer = sBlitzer & " / " & aDefensiveFormations(0,0,0,0,x,0,0) & " " & cint(aBlitzers(x)/nTotalPlays*100) & "%"
                        end if
                    End if
                Next
            end if
            
            if sBlitzer="" then sBlitzer="None"
            
            if nTotalPlays>0 then
                nSuccess = cint(nSuccess/nTotalPlays * 100)
                
                If nPassTotal > 0 then 
                    nSuccessPass = cint(nSuccessPass/nPassTotal * 100)
                else
                    nSuccessPass = 0
                end if

                If nRunTotal > 0 then 
                    nSuccessRun = cint(nSuccessRun/nRunTotal * 100)
                else
                    nSuccessRun = 0
                end if
                
                If bAddedTitle=0 Then
                    sOutput = vbCRLF  & "[b]*** " & aDefensiveFormations(a,0,0,0,0,0,0) & " ***[/b]"
                    WriteToFile GamePlanName, sOutput
                    bAddedTitle = 1
                end if
                sOutput = vbCRLF & "[u]" & Padding(aDefensiveFormations(0,0,0,d,0,0,0),20,GlobalPad) & "Total Plays: " & nTotalPlays & "  Blitzers: " & sBlitzer & "[/u]" & vbcrlf
                if nPassTotal>0 then
                    sOutput = sOutput & "....Pass(" & nSuccessPass & "% success rate): " & nPassTotal & vbcrlf
                end if
                if nRunTotal>0 then
                    sOutput = sOutput & "....Run (" & nSuccessRun & "% success rate): " & nRunTotal
                end if
                
                WriteToFile GamePlanName, sOutput
            end if
        next
    next


    sOutput = vbCRLF & vbCRLF & "[b]********** Breakdown By Down **********[/b]"
    WriteToFile GamePlanName, sOutput


    'aDefensiveFormations(11,5,5,9,13)
    For b = 1 to 4 'By Downs
        For c = 0 to 4 'By Distance
            bDownAdded = 0
            'sOutput = sOutput & vbCRLF & vbCRLF & "*** " & aDefensiveFormations(0,b,0,0,0,0) & " and " & aDefensiveFormations(0,0,c,0,0,0) & " ***" 
            sOutput = vbCRLF & vbCRLF & "[b]*** " & aDefensiveFormations(0,b,0,0,0,0,0) & " and " & aDefensiveFormations(0,0,c,0,0,0,0) & " ***[/b]" 
            WriteToFile GamePlanName, sOutput
            
            For a = 1 to 10 'Loop by Offensive Formations
                bAddedTitle = 0

                For d = 1 to 24 'Defensive Formation
                    redim aBlitzers(16)
                    nTotalPlays = 0
                    nSuccess = 0
                    nSuccessRun = 0
                    nSuccessPass = 0
                    nRunTotal = 0
                    nPassTotal = 0

                    if aDefensiveFormations(a,b,c,d,0,0,1) >= 1 or aDefensiveFormations(a,b,c,d,0,0,2) >= 1 then
                        nTotalPlays = nTotalPlays + aDefensiveFormations(a,b,c,d,0,0,1) + aDefensiveFormations(a,b,c,d,0,0,2)
                        nSuccess = nSuccess + aDefensiveFormations(a,b,c,d,0,1,1) + aDefensiveFormations(a,b,c,d,0,1,2)
                        
                        WriteToFile LogName, "aDefensiveFormations-pass-total(" & a & "," & b & "," & c & "," & d & ",0,0,1,0)=" & aDefensiveFormations(a,b,c,d,0,0,1) & _
                                            " aDefensiveFormations-run-total(" & a & "," & b & "," & c & "," & d & ",0,0,2,0)=" & aDefensiveFormations(a,b,c,d,0,0,2)
                                            
                        WriteToFile LogName, "aDefensiveFormations-pass-success(" & a & "," & b & "," & c & "," & d & ",0,1,1,0)=" & aDefensiveFormations(a,b,c,d,0,1,1) & _
                                            " aDefensiveFormations-run-success(" & a & "," & b & "," & c & "," & d & ",0,1,2,0)=" & aDefensiveFormations(a,b,c,d,0,1,2)


                        nPassTotal = nPassTotal + aDefensiveFormations(a,b,c,d,0,0,1)
                        nSuccessPass = nSuccessPass + aDefensiveFormations(a,b,c,d,0,1,1)
                        
                        nRunTotal = nRunTotal + aDefensiveFormations(a,b,c,d,0,0,2)
                        nSuccessRun = nSuccessRun + aDefensiveFormations(a,b,c,d,0,1,2)

                    end if
                    
                    For e = 1 to 16 'Blitzer
                        If aDefensiveFormations(a,b,c,d,e,0,0) > 0 then
                            aBlitzers(e) = aBlitzers(e) + aDefensiveFormations(a,b,c,d,e,0,0)
                        end if
                    next

                    sBlitzer = ""
                    if nTotalPlays > 0 then
                        For x = 1 To 16
                            If aBlitzers(x) > 0 Then
                                If sBlitzer = "" Then
                                    sBlitzer = aDefensiveFormations(0,0,0,0,x,0,0) & " " & cint(aBlitzers(x)/nTotalPlays*100) & "%"
                                Else
                                    sBlitzer = sBlitzer & " / " & aDefensiveFormations(0,0,0,0,x,0,0) & " " & cint(aBlitzers(x)/nTotalPlays*100) & "%"
                                end if
                            End if
                        Next
                    end if

                    if sBlitzer="" then sBlitzer="None"
                    
                    if nTotalPlays>0 then
                        nSuccess = cint(nSuccess/nTotalPlays * 100)
                            
                        If nPassTotal > 0 then 
                            WriteToFile LogName, "SuccessPass(" & nSuccessPass & ") / PassTotal(" & nPassTotal & ")" 
                            nSuccessPass = cint(nSuccessPass/nPassTotal * 100)
                        else
                            nSuccessPass = 0
                        end if
            
                        If nRunTotal > 0 then 
                            WriteToFile LogName, "SuccessRun(" & nSuccessRun & ") / RunTotal(" & nRunTotal & ")" 
                            nSuccessRun = cint(nSuccessRun/nRunTotal * 100)
                        else
                            nSuccessRun = 0
                        end if
    
                        If bAddedTitle=0 Then
                            sOutput = vbCRLF & "[b][i]* " & aDefensiveFormations(a,0,0,0,0,0,0) & " *[/i][/b]"
                            WriteToFile GamePlanName, sOutput
                            bAddedTitle = 1
                            bDownAdded = 1
                        end if
    
                        'sOutput = vbCRLF & Padding(aDefensiveFormations(0,0,0,d,0,0),20,GlobalPad) & "Total Plays(sr-" & nSuccess & "%): " & nTotalPlays & "  Blitzers: " & sBlitzer
                        sOutput = vbcrlf & vbCRLF & "[u]" &  Padding(aDefensiveFormations(0,0,0,d,0,0,0),20,GlobalPad) & "Total Plays: " & _
                        nTotalPlays & "  Blitzers: " & sBlitzer & "[/u]" & vbcrlf
                        if nPassTotal>0 then
                            sOutput = sOutput & "....Pass(" & nSuccessPass & "% success rate): " & nPassTotal
                            if nRunTotal>0 then sOutput = sOutput & vbcrlf
                        end if
                        if nRunTotal>0 then
                            sOutput = sOutput & "....Run (" & nSuccessRun & "% success rate): " & nRunTotal
                        end if
                            
                        WriteToFile GamePlanName, sOutput
                    end if

                next
            next
            
        next
    next

    sOutput = vbCRLF & "[b]******************* Defensive Sacks (" & sName & ") **************[/b]" & vbCRLF

    If sOutputBlitzSuccess > "" Then
        sOutput = sOutput & vbCRLF & sOutputBlitzSuccess
    else
        sOutput = sOutput & vbCRLF & "None"
    end if
    
    WriteToFile GamePlanName, sOutput
    'sOutput = ""

    WriteToFile LogName, "GetGameBreakDown: End"
End Sub



'*********************** BEGIN SCRIPT ************************
Dim PlayByPlayHistory, LogName, GamePlanName, PlayByPlayOffLog, PlayByPlayDefLog, TeamID, CommandLineUsed 'GlobalVars
Dim sData, sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName
Dim OpponentID, WshShell, sn, fn, fp, bRegularGame, Password, UserName, Language, LanguageExt
Dim i, sAppendToLog, nTeamID_Param, nOppID_Param, nHistory_Param, GamePlanNameDef

Set WshShell = WScript.CreateObject("WScript.Shell")

'ADDED to create the logs in the same DIR at the vbscript
sn = Wscript.ScriptName '        Script Name        
fn = Wscript.ScriptFullName '    Fully Qualified Script Name
fp = Replace(fn, "\" & sn, "") ' Drive / Folder path


If Right(lCase(wscript.fullname),11)= "wscript.exe" then
    CommandLineUsed = 0 'False
else
    CommandLineUsed = 1 'True
end if

If CommandLineUsed=1 Then
    if Wscript.Arguments.Count=0 then
        Wscript.Echo "Parameters required:  TeamID OpponentID History GameType"
        Wscript.Quit
    end if
    
    if Wscript.Arguments.Count<4 then
        Wscript.Echo "Parameters required:  TeamID OpponentID History GameType"
        Wscript.Quit
    end if
    
    TeamID = Wscript.Arguments(0)
    nOppID_Param = Wscript.Arguments(1)
    nHistory_Param = Wscript.Arguments(2)
    bRegularGame = Wscript.Arguments(3)
    if Wscript.Arguments.Count >= 5 then UserName = Wscript.Arguments(4)
    if Wscript.Arguments.Count >= 6 then Password = Wscript.Arguments(5)
    if Wscript.Arguments.Count >= 7 then Language = Wscript.Arguments(6)
    
    if UserName_Override <> "" then UserName = UserName_Override
    if Password_Override <> "" then Password = Password_Override
    if Language_Override <> "" then Language = Language_Override
    if Language = "" then 
    	Language = "English"
    Else 
    	If Language<>"English" Then
    		LanguageExt = Split(Language,"+")
    		Language = LanguageExt(0)
    	Else
    		ReDim LanguageExt(2)
    		LanguageExt(0) = "English"
    		LanguageExt(1) = "us"
    	End If
    End If
        
end if

if UserName="" or Password="" then
    if CommandLineUsed = 1 then
        Wscript.Echo "Please edit the configuration file and add your UserName and Password."
        WshShell.Run "%windir%\notepad " & fp & "\RunGLBBatch.vbs"
    else
        Wscript.Echo "Please edit the vbs file and enter username_override and password_override"
        WshShell.Run "%windir%\notepad " & fp & "\GLBGameScout.vbs"
    end if
Else

    if CommandLineUsed = 0 then
        if TeamID="" then
            TeamID = InputBox("Please enter the Team ID for the your team (NOT THE ONE YOU ARE SCOUTING)","GLB Game Scout","", 100, 100)
        else
            TeamID = TeamID_Override
        end if

        OpponentID = InputBox("Please enter the Team ID of the opponent you wish to scout","GLB Game Scout","", 100, 100)
    else
        OpponentID = nOppID_Param
    end if
    
    sAppendToLog =  "\" & TeamID & "vs" & OpponentID & "_"
    
    If LogName_Override = "" or CommandLineUsed=1 then
        LogName= fp & sAppendToLog & "GLB-Parse-Debug.log" 
    else
        LogName=LogName_Override
    end if
    
    If GamePlanName_Override = "" or CommandLineUsed=1  then
        GamePlanName= fp & sAppendToLog & "GLB-GamePlan.txt"
        GamePlanNameDef= fp & sAppendToLog & "GLB-GamePlanDef.txt"
    else
        GamePlanName=GamePlanName_Override
        GamePlanName=GamePlanName_Override
    end if

    If PlayByPlayOffLog_Override = "" or CommandLineUsed=1 then
        PlayByPlayOffLog= fp & sAppendToLog & "GLB-PlayByPlayOff.txt" 
    else
        PlayByPlayOffLog=PlayByPlayOffLog_Override
    end if

    If PlayByPlayDefLog_Override = "" or CommandLineUsed=1 then
        PlayByPlayDefLog= fp & sAppendToLog & "GLB-PlayByPlayDef.txt"
    else
        PlayByPlayDefLog=PlayByPlayDefLog_Override
    end if

    DeleteLogs
    
    WriteToFile LogName, "Begin script"

    if len(OpponentID) > 4 or len(OpponentID)< 1 then 
        WriteToFile LogName, "Input box: " & OpponentID
        Wscript.Echo "The ID you entered is not valid.  Please ensure it is a up to a 4 digit number found at the end of the URL when you click on your oppenent"
    else
    
        
        'Prompt for Replay Histo
        if CommandLineUsed=0 then
            PlayByPlayHistory = InputBox("Enter the Amount of Games to go back to parse replays. (WARNING THIS PROCESS TAKES A LOT OF TIME)","GLB Game Scout","1", 100, 100)
            PlayByPlayHistory = cint(PlayByPlayHistory) 
        else
            PlayByPlayHistory = cint(nHistory_Param)
        end if
        
        'Prompt for Scrimage vs. Regular
        if CommandLineUsed=0 then
            bRegularGame = InputBox("Enter 0 if you want to run this for scrimmages or 1 to run for regular games","GLB Game Scout","1", 100, 100)
            bRegularGame = cint(bRegularGame) 
        end if


        sSession = GetSession()
        
        GetTeamPages sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName
        
        GetTeamMatchup sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName
        
        GetTeamPlayers sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName
        
        GetRankings sSession, sTeam_Page, sOpp_Page, sTeamName, sOppName
        
        GetGameBreakDown sSession, sOpp_Page, sOppName, bRegularGame
        
        Wscript.Echo "Completed: Please see the file (" & GamePlanName & ") and (" & GamePlanName & ") for the results"
        
        WshShell.Run "%windir%\notepad " & GamePlanName
        'WshShell.Run "%windir%\notepad " & GamePlanNameDef

    end if

    WriteToFile LogName, "End script"

End if

WScript.Quit


