// ==UserScript==
// @name           NeoQuest II Trainer
// @namespace      http://nq2guy.tz/
// @description    Automatically battles and moves left and right for you.
// @include        http://www.neopets.com/games/nq2/nq2.phtml*
// ==/UserScript==

Option Explicit

Private Type typHealthArray
    strHealth As String
    strMHealth As String
End Type

Dim Dpage As String, DBpage As String, varMisc As String, nxActor As String, i As Integer, theTarget As Integer
Dim StopTheProgram As Boolean, RohaneDied As Boolean, usedPotion As Boolean, actPotion As Integer, actCharacter As String
Dim HealthMissing As Integer, MHealthMissing As Integer, THealthMissing As Integer, VHealthMissing As Integer

Public Function NQFight()
    Status.Caption = "Starting Fight!"
    Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "start=1", "http://neopets.com/games/nq2/nq2.phtml")
    Do
        UpdateHealth
        If InStrB(1, UCase(Dpage), UCase("http://images.neopets.com/nq2/x/com_atk.gif")) <> 0 Then
            For i = 5 To 8
                If InStrB(1, Dpage, "<A href=" & Chr(34) & "javascript:;" & Chr(34) & " onClick=" & Chr(34) & "settarget(" & i) <> 0 Then
                    theTarget = i
                    Exit For
                End If
            Next i
            UpdateHealth
            If InStrB(1, Dpage, "<FONT color=" & Chr(34) & "red" & Chr(34) & ">Rohane</FONT><BR>") <> 0 Then
                Potions "R", HealthMissing
                If usedPotion = False Then
                    Status.Caption = "Rohane attacks the opponent!"
                    Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=" & theTarget & "&fact=3&parm=&use_id=-1&nxactor=1", "http://neopets.com/games/nq2/nq2.phtml")
                End If
            ElseIf InStrB(1, Dpage, "<FONT color=" & Chr(34) & "red" & Chr(34) & ">Mipsy</FONT><BR>") <> 0 Then
                Potions "M", MHealthMissing
                If usedPotion = False Then
                    Status.Caption = "Mipsy uses Direct Damage!"
                    Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=" & theTarget & "&fact=9201&parm=&use_id=-1&nxactor=2", "http://neopets.com/games/nq2/nq2.phtml")
                End If
            ElseIf InStrB(1, Dpage, "<FONT color=" & Chr(34) & "red" & Chr(34) & ">Talinia</FONT><BR>") <> 0 Then
                Potions "T", THealthMissing
                If usedPotion = False Then
                    Status.Caption = "Talinia sprays arrows!"
                    Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=" & theTarget & "&fact=9302&parm=&use_id=-1&nxactor=3", "http://neopets.com/games/nq2/nq2.phtml")
                    If InStrB(1, UCase(Dpage), UCase("you must wait a few more seconds before using")) <> 0 Then
                        Status.Caption = "Talinia attacks the opponent!"
                        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=" & theTarget & "&fact=3&parm=&use_id=-1&nxactor=3", "http://neopets.com/games/nq2/nq2.phtml")
                    End If
                End If
            ElseIf InStrB(1, Dpage, "<FONT color=" & Chr(34) & "red" & Chr(34) & ">Velm</FONT><BR>") <> 0 Then
                Status.Caption = "Velm Group Heals!"
                Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=9402&parm=&use_id=-1&nxactor=4", "http://neopets.com/games/nq2/nq2.phtml")
            End If
            If InStrB(1, UCase(Dpage), UCase("http://images.neopets.com/nq2/x/com_end.gif")) <> 0 Then Exit Do
            UpdateHealth
        ElseIf InStrB(1, UCase(Dpage), UCase("http://images.neopets.com/nq2/x/com_next.gif")) <> 0 Then
            UpdateHealth
            Status.Caption = "Opponent(s) attacks back!"
            If InStrB(1, Dpage, Chr(34) & "nxactor" & Chr(34) & " value=") <> 0 Then nxActor = GetBetween(Dpage, Chr(34) & "nxactor" & Chr(34) & " value=" & Chr(34), Chr(34))
            Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=1&parm=&use_id=-1&nxactor=" & nxActor, "http://neopets.com/games/nq2/nq2.phtml")
            If InStrB(1, UCase(Dpage), UCase("http://images.neopets.com/nq2/x/com_end.gif")) <> 0 Then Exit Do
            UpdateHealth
        ElseIf InStrB(1, UCase(Dpage), UCase("http://images.neopets.com/nq2/x/com_end.gif")) <> 0 Then Exit Do
        Else
            Status.Caption = "Reloading Page..."
            Dpage = HTTPWrapper.GetWrapper("http://neopets.com/games/nq2/nq2.phtml?", "http://neopets.com/games/nq2/nq2.phtml")
            UpdateHealth
        End If
        If InStrB(1, UCase(Dpage), UCase("http://images.neopets.com/nq2/x/com_end.gif")) <> 0 Then Exit Do
    Loop
    Status.Caption = "Finishing Fight..."
    Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=2&parm=&use_id=-1&nxactor=1", "http://neopets.com/games/nq2/nq2.phtml")
    If InStrB(1, Dpage, "You lost the fight") <> 0 Then ' "You lost"
        RohaneDied = True
        Status.Caption = "Lost the Fight"
    End If
    Status.Caption = "Won the Fight"
    Dpage = HTTPWrapper.GetWrapper("http://neopets.com/games/nq2/nq2.phtml?finish=1", "http://neopets.com/games/nq2/nq2.phtml")
End Function

Private Sub cmdStop_Click()
    StopTheProgram = True
End Sub

Private Sub Form_Terminate()
    End
End Sub

Private Sub Form_Unload(Cancel As Integer)
    End
End Sub

Private Sub StartNQ2_Click()
Dpage = HTTPWrapper.GetWrapper("http://neopets.com/games/nq2/nq2.phtml", HTTPWrapper.LastPage)

If InStrB(1, Dpage, "You are in the village ") <> 0 Then
    Status.Caption = "Leave the Village First"
Else
    fraStart.Visible = False
    fraStop.Visible = True
    Status.Caption = "Starting Game Up..."
    HTTPWrapper.GetWrapper "http://www.neopets.com/games/nq2/nq2.phtml", "http://www.neopets.com/games/nq2/nq2.phtml"
    HTTPWrapper.GetWrapper "http://www.neopets.com/games/nq2/nq2.phtml?startgame=1", HTTPWrapper.LastPage
    Status.Caption = "Changing to Hunting Mode..."
    Dpage = HTTPWrapper.PostWrapper("http://www.neopets.com/games/nq2/nq2.phtml", "act=travel&mode=2", "http://www.neopets.com/games/nq2/nq2.phtml")
    Dpage = HTTPWrapper.GetWrapper("http://www.neopets.com/games/nq2/nq2.phtml", "http://www.neopets.com/games/nq2/nq2.phtml")
    If InStrB(1, Dpage, "Rohane") <> 0 Then
        Training
    Else
        Status.Caption = "Couldn't Start Game... Try Again"
        fraStart.Visible = True
        fraStop.Visible = False
    End If
End If
End Sub

Public Function Training()
    StopTheProgram = False
    RohaneDied = False
    Do Until StopTheProgram = True Or RohaneDied = True
        Status.Caption = "Searching for Opponents"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "act=move&dir=3", "http://neopets.com/games/nq2/nq2.phtml")
        If InStrB(1, UCase(Dpage), UCase("You are attacked")) <> 0 Then
            NQFight
        End If
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "act=move&dir=4", "http://neopets.com/games/nq2/nq2.phtml")
        If InStrB(1, UCase(Dpage), UCase("You are attacked")) <> 0 Then
            NQFight
        End If
    Loop
    If StopTheProgram = True Then
        Status.Caption = "Training has Stopped"
    ElseIf RohaneDied = True Then
        Status.Caption = "You have been Defeated"
        RHealth.Text = RMHealth.Text
        MHealth.Text = MMHealth.Text
        THealth.Text = TMHealth.Text
        VHealth.Text = VMHealth.Text
    End If
    fraStart.Visible = True
    fraStop.Visible = False
End Function

Public Function UpdateHealth()
DBpage = Dpage
Dim tempHealth As typHealthArray
    tempHealth = CheckHealth("Rohane")
    If Len(tempHealth.strHealth) > 0 And Len(tempHealth.strMHealth) > 0 Then
        RHealth.Text = tempHealth.strHealth
        RMHealth.Text = tempHealth.strMHealth
        HealthMissing = Val(RMHealth.Text) - Val(RHealth.Text)
    End If
    tempHealth = CheckHealth("Mipsy")
    If Len(tempHealth.strHealth) > 0 And Len(tempHealth.strMHealth) > 0 Then
        MHealth.Text = tempHealth.strHealth
        MMHealth.Text = tempHealth.strMHealth
        MHealthMissing = Val(MMHealth.Text) - Val(MHealth.Text)
    End If
    tempHealth = CheckHealth("Talinia")
    If Len(tempHealth.strHealth) > 0 And Len(tempHealth.strMHealth) > 0 Then
        THealth.Text = tempHealth.strHealth
        TMHealth.Text = tempHealth.strMHealth
        THealthMissing = Val(TMHealth.Text) - Val(THealth.Text)
    End If
    tempHealth = CheckHealth("Velm")
    If Len(tempHealth.strHealth) > 0 And Len(tempHealth.strMHealth) > 0 Then
        VHealth.Text = tempHealth.strHealth
        VMHealth.Text = tempHealth.strMHealth
        VHealthMissing = Val(VMHealth.Text) - Val(VHealth.Text)
    End If
End Function

Private Function CheckHealth(ByVal strPlayer As String) As typHealthArray
Dim arrColour(1 To 3) As String, intColourCount As Integer
    arrColour(1) = "green"
    arrColour(2) = "#d0d000"
    arrColour(3) = "red"
    varMisc = ""
    CheckHealth.strHealth = 0
    CheckHealth.strMHealth = 0
    For intColourCount = LBound(arrColour) To UBound(arrColour)
        If InStrB(1, DBpage, strPlayer) <> 0 Then
            If InStrB(1, DBpage, strPlayer & "<BR><TABLE><TR><TD><FONT color=" & Chr(34) & arrColour(intColourCount) & Chr(34) & ">") <> 0 Then
                varMisc = "-" & GetBetween(DBpage, strPlayer & "<BR><TABLE><TR><TD><FONT color=" & Chr(34) & arrColour(intColourCount) & Chr(34) & ">", "</FONT>") & "+"
                Exit For
            ElseIf InStrB(1, DBpage, strPlayer & "</B></FONT><BR><TABLE><TR><TD><FONT color=" & Chr(34) & arrColour(intColourCount) & Chr(34) & ">") <> 0 Then
                varMisc = "-" & GetBetween(DBpage, strPlayer & "</B></FONT><BR><TABLE><TR><TD><FONT color=" & Chr(34) & arrColour(intColourCount) & Chr(34) & ">", "</FONT>") & "+"
                Exit For
            End If
        Else
            Exit For
        End If
    Next intColourCount
    If Len(varMisc) > 0 Then
        If InStrB(1, varMisc, "<") = 0 Then
            CheckHealth.strHealth = GetBetween(varMisc, "-", "/")
            CheckHealth.strMHealth = GetBetween(varMisc, "/", "+")
        End If
        DBpage = GetBetween(DBpage, CheckHealth.strHealth & "/" & CheckHealth.strMHealth, "</html") & "</html"
    End If
End Function

Public Function Potions(inChar As String, inMissing As Integer)
    usedPotion = True
    If inChar = "R" Then
        actPotion = 1
        actCharacter = "Rohane"
    ElseIf inChar = "M" Then
        actPotion = 2
        actCharacter = "Mipsy"
    ElseIf inChar = "T" Then
        actPotion = 3
        actCharacter = "Talinia"
    End If
    If inMissing >= 130 And InStrB(1, Dpage, ">Stamina Potion<") <> 0 Then
        Status.Caption = actCharacter & " uses a Stamina Potion"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30042&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 120 And InStrB(1, Dpage, ">Vitality Potion<") <> 0 Then
        Status.Caption = actCharacter & " uses a Vitality Potion"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30041&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 110 And InStrB(1, Dpage, ">Potion of Abundant Health<") <> 0 Then
        Status.Caption = actCharacter & " uses a Potion of Abundant Health"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30033&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 100 And InStrB(1, Dpage, ">Potion of Greater Health<") <> 0 Then
        Status.Caption = actCharacter & " uses a Potion of Greater Health"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30032&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 90 And InStrB(1, Dpage, ">Potion of Potent Health<") <> 0 Then
        Status.Caption = actCharacter & " uses a Potion of Potent Health"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30031&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 80 And InStrB(1, Dpage, ">Potion of Growth<") <> 0 Then
        Status.Caption = actCharacter & " uses a Potion of Growth"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30023&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 70 And InStrB(1, Dpage, ">Potion of Fortitude<") <> 0 Then
        Status.Caption = actCharacter & " uses a Potion of Fortitude"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30022&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 60 And InStrB(1, Dpage, ">Potion of Regeneration<") <> 0 Then
        Status.Caption = actCharacter & " uses a Potion of Regeneration"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30021&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 50 And InStrB(1, Dpage, ">Healing Bottle<") <> 0 Then
        Status.Caption = actCharacter & " uses a Healing Bottle"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30014&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 35 And InStrB(1, Dpage, ">Healing Potion<") <> 0 Then
        Status.Caption = actCharacter & " uses a Healing Potion"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30013&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 25 And InStrB(1, Dpage, ">Healing Flask<") <> 0 Then
        Status.Caption = actCharacter & " uses a Healing Flask"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30012&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    ElseIf inMissing >= 15 And InStrB(1, Dpage, ">Healing Vial<") <> 0 Then
        Status.Caption = actCharacter & " uses a Healing Vial"
        Dpage = HTTPWrapper.PostWrapper("http://neopets.com/games/nq2/nq2.phtml", "target=-1&fact=5&parm=&use_id=30011&nxactor=" & actPotion, "http://neopets.com/games/nq2/nq2.phtml")
    Else
        usedPotion = False
    End If
End Function