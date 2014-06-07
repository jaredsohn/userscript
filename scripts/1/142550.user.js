// ## Greasemonkey Metadata ###########################################
// ==UserScript==
// @name          Make Apps
// @namespace     http://userscripts.org/users/frantoniio
// @description   Prism_Webrunner_Alternative
// ==/UserScript==
Set objWSHShell = CreateObject("WScript.Shell")
Set objNet = CreateObject("WScript.NetWork")
Set objFSO = CreateObject ("Scripting.FileSystemObject")

sUsername = objNet.UserName
sDir = "C:\Users\" &  sUsername

sUrl = InputBox("Which URL should become an isolated app?")
sUrl = Trim(sUrl)
If Not InStr(sUrl, "http") = 1 Then
   sUrl = "http://" & sUrl
End If


Set reNoHttp = New RegExp
reNoHttp.Pattern = "^https?://"
sDomain = reNoHttp.Replace(sUrl, "")

Set reJustAlphaNumeric = New RegExp
reJustAlphaNumeric.Global = True
reJustAlphaNumeric.Pattern = "[^\w\d]"
sProfileFolder = reJustAlphaNumeric.Replace(sDomain, "_")

sProfileFolder = InputBox("What profile name do you want?", "Choose a profile name", sProfileFolder)

sProfileFolder = reJustAlphaNumeric.Replace(sProfileFolder, "_")

If sProfileFolder <> "" And sDomain <> "" Then

   sProfileDir = sDir & "\chrome_apps\profiles\" & sProfileFolder

   sExecPath = sDir & "\AppData\Local\Google\Chrome\Application\chrome.exe"
   sArgs = "--user-data-dir=" & sProfileDir & " " & sUrl
      
   sShortcutFile = sDir & "\chrome_apps\shortcuts\" & sProfileFolder & ".lnk"

   If Not objFSO.FolderExists(sProfileDir) Then
      objFSO.CreateFolder(sProfileDir)
   End If
   set objSC = objWSHShell.CreateShortcut(sShortcutFile)
   objSC.TargetPath = sExecPath
   objSC.Arguments = sArgs

   objSC.Save
   
End If