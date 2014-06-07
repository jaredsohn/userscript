// ==UserScript==
// @name           Your mother is a man
// @description    You're a joke.
// @author         urmum
// @include        *pokemoncreed.net/*
// @version        5.1
// ==/UserScript==

HotKeySet("`", "Toggle")

Global $Toggle = False
Global $Mouse[2]
Global $Debug = 1

While 1
	If $Toggle Then
		Do
			$Mouse[0] = MouseGetPos(0)
			$Mouse[1] = MouseGetPos(1)
			ConsoleWrite(MouseGetCursor() & @CRLF)
		Until MouseGetCursor() = 16
		Do
			Send("^a")
			Send("^c")
			Send("{Left}")
			If StringInStr(ClipGet(), "Slow down.") Then
				Sleep(1000)
				For $Loop = 0 To (46 + $Debug) Step 1
					Send("{Tab}")
				Next
				Send("{Enter}")
				Do
					MouseMove(MouseGetPos(0)+1, MouseGetPos(1)+1)
					MouseMove(MouseGetPos(0)-1, MouseGetPos(1)-1)
				Until MouseGetCursor() = 2
			ElseIf StringInStr(ClipGet(), "Do not") Then
				$Toggle = False
				Do
					Beep()
					Sleep(1000)
				Until $Toggle = True
			ElseIf StringInStr(ClipGet(), "fainted") Then
				For $Loop = 0 To (48 + $Debug) Step 1
					Send("{Tab}")
				Next
				Send("{Enter}")
				MouseMove($Mouse[0], $Mouse[1])
				Do
					MouseMove(MouseGetPos(0)+1, MouseGetPos(1)+1)
					MouseMove(MouseGetPos(0)-1, MouseGetPos(1)-1)
				Until MouseGetCursor() = 2
			ElseIf StringInStr(ClipGet(), "Prinplup *") Then
				Sleep(1000)
				Do
					MouseMove(MouseGetPos(0), MouseGetPos(1)+1)
				Until MouseGetCursor() = 16 Or MouseGetPos(1) = @DesktopHeight
				If MouseGetPos(1) = @DesktopHeight Then
					MouseMove($Mouse[0], $Mouse[1])
					ExitLoop
				EndIf
				MouseMove(MouseGetPos(0) + Random(-10, 10, 1), MouseGetPos(1))
				MouseClick("Primary")
				MouseMove($Mouse[0], $Mouse[1])
				Do
					MouseMove(MouseGetPos(0)+1, MouseGetPos(1)+1)
					MouseMove(MouseGetPos(0)-1, MouseGetPos(1)-1)
				Until MouseGetCursor() = 2
			EndIf
		Until $Toggle = False
	Else
		Sleep(100)
	EndIf
WEnd

Func Toggle()
	If $Toggle Then
		$Toggle = False
	ElseIf Not $Toggle Then
		$Toggle = True
	Else
		Exit(1)
	EndIf
EndFunc