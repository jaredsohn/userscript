// ==UserScript==
// @name           ELiran Private
// @namespace      ELiran Private
// @description    ELiran Private
// @include        http://apps.facebook.com/onthefarm/*
// @include        http://apps.facebook.com/onthefarm/*
// ==/UserScript==



; FARMVILLE 1.0
; by Marian
; www.marian001.com

; optimalized for 1280x800 screens and IE7 (without additional toolbars) running on Vista

#include <IE.au3>
#include <String.au3>
#include <math.au3>


Opt("WinWaitDelay", 100)
Opt("WinTitleMatchMode", 4)
Opt("WinDetectHiddenText", 1)
Opt("MouseCoordMode", 0)

HotKeySet("{ESC}", "Terminate")
Global $begin = TimerInit()
Global $restore = False
Global $clicks = 0
Global $delay = 300

$email = "your email" ; Facebook login
$password = "your password" ; Facebook password

;;;;;;;;;;;;;;  DEFINE YOUR FIELD (always use middle of a field tile) ;;;;;;;;;;;;;;;;;;
; first imagine you turn whole field 90 degrees clockwise
; you might need to use ScriptWriter to define following corners
$TLx = 136 ; top left x
$TLy = 433 ; top left y
$TRx = 686 ; top right x
$TRy = 168 ; top righy y
$BLx = 641 ; bottom left x
$BLy = 672 ; bottom left y
$BRx = 1190 ; bottom right x
$BRy = 408 ; bottom right y
$columns = 12
$rows = 11

;;;;;;;;;;;;;;;;  initialize ;;;;;;;;;;;;

_Initialize()

;;;;;;;;;;;;;;;;  WORK COMES HERE ;;;;;;

;_Restore()

;_Harvest()

;_Plow()


;_Plant(1, 6) ; pumpkin (8 h)
;_Plant(2, 2) ; rice (12 h)
_Plant(2, 4) ; peppers (24 h)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

_Finalize()

;;;;;;;;;;;;;;;;; functions ;;;;;;;;;;;;;;;;;;;;;;;;

Func _Initialize()
	ConsoleWrite("Initializing... " & @CRLF)
	$oIE = _IECreate("about:blank", 0, 1) ; 1 - visible
	$oIE = _IEAttach("about:blank", "url")
	_IELoadWait($oIE)
	_IENavigate($oIE, "http://apps.facebook.com/onthefarm/index.php?ref=tab")
	_IELoadWait($oIE)
	If StringInStr(_IEPropertyGet($oIE, "title"), "Login") Then
		$oLForm = _IEFormGetCollection($oIE, 0)

		$oEmail = _IEFormElementGetObjByName($oLForm, "email")
		_IEFormElementSetValue($oEmail, $email)
		$oPass = _IEFormElementGetObjByName($oLForm, "pass")
		_IEFormElementSetValue($oPass, $password)

		_IEFormSubmit($oLForm)
		_IELoadWait($oIE)
		_IENavigate($oIE, "http://apps.facebook.com/onthefarm/index.php?ref=tab")
		_IELoadWait($oIE)
	EndIf
	_IENavigate($oIE, "http://apps.facebook.com/onthefarm/index.php?ref=tab")
	_IELoadWait($oIE)
	WinWait("FarmVille on Facebook - Windows Internet Explorer", "Favorites Command Ba")
	If Not WinActive("FarmVille on Facebook - Windows Internet Explorer", "Favorites Command Ba") Then WinActivate("FarmVille on Facebook - Windows Internet Explorer", "Favorites Command Ba")
	WinWaitActive("FarmVille on Facebook - Windows Internet Explorer", "Favorites Command Ba")
	WinSetState("FarmVille on Facebook - Windows Internet Explorer", "", @SW_MAXIMIZE)

	Sleep($delay * 20)

	_Click(859, 675) ; full screen

	WinWait(" - Adobe Flash Player", "")
	If Not WinActive(" - Adobe Flash Player", "") Then WinActivate(" - Adobe Flash Player", "")
	WinWaitActive(" - Adobe Flash Player", "")
	Send("{SPACE}")
	_Click(922, 663) ; zoom out
	_Click(922, 663) ; zoom out

	;_Click(894, 710) ; arrow
	;_Click(896, 759) ; mail
	;_Click(942, 760) ; market
EndFunc   ;==>_Initialize

Func _Click($x, $y)
	MouseMove($x, $y)
	MouseDown("left")
	MouseUp("left")
	$clicks = $clicks + 1
	Sleep($delay)
EndFunc   ;==>_Click

Func _Restore() ; finishes the last action...
	ConsoleWrite("Restoring..." & @CRLF)
	Global $restore = True
	$job = IniRead("facebook_farmville.ini", "Restore", "job", "Not found")
	If $job = "Not found" Then
		_IniError()
	Else
		Select
			Case $job = "harvest"
				_Harvest()
			Case $job = "plow"
				_Plow()
			Case $job = "plant"
				$buy_screen = IniRead("facebook_farmville.ini", "Restore", "buy_screen", "Not found")
				$buy_item = IniRead("facebook_farmville.ini", "Restore", "buy_item", "Not found")
				If $buy_screen = "Not found" Or $buy_item = "Not found" Then
					_IniError()
				Else
					_Plant($buy_screen, $buy_item)
				EndIf
			Case Else
				_IniError()
		EndSelect
	EndIf
	ConsoleWrite("Restored..." & @CRLF)
	_Finalize()
EndFunc   ;==>_Restore

Func _Work()
	ConsoleWrite("Working..." & @CRLF)
	If $restore = True Then
		$initial_x = IniRead("facebook_farmville.ini", "Restore", "last_x", "Not found")
		If $initial_x = "Not found" Then
			_IniError()
		Else
			$initial_x = $initial_x + 0
		EndIf
		$initial_y = IniRead("facebook_farmville.ini", "Restore", "last_y", "Not found")
		If $initial_y = "Not found" Then
			_IniError()
		Else
			$initial_y = $initial_y + 1
			If $initial_y = $rows + 1 Then
				$initial_y = 1
				$initial_x = $initial_x + 1
			EndIf
		EndIf
	ElseIf $restore = False Then
		$initial_x = 1
		$initial_y = 1
	EndIf
	;MsgBox(0, 'Farmville', "Restoring..."&$initial_x&" "&$initial_y&" "&$restore)
	For $c = $initial_x To $columns Step 1
		For $rr = 1 To $rows Step 1
			If $restore = True And $initial_y > 1 And $rr < $initial_y Then ContinueLoop
			$cc = _MathCheckDiv($c, 2)
			If $cc = -1 Or @error = 1 Then
				MsgBox(0, '', 'Error')
			ElseIf $cc = 1 Then
				;MsgBox(0,'','Number is odd')
				$r = $rr
			ElseIf $cc = 2 Then
				;MsgBox(0,'','Number is even')
				$r = $rows - $rr + 1
			Else
				MsgBox(0, '', 'Error')
			EndIf
			$x = $TLx + (($TRx - $TLx) / ($columns - 1)) * ($c - 1) + (($BLx - $TLx) / ($rows - 1)) * ($r - 1)
			$y = $TRy + (($TLy - $TRy) / ($columns - 1)) * ($columns - $c) + (($BRy - $TRy) / ($rows - 1)) * ($r - 1)
			_Click($x, $y)
			IniWrite("facebook_farmville.ini", "Restore", "last_x", $c)
			IniWrite("facebook_farmville.ini", "Restore", "last_y", $rr)
			Sleep($delay * 1.3)
		Next
		$initial_y = 1
	Next
EndFunc   ;==>_Work

Func _Harvest()
	ConsoleWrite("Selecting Harvest" & @CRLF)
	_Click(894, 710) ; arrow
	IniWrite("facebook_farmville.ini", "Restore", "job", "harvest")

	Sleep($delay * 4)
	_Work()
EndFunc   ;==>_Harvest

Func _Plow()
	ConsoleWrite("Selecting Plow" & @CRLF)
	_Click(939, 705) ; plow
	IniWrite("facebook_farmville.ini", "Restore", "job", "plow")

	Sleep($delay * 4)
	_Work()
EndFunc   ;==>_Plow

Func _Delete()
	ConsoleWrite("Selecting Delete" & @CRLF)
	_Click(986, 707) ; delete
	Sleep($delay * 4)
	_Work()
EndFunc   ;==>_Delete

Func _Plant($screen, $item)
	ConsoleWrite("Buying and planting" & @CRLF)
	_Click(942, 760) ; market
	IniWrite("facebook_farmville.ini", "Restore", "job", "plant")
	IniWrite("facebook_farmville.ini", "Restore", "buy_screen", $screen)
	IniWrite("facebook_farmville.ini", "Restore", "buy_item", $item)

	Sleep($delay * 4)
	If $screen > 1 Then
		For $s = 1 To $screen - 1 Step 1
			_Click(901, 434)
			Sleep($delay * 4)
		Next
	EndIf
	If $item = 1 Then
		_Click(495, 435)
		Sleep($delay * 4)
	ElseIf $item = 2 Then
		_Click(641, 435)
		Sleep($delay * 4)
	ElseIf $item = 3 Then
		_Click(780, 435)
		Sleep($delay * 4)
	ElseIf $item = 4 Then
		_Click(495, 590)
		Sleep($delay * 4)
	ElseIf $item = 5 Then
		_Click(641, 590)
		Sleep($delay * 4)
	ElseIf $item = 6 Then
		_Click(780, 590)
		Sleep($delay * 4)
	Else
		_Click(920, 206) ; close market dialog
	EndIf
	_Work()
EndFunc   ;==>_Plant

Func Terminate()
	ConsoleWrite("Terminating..." & @CRLF)
	_Finalize()
EndFunc   ;==>Terminate

Func _Finalize()
	ConsoleWrite("DONE..." & @CRLF)
	$time = TimerDiff($begin)
	Sleep(200)
	ConsoleWrite("Script runtime: " & Int($time / 1000) & " seconds" & @CRLF)
	Sleep(2000)
	ConsoleWrite("Clicks: " & $clicks & @CRLF)
	Sleep(2000)
	ConsoleWrite("------------------------------------------------------------" & @CRLF)
	ConsoleWrite("http://www.marian001.com" & @CRLF)
	Sleep(5000)
	Exit
EndFunc   ;==>_Finalize

Func _IniError()
	MsgBox(0, 'Farmville', 'INI file error. Can not restore...')
	_Finalize()
EndFunc   ;==>_IniError
*/