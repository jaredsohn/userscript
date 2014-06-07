// ==UserScript==
// @name           Bejeweled Blitz Cheat Script
// @namespace      http://thecybershadow.net/hax/
// @description    Allows (dirty) cheating in Bejeweled Blitz
// @copyright      2009, CyberShadow <thecybershadow@gmail.com> (http://thecybershadow.net/hax/bejeweledblitz/)
// @include        http://labs.popcap.com/facebook/bj2/*
// ==/UserScript==


// CyberShadow's Bejeweled Blitz bot. Please don't be evil, and give credit where credit is due if you want to use this or parts of this code.
// No warranty of any kind is given. It might not work for you at all. You are expected to be able to fix any problems you may encounter on your own.

{$APPTYPE CONSOLE}
{ $DEFINE DEBUG}
{ $R+,Q+}

uses
  Windows, Forms, Graphics, ShLwApi, SysUtils, Classes;

const
  OffsetX = -3;
  OffsetY = 8;
  CellWidth = 39.5;
  CellHeight = 40;
  ScanX = 8;
  ScanY = 14;
  CursorX = 2;
  CursorY = 6;

var
  //OffsetX, OffsetY: Integer;
  GameX, GameY: Integer;
  Bitmap: TBitmap;
  Scanlines: array of PIntegerArray;

procedure Capture;
var
  DC: HDC;
  Y: Integer;
begin
  if ParamCount>0 then
  begin
    Bitmap.LoadFromFile(ParamStr(1));
    Bitmap.PixelFormat := pf32bit;
  end
  else
  begin
    Bitmap.Height := Screen.Height;
    Bitmap.Width := Screen.Width;
    Bitmap.PixelFormat := pf32bit;
    DC := GetWindowDC(GetDesktopWindow);
    BitBlt(Bitmap.Canvas.Handle, 0, 0, Bitmap.Width, Bitmap.Height, DC, 0, 0, SRCCOPY);
    ReleaseDC(GetDesktopWindow, DC);
  end;
  SetLength(Scanlines, Bitmap.Height);
  for Y:=0 to Bitmap.Height-1 do
    Scanlines[Y] := PIntegerArray(Bitmap.Scanline[Y]);
end;

function FindGame: Boolean;
var 
  X, Y: Integer;
begin
  Result := True;
  if (GameX>0) and (Scanlines[GameY-OffsetY]^[GameX-OffsetX] and $FFFFFF=$6b83b5) and (Scanlines[GameY-OffsetY]^[GameX-OffsetX+1] and $FFFFFF=$6176ac) then
    Exit;
  Result := False;
  for Y:=0 to Bitmap.Height-2 do
  begin
    for X:=0 to Bitmap.Width-2 do
      if (Scanlines[Y]^[X] and $FFFFFF=$6b83b5) and (Scanlines[Y]^[X+1] and $FFFFFF=$6176ac) then
      begin
        GameX := X + OffsetX;
        GameY := Y + OffsetY;
        Bitmap.Canvas.Pixels[X-1,Y-1] := 0;
        Bitmap.Canvas.Pixels[X  ,Y-1] := 0;
        Bitmap.Canvas.Pixels[X-1,Y  ] := 0;
        Result := True;
        Exit;
      end;
  end;
end;

// *************************************************************************

type
  TElement = (elEmpty, 
    elRed, elGreen, elBlue, elMagenta, elYellow, elOrange, elWhite,
    elShinyRed, elShinyGreen, elShinyBlue, elShinyMagenta, elShinyYellow, elShinyOrange, elShinyWhite,
    elNxRed, elNxGreen, elNxBlue, elNxMagenta, elNxYellow, elNxOrange, elNxWhite,
    elHyper, elUnknown);
  TElementColor = (ecNone, ecRed, ecGreen, ecBlue, ecMagenta, ecYellow, ecOrange, ecWhite);
  TDirection = (dRight, dDown);
  { $Align Off}
  TMove = record
    X, Y: Byte;
    Direction: TDirection;
  end;
  TTable = array[0..7, 0..7] of TElement;

const
  ElementChars: array[TElement] of Char = ' ' + 'RGBMYOW' + 'RGBMYOW' + 'XXXXXXX' + '*?' ;
  ElementAttrs: array[TElement] of Byte = ($00,    
    $0C, $0A, $09, $0D, $0E, $06, $0F,   
    $CF, $A0, $9F, $DF, $E0, $6F, $F0,
    $CF, $A0, $9F, $DF, $E0, $6F, $F0,
    $FD, $C0);
  ElementColors: array[TElement] of TElementColor = (ecNone,
    ecRed, ecGreen, ecBlue, ecMagenta, ecYellow, ecOrange, ecWhite, 
    ecRed, ecGreen, ecBlue, ecMagenta, ecYellow, ecOrange, ecWhite, 
    ecRed, ecGreen, ecBlue, ecMagenta, ecYellow, ecOrange, ecWhite, 
    ecNone, ecNone);
  NormalsByColor: array[TElementColor] of TElement = (elUnknown,
    elRed, elGreen, elBlue, elMagenta, elYellow, elOrange, elWhite);
  ShiniesByColor: array[TElementColor] of TElement = (elUnknown,
    elShinyRed, elShinyGreen, elShinyBlue, elShinyMagenta, elShinyYellow, elShinyOrange, elShinyWhite);
  NxByColor: array[TElementColor] of TElement = (elUnknown,
    elNxRed, elNxGreen, elNxBlue, elNxMagenta, elNxYellow, elNxOrange, elNxWhite);
    
  DirectionNames: array[TDirection] of String = ('Right', 'Bottom');
  DirectionX: array[TDirection] of Integer = (1, 0);
  DirectionY: array[TDirection] of Integer = (0, 1);

function ElementName(Element: TElement): string;
begin
  if Element=elEmpty then
    Result := 'Empty'
  else
  if Element=elUnknown then
    Result := 'Unknown'
  else
  if Element=elHyper then
    Result := 'Hyper'
  else
  begin
    Result := '???';
    case Element of
      elRed..elWhite:
        Result := '';
      elShinyRed..elShinyWhite:
        Result := 'Shiny ';
      elNxRed..elNxWhite:
        Result := 'Nx ';
    end;
    case ElementColors[Element] of
      ecRed:
         Result := Result + 'Red';
      ecGreen:
         Result := Result + 'Green';
      ecBlue:
         Result := Result + 'Blue';
      ecMagenta:
         Result := Result + 'Magenta';
      ecYellow:
         Result := Result + 'Yellow';
      ecOrange:
         Result := Result + 'Orange';
      ecWhite:
         Result := Result + 'White';
      end;
  end;
end;

var
  Table: TTable;

function InRange(A, B, C: Integer): Boolean; inline;
begin
  Result := (A<=B) and (B<=C);
end;

function Approx(A, B, Threshhold: Integer): Boolean; inline;
begin
  Result := InRange(B-Threshhold, A, B+Threshhold);
end;

procedure GetMeanHLS(CX, CY, Width, Height: Integer; var H, L, S: Word);
var
  X, Y: Integer;
  R, G, B: Word;
  TotalR, TotalG, TotalB: Integer;
begin
{$IFDEF DEBUG}
  for Y := CY to CY+Height-1 do
  begin
    Bitmap.Canvas.Pixels[CX-1    ,Y] := clBlack;
    Bitmap.Canvas.Pixels[CX+Width,Y] := clBlack;
  end;
  for X := CX to CX+Width-1 do
  begin
    Bitmap.Canvas.Pixels[X,CY-1     ] := clBlack;
    Bitmap.Canvas.Pixels[X,CY+Height] := clBlack;
  end;
{$ENDIF}

  TotalR := 0;
  TotalG := 0;
  TotalB := 0;
  for Y := CY to CY+Height-1 do
    for X := CX to CX+Width-1 do
    begin
      Inc(TotalR, GetRValue(Scanlines[Y]^[X]));
      Inc(TotalG, GetGValue(Scanlines[Y]^[X]));
      Inc(TotalB, GetBValue(Scanlines[Y]^[X]));
    end;
  R := TotalR div (Width * Height);
  G := TotalG div (Width * Height);
  B := TotalB div (Width * Height);
  ColorRGBToHLS(RGB(R, G, B), H, L, S);      
end;

procedure ScanGame(ShowValues: Boolean = False);
var
  I, J, CX, CY: Integer;
  H, L, S: Word;
  El: TElement;
  Unknowns: Integer;

  function ApproxColor(CH, CL, CS: Integer; DH: Integer = 1; DL: Integer = 4; DS: Integer = 4): Boolean;
  begin
    if (CL=240) or (CL=0) then // saturation and hue do not apply with pure white/black
      Result :=                       Approx(L, CL, DL)
    else
    if CS=0 then // hue does not apply with 0 saturation
      Result :=                       Approx(L, CL, DL) and Approx(S, CS, DS)
    else
      Result := Approx(H, CH, DH) and Approx(L, CL, DL) and Approx(S, CS, DS);
  end;

  function ColorInRange(H1, L1, S1, H2, L2, S2: Integer): Boolean;
  begin
    Result := InRange(H1, H, H2) and InRange(L1, L, L2) and InRange(S1, S, S2);
  end;
begin
  Unknowns := 0;
  for J:=0 to 7 do
  begin
    for I:=0 to 7 do
    begin
      CX := Round(GameX + CellWidth /2 + I*CellWidth  - ScanX/2);
      CY := Round(GameY + CellHeight/2 + J*CellHeight - ScanY/2);
      
      GetMeanHLS(CX, CY, ScanX, ScanY, H, L, S);

      // === Normal ===
      if ApproxColor(160, 165, 234) then
        El := elRed
      else
      if ApproxColor( 80, 135, 172) then
        El := elGreen
      else
      if ApproxColor( 20, 116, 185) then //  20 115 182 -  21 118 187
        El := elBlue
      else
      if ApproxColor(200, 113, 170) then // 200 112 166 - 200 115 173
        El := elMagenta
      else
      if ApproxColor(121, 136, 164) then // 121 133 164 - 121 139 164
        El := elYellow
      else
      if ApproxColor(137, 143, 213) then //
        El := elOrange
      else
      if ApproxColor(  0, 221,   0) then // 160 218   0 - 160 225   0
        El := elWhite
      else
      
      // === Nx ===
      if ColorInRange(169, 113, 112, 170, 131, 128) then
        El := elNxRed
      else
      if ColorInRange( 78,  94,  97,  79, 108, 130) then
        El := elNxGreen
      else
      if ColorInRange(  0, 151, 232,   7, 176, 237) then
        El := elNxBlue
      else
      if ColorInRange(205, 108, 116, 209, 139, 154) then
        El := elNxMagenta
      else
      if ColorInRange(120, 112, 111, 120, 123, 130) then
        El := elNxYellow
      else
      if ColorInRange(145, 116, 120, 146, 139, 154) then
        El := elNxOrange
      else
      if ColorInRange(160, 149,   0, 160, 168,   0) then
        El := elNxWhite
      else
      
      // === Shiny ===
      if ApproxColor(160, 211, 230, 3, 25, 10) then
        El := elShinyRed
      else
      if ApproxColor( 80, 198, 165, 3, 25, 10) then //  80 184 171
        El := elShinyGreen
      else
      if ApproxColor( 20, 188, 170, 3, 25, 10) then //  20 166 160 -  21 211 180
        El := elShinyBlue
      else
      if ApproxColor(200, 190, 145, 3, 25, 10) then // 200 199 135
        El := elShinyMagenta
      else
      if ApproxColor(121, 203, 171, 3, 25, 10) then // 122 219 176
        El := elShinyYellow
      else
      if ApproxColor(136, 201, 207, 3, 25, 10) then // 135 219 208 - 138 190 213
        El := elShinyOrange
      else
      if ApproxColor(160, 231,   0, 3,  4,  5) then
        El := elShinyWhite
      else

      // === Hyper ===
      if ApproxColor(  0, 240,   0, 0,  3, 0) then // better allow unknowns than falsely recognize white shiny as hyper
        El := elHyper
      else
      
      // === Unknown ===
      begin
        El := elUnknown;
        Inc(Unknowns);
      end;
      
      Table[J,I] := El;
      if ShowValues then
      begin
        Write(H:4, L:4, S:4);
        Write(' ');
        SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), ElementAttrs[El]);
        Write(ElementChars[El]);
        SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 0); // invisible parsable form
        Write(Chr(Ord(El)+Ord(' ')));
        SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
        Write('  ');
      end;
    end;
    if ShowValues then
      WriteLn;
  end;
{$IFDEF DEBUG}
  //Bitmap.SaveToFile('debug.bmp');
{$ENDIF}
  if Unknowns>0 then
  begin
    //if ParamCount=0 then
    //  Bitmap.SaveToFile('unknowns.bmp');
    raise Exception.Create(IntToStr(Unknowns) + ' unknowns');
    //WriteLn('Warning: ', Unknowns, ' unknowns');
  end;
  if ShowValues then
    WriteLn;
end;

// *************************************************************************

var
  CommX, CommY: Integer;

function FindComm: Boolean;
var 
  X, Y: Integer;
begin
  Result := True;
  if (Scanlines[CommY]^[CommX] and $FFFFFF=$012345) and (Scanlines[CommY]^[CommX+2] and $FFFFFF=$6789AB) and (Scanlines[CommY]^[CommX+4] and $FFFFFF=$CDEF01) then
    Exit;
  Result := False;
  for Y:=0 to Bitmap.Height-16 do
  begin
    for X:=0 to Bitmap.Width-18 do
      if (Scanlines[Y]^[X] and $FFFFFF=$012345) and (Scanlines[Y]^[X+2] and $FFFFFF=$6789AB) and (Scanlines[Y]^[X+4] and $FFFFFF=$CDEF01) then
      begin
        CommX := X;
        CommY := Y;
        Result := True;
        Exit;
      end;
  end;
end;

var
  Score: Integer;

procedure ReadComm;
var
  I, J: Integer;
  C: Cardinal;
  Color: TElementColor;
const
//GameToColor: array[1..7] of TElementColor = (ecRed    , ecGreen  , ecBlue   , ecMagenta, ecYellow , ecOrange , ecWhite  );
  GameToColor: array[1..7] of TElementColor = (ecRed    , ecOrange , ecYellow , ecBlue   , ecWhite  , ecMagenta, ecGreen  );
begin
  if (Scanlines[CommY]^[CommX+6] and $FFFFFF)<>$00FF00 then
    raise Exception.Create('Comm not ready');
  Score := (Scanlines[CommY]^[CommX+8] and $FFFFFF) - $100000;
  for J:=0 to 7 do
    for I:=0 to 7 do
    begin
      C := Scanlines[CommY+2+2*J]^[CommX+2*I] and $FFFFFF;
      if C and $000400<>0 then
        Table[J,I] := elHyper
      else
      begin
        Color := GameToColor[(C and $0000F0) div $10];
        if C and $000100<>0 then
          Table[J,I] := ShiniesByColor[Color]
        else
        if C and $000200<>0 then
          Table[J,I] := NxByColor[Color]
        else
          Table[J,I] := NormalsByColor[Color];
      end;
    end;
end;

// *************************************************************************

function SameColor(A, B: TElement): Boolean; inline;
var
  AC, BC: TElementColor;
begin
  AC := ElementColors[A];
  BC := ElementColors[B];
  Result := (AC=BC) and (AC<>ecNone);
end;

type
  TClearTable = array[0..7,0..7] of Byte;

function Explode(var Table: TTable; var Cleared: TClearTable; X, Y: Integer): Integer;
var
  I, J: Integer;
begin
  Result := 0;
  for J:=Y-1 to Y+1 do
    if (J>=0) and (J<8) then
      for I:=X-1 to X+1 do
        if (I>=0) and (I<8) then
          if Cleared[J][I]=0 then
          begin
            Cleared[J][I] := 1;
            case Table[J][I] of
              elRed..elWhite:
                Inc(Result, 100);
              elShinyRed..elShinyWhite:
                Inc(Result, Explode(Table, Cleared, I, J));
              elNxRed..elNxWhite:
                Inc(Result, 1000000);
              elHyper:
                Inc(Result, 1500);
            end;
            Table[J][I] := elEmpty;
          end;
end;

function Hyper(var Table: TTable; var Cleared: TClearTable; Col: TElementColor): Integer;
var
  X, Y: Integer;
begin
  if Col = ecNone then
    raise Exception.Create('Hyper called on no color');
  Result := 0;
  for Y:=0 to 7 do
    for X:=0 to 7 do
      if ElementColors[Table[Y][X]] = Col then
      begin
        Cleared[Y][X] := 2;
        case Table[Y][X] of
          elRed..elWhite:
            Inc(Result, 200);
          elShinyRed..elShinyWhite:
            Inc(Result, Explode(Table, Cleared, X, Y));
          elNxRed..elNxWhite:
            Inc(Result, 1000000);
        end;
        Table[Y][X] := elEmpty;
      end;
end;

function Combine(var Table: TTable; var Cleared: TClearTable): Integer;
var
  X, Y, C, K: Integer;
begin
  FillChar(Cleared, SizeOf(Cleared), False);
  Result := 0;

  Y := 0;
  while Y<8 do
  begin
    X := 0;
    while X<=5 do
    begin
      C := 0;
      while (X+C+1<8) and SameColor(Table[Y][X], Table[Y][X+C+1]) do
        Inc(C);
      if C>=2 then
      begin
        for K:=0 to C do
          Cleared[Y][X+K] := C+1;
        Inc(X, C);
        Inc(Result, (C-1)*200);
      end
      else
        Inc(X);
    end;
    Inc(Y);
  end;
  
  X := 0;
  while X<8 do
  begin
    Y := 0;
    while Y<=5 do
    begin
      C := 0;
      while (Y+C+1<8) and SameColor(Table[Y][X], Table[Y+C+1][X]) do
        Inc(C);
      if C>=2 then
      begin
        for K:=0 to C do
          if (Cleared[Y+K][X]=3) and (C+1=3) then
            Cleared[Y+K][X] := 4  // intersections create shinies too
          else
            Cleared[Y+K][X] := C+1;
        Inc(Y, C);
        Inc(Result, (C-1)*200);
      end
      else
        Inc(Y);
    end;
    Inc(X);
  end;
  
  for Y:=0 to 7 do
    for X:=0 to 7 do
      if Cleared[Y][X]>0 then
        case Table[Y][X] of
          elEmpty:
            { removed by explosion or an intersection };
          elRed..elWhite:
            Table[Y][X] := elEmpty;
          elShinyRed..elShinyWhite:
          begin
            Inc(Result, Explode(Table, Cleared, X, Y));
            Table[Y][X] := elEmpty;
          end;
          elNxRed..elNxWhite:
          begin
            Table[Y][X] := elEmpty;
            Inc(Result, 1000000);
          end;
          else
            raise Exception.Create('Algorithm error: don''t know how to remove ' + ElementName(Table[Y][X]));
        end;
end;

procedure Collapse(var Table: TTable);
var
  X, Y, DY: Integer;
begin
  for X:=0 to 7 do
  begin
    DY := 7;
    for Y:=7 downto 0 do
      if Table[Y][X]<>elEmpty then
      begin
        if Y<>DY then
          Table[DY][X] := Table[Y][X];
        Dec(DY);
      end;
    for Y:=DY downto 0 do
      Table[Y][X] := elEmpty;
  end;
end;

function Upgrade(InitialElement: TElement; Level: Integer): TElement;
begin
  if Level=3 then
    Result := elEmpty
  else
  if Level=4 then
    Result := ShiniesByColor[ElementColors[InitialElement]]
  else
  if Level=5 then
    Result := elHyper
  else
    raise Exception.Create('Can''t upgrade element ' + ElementName(InitialElement) + ' in a ' + IntToStr(Level) + '-level row');
    //Result := elUnknown;
end;

function Simulate(var Table: TTable; const Move: TMove): Integer; inline;
var
  El1, El2, El: TElement;
  Score, BaseScore, NonNxScore, Cycle, X1, Y1, X2, Y2: Integer;
  Cleared: TClearTable;
begin
  Result := 0;
  X1 := Move.X;
  Y1 := Move.Y;
  X2 := Move.X+DirectionX[Move.Direction];
  Y2 := Move.Y+DirectionY[Move.Direction];
  El1 := Table[Y1][X1];
  El2 := Table[Y2][X2];
  if (El1=elUnknown) or (El2=elUnknown) then
    Exit;
{$IFDEF DEBUG}
  if Combine(Table, Cleared)<>0 then
    raise Exception.Create('Initial state is volatile');
{$ENDIF}
  Table[Y1][X1] := El2;
  Table[Y2][X2] := El1;

  if (El1=elHyper) and (El2=elHyper) then
    Exit; // ABSOLUTELY NOTHING HAPPENS! argh

  Cycle := 0;
  Score := 0;

  if (El1=elHyper) or (El2=elHyper) then
  begin
    if El1=elHyper then
      El := El2
    else
      El := El1;

    BaseScore := Hyper(Table, Cleared, ElementColors[El]);
    Table[Y1][X1] := elEmpty;
    Table[Y2][X2] := elEmpty; // remove the hyper
    Inc(Score, BaseScore);
    Inc(Cycle);
    Collapse(Table);
  end;

  repeat
    BaseScore := Combine(Table, Cleared);
    if BaseScore=0 then Break;
    if Cycle=0 then // upgrade gems
    begin
      if Cleared[Y1][X1]>3 then
      begin
        El2 := Upgrade(El2, Cleared[Y1][X1]);
        Table[Y1][X1] := El2;
        //if El2 = elHyper then
        //  Inc(Score, 10000); // hypers are awesome
      end;
      if Cleared[Y2][X2]>3 then
      begin
        El1 := Upgrade(El1, Cleared[Y2][X2]);
        Table[Y2][X2] := El1;
        //if El1 = elHyper then
        //  Inc(Score, 10000); // hypers are awesome
      end;
    end;
    
    if Cycle=0 then // most-common-path optimization
      Inc(Score, BaseScore)
    else
    begin
      NonNxScore := BaseScore mod 1000000;
      Inc(Score, (NonNxScore) * (1 shl Cycle));
      if BaseScore>=1000000 then
        Inc(Score, (BaseScore-NonNxScore) * (10-Cycle) div 10); // grab Nx ASAP!
    end;

    Inc(Cycle);
    Collapse(Table);
    if Cycle>10 then // obvious bug
    begin
      Result := 1;
      Exit
    end;
  until False;
  Result := Score;
end;

function SafeGet(const Table: TTable; X, Y: Integer): TElement; inline;
begin
  if (X<0) or (X>=8) or (Y<0) or (Y>=8) then
    Result := elEmpty
  else
    Result := Table[Y][X];
end;

function IsMatch(const Table: TTable; X, Y: Integer; Color: TElementColor): Boolean;
var
  N: Integer;
begin
  Result := False;
  begin
    N := 0;
    if ElementColors[SafeGet(Table, X+1, Y)]=Color then
    begin
      Inc(N);
      if ElementColors[SafeGet(Table, X+2, Y)]=Color then
        Inc(N);
    end;
    if ElementColors[SafeGet(Table, X-1, Y)]=Color then
    begin
      Inc(N);
      if ElementColors[SafeGet(Table, X-2, Y)]=Color then
        Inc(N);
    end;
    if N>=2 then
    begin
      Result := True;
      Exit;
    end;
  end;
  begin
    N := 0;
    if ElementColors[SafeGet(Table, X, Y+1)]=Color then
    begin
      Inc(N);
      if ElementColors[SafeGet(Table, X, Y+2)]=Color then
        Inc(N);
    end;
    if ElementColors[SafeGet(Table, X, Y-1)]=Color then
    begin
      Inc(N);
      if ElementColors[SafeGet(Table, X, Y-2)]=Color then
        Inc(N);
    end;
    if N>=2 then
    begin
      Result := True;
      Exit;
    end;
  end;
end;

function IsValidMove(const Table: TTable; const Move: TMove): Boolean; 
var
  El1, El2: TElement;
begin
  El1 := Table[Move.Y][Move.X];
  El2 := Table[Move.Y+DirectionY[Move.Direction]][Move.X+DirectionX[Move.Direction]];
  Result := False;
  if (El1=elEmpty) or (El2=elEmpty) then
    Exit;
  if (El1=elHyper) or (El2=elHyper) then
  begin
    Result := True;
    Exit;
  end;
  if ElementColors[El1]=ElementColors[El2] then
    Exit;
  Result := True;
  
  if IsMatch(Table, Move.X, Move.Y, ElementColors[El2]) then
    Exit;
  if IsMatch(Table, Move.X+DirectionX[Move.Direction], Move.Y+DirectionY[Move.Direction], ElementColors[El1]) then
    Exit;
  Result := False;
end;

const
  MaxDepth = 4-1;

type
  TPath = array[0..MaxDepth] of TMove;
  TSearchThread = class(TThread)
    Score: Integer;
    Moves: TPath;
    Table: TTable;
    procedure Execute; override;
  end;

var
  SearchThreads: array of TSearchThread;

function Search(const Table: TTable; var Moves: TPath; Depth: Integer): Integer;
var
  Score: Integer;
  X, Y: Integer;
  Direction: TDirection;
  Move: TMove;
  TableCopy: TTable;
  BestMoves: TPath;
begin
  Result := 0;
  BestMoves := Moves;
  for Y:=7 downto 0 do
    for X:=0 to 7 do
      for Direction:=Low(TDirection) to High(TDirection) do
      begin
        if ((X=7) and (Direction=dRight)) or ((Y=7) and (Direction=dDown)) then
          continue;
        Move.X := X;
        Move.Y := Y;
        Move.Direction := Direction;
        if not IsValidMove(Table, Move) then
          continue;
        TableCopy := Table;
        Score := Simulate(TableCopy, Move);
        if Score = 0 then
          continue;
        if Depth=0 then
        begin
          SetLength(SearchThreads, Length(SearchThreads)+1);
          SearchThreads[High(SearchThreads)] := TSearchThread.Create(True);
          SearchThreads[High(SearchThreads)].Moves[0] := Move;
          SearchThreads[High(SearchThreads)].Score := Score;
          SearchThreads[High(SearchThreads)].Table := TableCopy;
          SearchThreads[High(SearchThreads)].Resume;
        end
        else
        begin
          if Depth < MaxDepth then
            Inc(Score, Search(TableCopy, Moves, Depth+1)*9 div 10); // bias to get bigger scores sooner
          if Score > Result then
          begin
            Result := Score;
            Moves[Depth] := Move;
            BestMoves := Moves;
          end;
        end;
      end;
  Moves := BestMoves;
end;

procedure TSearchThread.Execute;
begin
  Inc(Score, Search(Table, Moves, 1)*9 div 10);
end;

function Search0(const Table: TTable; var Moves: TPath): Integer;
var
  I: Integer;
begin
  SetLength(SearchThreads, 0);
  Search(Table, Moves, 0);
  Result := 0;
  for I:=0 to High(SearchThreads) do
  begin
    SearchThreads[I].WaitFor;
    if SearchThreads[I].Score > Result then
    begin
      Result := SearchThreads[I].Score;
      Moves := SearchThreads[I].Moves;
    end;
    SearchThreads[I].Free;
  end;
end;

// *************************************************************************

var
  Moves: TPath;
  Scores: array[0..MaxDepth] of Integer;
  History: array[0..MaxDepth+1] of TTable;
  ActualSteps: Integer;

procedure TracePath;
var
  Step: Integer;
begin
  History[0] := Table;
  for Step := 0 to MaxDepth do
  begin
    History[Step+1] := History[Step];
    Scores[Step] := Simulate(History[Step+1], Moves[Step]);
    if Scores[Step]=0 then 
      Break;
    ActualSteps := Step;
  end;
end;

procedure PrintPlan;
var
  I, J: Integer;
  El: TElement;
  Step: Integer;
begin
  for J:=0 to 7 do
  begin
    for Step := 0 to ActualSteps+1 do
    begin
      for I:=0 to 7 do
      begin
        El := History[Step][J][I];
        SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), ElementAttrs[El]);
        Write(ElementChars[El]);
      end;
      SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
      Write(' ');
      //if Scores[Step]=0 then 
      //  Break;
    end;
    WriteLn;
  end;
end;

function CursorOn(X, Y: Integer): Boolean;
var
  H, L, S: Word;
begin
  GetMeanHLS(Round(GameX + CursorX + X*CellWidth), Round(GameY + CursorY + Y*CellWidth), 2, 2, H, L, S);
  Result := (L>=150) and (S<=1);
  WriteLn(H, ' ', L, ' ', S);
  //if not Result then
  //  Bitmap.SaveToFile('debug'+IntToStr(H)+'-'+IntToStr(L)+'-'+IntToStr(S)+'.bmp');
end;

// *************************************************************************

// Note: continuity errors are normal when caused by new gems falling from above and lining up with existing gems
procedure CheckContinuity;
var
  I, J: Integer;
begin
  for J:=0 to 7 do
    for I:=0 to 7 do
      if (History[1][J,I]<>elEmpty) and (History[1][J,I]<>Table[J,I]) then
        WriteLn('Continuity error at ', I, 'x', J, ': ', ElementName(History[1][J,I]), ' => ', ElementName(Table[J,I]));
end;

// *************************************************************************

var
  OldPos: TPoint;
  Step: Integer;
  Cleared: TClearTable;
  CheckedContinuity: Boolean = False;

begin
  //OffsetX := StrToInt(ParamStr(1));
  //OffsetY := StrToInt(ParamStr(2));
  GameX := 0; GameY := 0;
  CommX := 0; CommY := 0;

  Bitmap := TBitmap.Create;
  FillChar(Moves, SizeOf(Moves), 0);

  repeat
    try
      Capture;
      if not FindGame then
        raise Exception.Create('Can''t find game');
      if FindComm then
        ReadComm
      else
        ScanGame(ParamCount>0);
        //raise Exception.Create('Can''t find comm');
      if not CheckedContinuity then
      begin
        CheckContinuity;
        CheckedContinuity := True;
      end;
      if (GetKeyState(VK_MBUTTON)<0) or (ParamCount>0) then
      begin
        if Combine(Table, Cleared)<>0 then
          raise Exception.Create('Initial state is volatile');
        Write('Thinking...                     '#13);
        if Search0(Table, Moves)=0 then
          raise Exception.Create('No moves');
        WriteLn('== ', TimeToStr(Now), ' - ', Score, ' ==');
        TracePath;
        for Step := 0 to ActualSteps do
          with Moves[Step] do
            WriteLn(Step+1, '. ', Scores[Step]:10, ' - Swapping ', ElementName(History[Step][Y][X]), ' at ', X, 'x', Y, ' with ', ElementName(History[Step][Y+DirectionY[Direction]][X+DirectionX[Direction]]), ' at ', X+DirectionX[Direction], 'x', Y+DirectionY[Direction], ' (to the ', DirectionNames[Direction], ')     ');
        WriteLn;
        PrintPlan;
        WriteLn;
        if ParamCount=0 then
        begin
          GetCursorPos(OldPos);
          SetCursorPos(Round(GameX + CellWidth/2 + Moves[0].X*CellWidth), Round(GameY + CellHeight/2 + Moves[0].Y*CellHeight));
          //Sleep(10);
          mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
          mouse_event(MOUSEEVENTF_LEFTUP  , 0, 0, 0, 0);
          //Sleep(10);
          SetCursorPos(Round(GameX + CellWidth/2 + (Moves[0].X+DirectionX[Moves[0].Direction])*CellWidth), Round(GameY + CellHeight/2 + (Moves[0].Y+DirectionY[Moves[0].Direction])*CellHeight));
          //Sleep(10);
          mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
          mouse_event(MOUSEEVENTF_LEFTUP  , 0, 0, 0, 0);
          //Sleep(10);
          SetCursorPos(OldPos.X, OldPos.Y);
        end;
        Sleep(150);
        CheckedContinuity := False;
      end
      else
        Write('Ready                                  '#13);
    except
      on E: Exception do
      begin
        Write('Error: ' + E.Message + '               '#13);
        //MessageBeep(MB_ICONERROR);
        //if ParamCount>0 then ReadLn;
      end;
    end;
    if ParamCount>0 then Exit;
    Sleep(1);
  until False;
end.