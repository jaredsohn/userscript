// ==UserScript==
// @name        rst_script
// @namespace   %namespace%
// @description %description%
// @include     https://courier.esphere.ru/*
// @include     https://courier.esphere.ru/documents/*
// @exclude     %exclude%
// @version     1
// @grant       none
// ==/UserScript==


schet='\
<html xmlns:v="urn:schemas-microsoft-com:vml"\
xmlns:o="urn:schemas-microsoft-com:office:office"\
xmlns:w="urn:schemas-microsoft-com:office:word"\
xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"\
xmlns="http://www.w3.org/TR/REC-html40">\
\
<head>\
<meta http-equiv=Content-Type content="text/html; charset=windows-1251">\
<meta name=ProgId content=Word.Document>\
<meta name=Generator content="Microsoft Word 14">\
<meta name=Originator content="Microsoft Word 14">\
<link rel=File-List href="TEMPLATE-SCHET1.files/filelist.xml">\
<link rel=Edit-Time-Data href="TEMPLATE-SCHET1.files/editdata.mso">\
<!--[if !mso]>\
<style>\
v\:* {behavior:url(#default#VML);}\
o\:* {behavior:url(#default#VML);}\
w\:* {behavior:url(#default#VML);}\
.shape {behavior:url(#default#VML);}\
</style>\
<![endif]--><!--[if gte mso 9]><xml>\
 <o:DocumentProperties>\
  <o:Author>Ilukhin</o:Author>\
  <o:Template>Normal</o:Template>\
  <o:LastAuthor>Ilukhin</o:LastAuthor>\
  <o:Revision>2</o:Revision>\
  <o:TotalTime>63</o:TotalTime>\
  <o:Created>2013-12-22T10:37:00Z</o:Created>\
  <o:LastSaved>2013-12-22T10:37:00Z</o:LastSaved>\
  <o:Pages>2</o:Pages>\
  <o:Words>119</o:Words>\
  <o:Characters>679</o:Characters>\
  <o:Lines>5</o:Lines>\
  <o:Paragraphs>1</o:Paragraphs>\
  <o:CharactersWithSpaces>797</o:CharactersWithSpaces>\
  <o:Version>14.00</o:Version>\
 </o:DocumentProperties>\
 <o:OfficeDocumentSettings>\
  <o:AllowPNG/>\
 </o:OfficeDocumentSettings>\
</xml><![endif]-->\
<link rel=themeData href="TEMPLATE-SCHET1.files/themedata.thmx">\
<link rel=colorSchemeMapping href="TEMPLATE-SCHET1.files/colorschememapping.xml">\
<!--[if gte mso 9]><xml>\
 <w:WordDocument>\
  <w:TrackMoves>false</w:TrackMoves>\
  <w:TrackFormatting/>\
  <w:PunctuationKerning/>\
  <w:ValidateAgainstSchemas/>\
  <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>\
  <w:IgnoreMixedContent>false</w:IgnoreMixedContent>\
  <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>\
  <w:DoNotPromoteQF/>\
  <w:LidThemeOther>RU</w:LidThemeOther>\
  <w:LidThemeAsian>X-NONE</w:LidThemeAsian>\
  <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>\
  <w:Compatibility>\
   <w:BreakWrappedTables/>\
   <w:SnapToGridInCell/>\
   <w:WrapTextWithPunct/>\
   <w:UseAsianBreakRules/>\
   <w:DontGrowAutofit/>\
   <w:SplitPgBreakAndParaMark/>\
   <w:EnableOpenTypeKerning/>\
   <w:DontFlipMirrorIndents/>\
   <w:OverrideTableStyleHps/>\
  </w:Compatibility>\
  <m:mathPr>\
   <m:mathFont m:val="Cambria Math"/>\
   <m:brkBin m:val="before"/>\
   <m:brkBinSub m:val="&#45;-"/>\
   <m:smallFrac m:val="off"/>\
   <m:dispDef/>\
   <m:lMargin m:val="0"/>\
   <m:rMargin m:val="0"/>\
   <m:defJc m:val="centerGroup"/>\
   <m:wrapIndent m:val="1440"/>\
   <m:intLim m:val="subSup"/>\
   <m:naryLim m:val="undOvr"/>\
  </m:mathPr></w:WordDocument>\
</xml><![endif]--><!--[if gte mso 9]><xml>\
 <w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="true"\
  DefSemiHidden="true" DefQFormat="false" DefPriority="99"\
  LatentStyleCount="267">\
  <w:LsdException Locked="false" Priority="0" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Normal"/>\
  <w:LsdException Locked="false" Priority="9" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="heading 1"/>\
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 2"/>\
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 3"/>\
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 4"/>\
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 5"/>\
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 6"/>\
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 7"/>\
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 8"/>\
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 9"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 1"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 2"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 3"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 4"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 5"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 6"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 7"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 8"/>\
  <w:LsdException Locked="false" Priority="39" Name="toc 9"/>\
  <w:LsdException Locked="false" Priority="35" QFormat="true" Name="caption"/>\
  <w:LsdException Locked="false" Priority="10" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Title"/>\
  <w:LsdException Locked="false" Priority="1" Name="Default Paragraph Font"/>\
  <w:LsdException Locked="false" Priority="11" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Subtitle"/>\
  <w:LsdException Locked="false" Priority="22" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Strong"/>\
  <w:LsdException Locked="false" Priority="20" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Emphasis"/>\
  <w:LsdException Locked="false" Priority="59" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Table Grid"/>\
  <w:LsdException Locked="false" UnhideWhenUsed="false" Name="Placeholder Text"/>\
  <w:LsdException Locked="false" Priority="1" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="No Spacing"/>\
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Shading"/>\
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light List"/>\
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Grid"/>\
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 1"/>\
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 2"/>\
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 1"/>\
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 2"/>\
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 1"/>\
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 2"/>\
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 3"/>\
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Dark List"/>\
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Shading"/>\
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful List"/>\
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Grid"/>\
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Shading Accent 1"/>\
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light List Accent 1"/>\
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Grid Accent 1"/>\
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 1"/>\
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 1"/>\
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 1 Accent 1"/>\
  <w:LsdException Locked="false" UnhideWhenUsed="false" Name="Revision"/>\
  <w:LsdException Locked="false" Priority="34" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="List Paragraph"/>\
  <w:LsdException Locked="false" Priority="29" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Quote"/>\
  <w:LsdException Locked="false" Priority="30" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Intense Quote"/>\
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 2 Accent 1"/>\
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 1"/>\
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 1"/>\
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 1"/>\
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Dark List Accent 1"/>\
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Shading Accent 1"/>\
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful List Accent 1"/>\
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Grid Accent 1"/>\
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Shading Accent 2"/>\
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light List Accent 2"/>\
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Grid Accent 2"/>\
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 2"/>\
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 2"/>\
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 1 Accent 2"/>\
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 2 Accent 2"/>\
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 2"/>\
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 2"/>\
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 2"/>\
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Dark List Accent 2"/>\
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Shading Accent 2"/>\
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful List Accent 2"/>\
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Grid Accent 2"/>\
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Shading Accent 3"/>\
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light List Accent 3"/>\
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Grid Accent 3"/>\
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 3"/>\
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 3"/>\
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 1 Accent 3"/>\
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 2 Accent 3"/>\
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 3"/>\
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 3"/>\
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 3"/>\
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Dark List Accent 3"/>\
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Shading Accent 3"/>\
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful List Accent 3"/>\
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Grid Accent 3"/>\
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Shading Accent 4"/>\
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light List Accent 4"/>\
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Grid Accent 4"/>\
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 4"/>\
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 4"/>\
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 1 Accent 4"/>\
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 2 Accent 4"/>\
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 4"/>\
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 4"/>\
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 4"/>\
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Dark List Accent 4"/>\
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Shading Accent 4"/>\
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful List Accent 4"/>\
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Grid Accent 4"/>\
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Shading Accent 5"/>\
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light List Accent 5"/>\
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Grid Accent 5"/>\
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 5"/>\
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 5"/>\
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 1 Accent 5"/>\
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 2 Accent 5"/>\
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 5"/>\
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 5"/>\
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 5"/>\
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Dark List Accent 5"/>\
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Shading Accent 5"/>\
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful List Accent 5"/>\
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Grid Accent 5"/>\
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Shading Accent 6"/>\
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light List Accent 6"/>\
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Light Grid Accent 6"/>\
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 6"/>\
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 6"/>\
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 1 Accent 6"/>\
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium List 2 Accent 6"/>\
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 6"/>\
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 6"/>\
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 6"/>\
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Dark List Accent 6"/>\
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Shading Accent 6"/>\
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful List Accent 6"/>\
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"\
   UnhideWhenUsed="false" Name="Colorful Grid Accent 6"/>\
  <w:LsdException Locked="false" Priority="19" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Subtle Emphasis"/>\
  <w:LsdException Locked="false" Priority="21" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Intense Emphasis"/>\
  <w:LsdException Locked="false" Priority="31" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Subtle Reference"/>\
  <w:LsdException Locked="false" Priority="32" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Intense Reference"/>\
  <w:LsdException Locked="false" Priority="33" SemiHidden="false"\
   UnhideWhenUsed="false" QFormat="true" Name="Book Title"/>\
  <w:LsdException Locked="false" Priority="37" Name="Bibliography"/>\
  <w:LsdException Locked="false" Priority="39" QFormat="true" Name="TOC Heading"/>\
 </w:LatentStyles>\
</xml><![endif]-->\
<style>\
<!--\
 /* Font Definitions */\
 @font-face\
	{font-family:Calibri;\
	panose-1:2 15 5 2 2 2 4 3 2 4;\
	mso-font-charset:204;\
	mso-generic-font-family:swiss;\
	mso-font-pitch:variable;\
	mso-font-signature:-536870145 1073786111 1 0 415 0;}\
@font-face\
	{font-family:Tahoma;\
	panose-1:2 11 6 4 3 5 4 4 2 4;\
	mso-font-charset:0;\
	mso-generic-font-family:swiss;\
	mso-font-format:other;\
	mso-font-pitch:variable;\
	mso-font-signature:3 0 0 0 1 0;}\
 /* Style Definitions */\
 p.MsoNormal, li.MsoNormal, div.MsoNormal\
	{mso-style-unhide:no;\
	mso-style-qformat:yes;\
	mso-style-parent:"";\
	margin-top:0cm;\
	margin-right:0cm;\
	margin-bottom:10.0pt;\
	margin-left:0cm;\
	line-height:115%;\
	mso-pagination:widow-orphan;\
	font-size:11.0pt;\
	font-family:"Calibri","sans-serif";\
	mso-ascii-font-family:Calibri;\
	mso-ascii-theme-font:minor-latin;\
	mso-fareast-font-family:Calibri;\
	mso-fareast-theme-font:minor-latin;\
	mso-hansi-font-family:Calibri;\
	mso-hansi-theme-font:minor-latin;\
	mso-bidi-font-family:"Times New Roman";\
	mso-bidi-theme-font:minor-bidi;\
	mso-fareast-language:EN-US;}\
p.MsoAcetate, li.MsoAcetate, div.MsoAcetate\
	{mso-style-noshow:yes;\
	mso-style-priority:99;\
	mso-style-link:"Текст выноски Знак";\
	margin:0cm;\
	margin-bottom:.0001pt;\
	mso-pagination:widow-orphan;\
	font-size:8.0pt;\
	font-family:"Tahoma","sans-serif";\
	mso-fareast-font-family:Calibri;\
	mso-fareast-theme-font:minor-latin;\
	mso-bidi-font-family:Tahoma;\
	mso-fareast-language:EN-US;}\
span.a\
	{mso-style-name:"Текст выноски Знак";\
	mso-style-noshow:yes;\
	mso-style-priority:99;\
	mso-style-unhide:no;\
	mso-style-locked:yes;\
	mso-style-link:"Текст выноски";\
	mso-ansi-font-size:8.0pt;\
	mso-bidi-font-size:8.0pt;\
	font-family:"Tahoma","sans-serif";\
	mso-ascii-font-family:Tahoma;\
	mso-hansi-font-family:Tahoma;\
	mso-bidi-font-family:Tahoma;}\
.MsoChpDefault\
	{mso-style-type:export-only;\
	mso-default-props:yes;\
	font-family:"Calibri","sans-serif";\
	mso-ascii-font-family:Calibri;\
	mso-ascii-theme-font:minor-latin;\
	mso-fareast-font-family:Calibri;\
	mso-fareast-theme-font:minor-latin;\
	mso-hansi-font-family:Calibri;\
	mso-hansi-theme-font:minor-latin;\
	mso-bidi-font-family:"Times New Roman";\
	mso-bidi-theme-font:minor-bidi;\
	mso-fareast-language:EN-US;}\
.MsoPapDefault\
	{mso-style-type:export-only;\
	margin-bottom:10.0pt;\
	line-height:115%;}\
@page WordSection1\
	{size:841.9pt 595.3pt;\
	mso-page-orientation:landscape;\
	margin:1.0cm 1.0cm 1.0cm 1.0cm;\
	mso-header-margin:35.45pt;\
	mso-footer-margin:35.45pt;\
	mso-paper-source:0;}\
div.WordSection1\
	{page:WordSection1;}\
-->\
</style>\
<!--[if gte mso 10]>\
<style>\
 /* Style Definitions */\
 table.MsoNormalTable\
	{mso-style-name:"Обычная таблица";\
	mso-tstyle-rowband-size:0;\
	mso-tstyle-colband-size:0;\
	mso-style-noshow:yes;\
	mso-style-priority:99;\
	mso-style-parent:"";\
	mso-padding-alt:0cm 5.4pt 0cm 5.4pt;\
	mso-para-margin-top:0cm;\
	mso-para-margin-right:0cm;\
	mso-para-margin-bottom:10.0pt;\
	mso-para-margin-left:0cm;\
	line-height:115%;\
	mso-pagination:widow-orphan;\
	font-size:11.0pt;\
	font-family:"Calibri","sans-serif";\
	mso-ascii-font-family:Calibri;\
	mso-ascii-theme-font:minor-latin;\
	mso-hansi-font-family:Calibri;\
	mso-hansi-theme-font:minor-latin;\
	mso-fareast-language:EN-US;}\
table.MsoTableGrid\
	{mso-style-name:"Сетка таблицы";\
	mso-tstyle-rowband-size:0;\
	mso-tstyle-colband-size:0;\
	mso-style-priority:59;\
	mso-style-unhide:no;\
	border:solid windowtext 1.0pt;\
	mso-border-alt:solid windowtext .5pt;\
	mso-padding-alt:0cm 5.4pt 0cm 5.4pt;\
	mso-border-insideh:.5pt solid windowtext;\
	mso-border-insidev:.5pt solid windowtext;\
	mso-para-margin:0cm;\
	mso-para-margin-bottom:.0001pt;\
	mso-pagination:widow-orphan;\
	font-size:11.0pt;\
	font-family:"Calibri","sans-serif";\
	mso-ascii-font-family:Calibri;\
	mso-ascii-theme-font:minor-latin;\
	mso-hansi-font-family:Calibri;\
	mso-hansi-theme-font:minor-latin;\
	mso-fareast-language:EN-US;}\
</style>\
<![endif]--><!--[if gte mso 9]><xml>\
 <o:shapedefaults v:ext="edit" spidmax="1026"/>\
</xml><![endif]--><!--[if gte mso 9]><xml>\
 <o:shapelayout v:ext="edit">\
  <o:idmap v:ext="edit" data="1"/>\
 </o:shapelayout></xml><![endif]-->\
</head>\
\
<body lang=RU style=&apos;tab-interval:35.4pt&apos;>\
\
<div class=WordSection1>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><span style=&apos;font-size:12.0pt;mso-fareast-language:RU;mso-no-proof:\
yes&apos;><!--[if gte vml 1]><v:shapetype id="_x0000_t75" coordsize="21600,21600"\
 o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe" filled="f"\
 stroked="f">\
 <v:stroke joinstyle="miter"/>\
 <v:formulas>\
  <v:f eqn="if lineDrawn pixelLineWidth 0"/>\
  <v:f eqn="sum @0 1 0"/>\
  <v:f eqn="sum 0 0 @1"/>\
  <v:f eqn="prod @2 1 2"/>\
  <v:f eqn="prod @3 21600 pixelWidth"/>\
  <v:f eqn="prod @3 21600 pixelHeight"/>\
  <v:f eqn="sum @0 0 1"/>\
  <v:f eqn="prod @6 1 2"/>\
  <v:f eqn="prod @7 21600 pixelWidth"/>\
  <v:f eqn="sum @8 21600 0"/>\
  <v:f eqn="prod @7 21600 pixelHeight"/>\
  <v:f eqn="sum @10 21600 0"/>\
 </v:formulas>\
 <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>\
 <o:lock v:ext="edit" aspectratio="t"/>\
</v:shapetype><v:shape id="Рисунок_x0020_1" o:spid="_x0000_i1025" type="#_x0000_t75"\
 alt="http://upload.wikimedia.org/wikipedia/ru/d/d4/%D0%A0%D0%BE%D1%81%D1%82%D0%B5%D0%BB%D0%B5%D0%BA%D0%BE%D0%BC.png"\
 style=&apos;width:161.25pt;height:88.5pt;visibility:visible;mso-wrap-style:square&apos;>\
 <v:imagedata src="TEMPLATE-SCHET1.files/image001.png" o:title="%D0%A0%D0%BE%D1%81%D1%82%D0%B5%D0%BB%D0%B5%D0%BA%D0%BE%D0%BC"/>\
</v:shape><![endif]--><![if !vml]><img width=215 height=118\
src="TEMPLATE-SCHET1.files/image002.png"\
alt="http://upload.wikimedia.org/wikipedia/ru/d/d4/%D0%A0%D0%BE%D1%81%D1%82%D0%B5%D0%BB%D0%B5%D0%BA%D0%BE%D0%BC.png"\
v:shapes="Рисунок_x0020_1"><![endif]></span><span lang=EN-US style=&apos;font-size:\
12.0pt;mso-ansi-language:EN-US&apos;><o:p></o:p></span></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
\
<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0\
 style=&apos;margin-left:19.6pt;border-collapse:collapse;border:none;mso-yfti-tbllook:\
 1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:\
 none&apos;>\
 <tr style=&apos;mso-yfti-irow:0;mso-yfti-firstrow:yes&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Получатель:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="v_rec"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:1&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Юридический\
  адрес:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="v_uaddr"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:2&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Почтовый\
  адрес:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="v_paddr"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:3&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>ИНН/КПП:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="v_innkpp"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:4&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Р/счет:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="v_rs"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:5;mso-yfti-lastrow:yes&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>БИК:</span></b><b\
  style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt;mso-ansi-language:\
  EN-US&apos;> <a name="v_bic"></a><span lang=EN-US><o:p></o:p></span></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Кор/счет:\
  <a name="v_corracc"></a><o:p></o:p></span></b></p>\
  </td>\
 </tr>\
</table>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
\
<p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
text-align:center;line-height:normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span\
style=&apos;font-size:16.0pt&apos;>Счет №<a name="schet_num"></a> от <a name="schet_date"></a><o:p></o:p></span></b></p>\
\
<p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
text-align:center;line-height:normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span\
style=&apos;font-size:14.0pt&apos;>За <a name=period></a><o:p></o:p></span></b></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span lang=EN-US\
style=&apos;font-size:12.0pt;mso-ansi-language:EN-US&apos;><o:p>&nbsp;</o:p></span></b></p>\
\
<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0\
 style=&apos;margin-left:19.6pt;border-collapse:collapse;border:none;mso-yfti-tbllook:\
 1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:\
 none&apos;>\
 <tr style=&apos;mso-yfti-irow:0;mso-yfti-firstrow:yes&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Абонент:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="b_name"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:1&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Адрес:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="b_uaddr"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:2&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>ИНН/КПП:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="b_innkpp"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:3&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Р/счет:<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="b_rs"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:4&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>БИК:</span></b><b\
  style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt;mso-ansi-language:\
  EN-US&apos;> <a name="b_bic"></a><span lang=EN-US><o:p></o:p></span></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Кор/счет:</span></b><b\
  style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt;mso-ansi-language:\
  EN-US&apos;> <a name="b_corrac"></a><span lang=EN-US><o:p></o:p></span></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:5&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Юридический\
  адрес::<o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;><a\
  name="b_uaddr2"></a>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:6;mso-yfti-lastrow:yes&apos;>\
  <td width=255 valign=top style=&apos;width:191.35pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;>Дополнительно\
  № Л/С: </span></b><a name=account></a><b style=&apos;mso-bidi-font-weight:normal&apos;><span\
  lang=EN-US style=&apos;font-size:10.0pt;mso-ansi-language:EN-US&apos;><o:p></o:p></span></b></p>\
  </td>\
  <td width=780 valign=top style=&apos;width:585.05pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span style=&apos;font-size:10.0pt&apos;><o:p>&nbsp;</o:p></span></b></p>\
  </td>\
 </tr>\
</table>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span lang=EN-US\
style=&apos;font-size:12.0pt;mso-ansi-language:EN-US&apos;><o:p>&nbsp;</o:p></span></b></p>\
\
<p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
text-align:right;line-height:normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;><span\
style=&apos;font-size:10.0pt&apos;>Срок оплаты: <a name="pay_before"></a><o:p></o:p></span></b></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;>Поставщик услуг: <a name="v_name"></a><span\
style=&apos;mso-spacerun:yes&apos;> </span><span style=&apos;mso-spacerun:yes&apos;> </span>услуги\
связи за период с <a name="start_period"></a><span\
style=&apos;mso-spacerun:yes&apos;> </span>по <a name="end_period"></a></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><a name="b_dogtype"></a>: <a name="b_dog"></a></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;>Валюта: наименование Российский рубль</p>\
\
<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0\
 style=&apos;border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;\
 mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt&apos;>\
 <tr style=&apos;mso-yfti-irow:0;mso-yfti-firstrow:yes&apos;>\
  <td width=508 style=&apos;width:381.05pt;border:solid windowtext 1.0pt;mso-border-alt:\
  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Наименование услуги</p>\
  </td>\
  <td width=47 style=&apos;width:35.45pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Ед. изм.</p>\
  </td>\
  <td width=66 style=&apos;width:49.6pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Кол-во</p>\
  </td>\
  <td width=104 style=&apos;width:77.95pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Цена</p>\
  </td>\
  <td width=85 style=&apos;width:63.8pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Сумма</p>\
  </td>\
  <td width=57 style=&apos;width:42.55pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Ставка НДС</p>\
  </td>\
  <td width=94 style=&apos;width:70.85pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Сумма НДС</p>\
  </td>\
  <td width=100 style=&apos;width:74.75pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Сумма с НДС</p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:1;mso-yfti-lastrow:yes&apos;>\
  <td width=508 valign=top style=&apos;width:381.05pt;border:solid windowtext 1.0pt;\
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=47 valign=top style=&apos;width:35.45pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=66 valign=top style=&apos;width:49.6pt;border-top:none;border-left:none;\
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=104 valign=top style=&apos;width:77.95pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=85 valign=top style=&apos;width:63.8pt;border-top:none;border-left:none;\
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=57 valign=top style=&apos;width:42.55pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=94 valign=top style=&apos;width:70.85pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=100 valign=top style=&apos;width:74.75pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
 </tr>\
</table>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><o:p>&nbsp;</o:p></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><b style=&apos;mso-bidi-font-weight:normal&apos;>Состояние расчетов по\
поставщикам<o:p></o:p></b></p>\
\
<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0\
 style=&apos;border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;\
 mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt&apos;>\
 <tr style=&apos;mso-yfti-irow:0;mso-yfti-firstrow:yes&apos;>\
  <td width=357 style=&apos;width:267.65pt;border:solid windowtext 1.0pt;mso-border-alt:\
  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>Наименование поставщика</p>\
  </td>\
  <td width=161 style=&apos;width:120.5pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=151 style=&apos;width:4.0cm;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 style=&apos;width:99.2pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 style=&apos;width:99.25pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=128 style=&apos;width:96.0pt;border:solid windowtext 1.0pt;border-left:\
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:1&apos;>\
  <td width=357 valign=top style=&apos;width:267.65pt;border:solid windowtext 1.0pt;\
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=161 valign=top style=&apos;width:120.5pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=151 valign=top style=&apos;width:4.0cm;border-top:none;border-left:none;\
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 valign=top style=&apos;width:99.2pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 valign=top style=&apos;width:99.25pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=128 valign=top style=&apos;width:96.0pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:2&apos;>\
  <td width=357 valign=top style=&apos;width:267.65pt;border:solid windowtext 1.0pt;\
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=161 valign=top style=&apos;width:120.5pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=151 valign=top style=&apos;width:4.0cm;border-top:none;border-left:none;\
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 valign=top style=&apos;width:99.2pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 valign=top style=&apos;width:99.25pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=128 valign=top style=&apos;width:96.0pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:3&apos;>\
  <td width=357 valign=top style=&apos;width:267.65pt;border:solid windowtext 1.0pt;\
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=161 valign=top style=&apos;width:120.5pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=151 valign=top style=&apos;width:4.0cm;border-top:none;border-left:none;\
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 valign=top style=&apos;width:99.2pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 valign=top style=&apos;width:99.25pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=128 valign=top style=&apos;width:96.0pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:4;mso-yfti-lastrow:yes&apos;>\
  <td width=357 valign=top style=&apos;width:267.65pt;border:solid windowtext 1.0pt;\
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
  padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=161 valign=top style=&apos;width:120.5pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=151 valign=top style=&apos;width:4.0cm;border-top:none;border-left:none;\
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 valign=top style=&apos;width:99.2pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=132 valign=top style=&apos;width:99.25pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=128 valign=top style=&apos;width:96.0pt;border-top:none;border-left:\
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=right style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:right;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
 </tr>\
</table>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><o:p>&nbsp;</o:p></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><o:p>&nbsp;</o:p></p>\
\
<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0\
 style=&apos;border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:\
 0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:none&apos;>\
 <tr style=&apos;mso-yfti-irow:0;mso-yfti-firstrow:yes&apos;>\
  <td width=357 valign=top style=&apos;width:267.65pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;>Руководитель организации</p>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;>(уполномоченное лицо, действующее на основании приказа/доверенности\
  от ____№_____)</p>\
  </td>\
  <td width=293 valign=top style=&apos;width:219.7pt;border:none;border-bottom:solid windowtext 1.0pt;\
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=57 valign=top style=&apos;width:42.55pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=355 valign=top style=&apos;width:266.1pt;border:none;border-bottom:solid windowtext 1.0pt;\
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:1;mso-yfti-lastrow:yes&apos;>\
  <td width=357 valign=top style=&apos;width:267.65pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=293 valign=top style=&apos;width:219.7pt;border:none;mso-border-top-alt:\
  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>(подпись)</p>\
  </td>\
  <td width=57 valign=top style=&apos;width:42.55pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=355 valign=top style=&apos;width:266.1pt;border:none;mso-border-top-alt:\
  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>(расшифровка подписи)</p>\
  </td>\
 </tr>\
</table>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><o:p>&nbsp;</o:p></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><o:p>&nbsp;</o:p></p>\
\
<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0\
 style=&apos;border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:\
 0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:none&apos;>\
 <tr style=&apos;mso-yfti-irow:0;mso-yfti-firstrow:yes&apos;>\
  <td width=357 valign=top style=&apos;width:267.65pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;>Главный бухгалтер</p>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;>(уполномоченное лицо, действующее на основании приказа/доверенности\
  от ____№_____)</p>\
  </td>\
  <td width=293 valign=top style=&apos;width:219.7pt;border:none;border-bottom:solid windowtext 1.0pt;\
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=57 valign=top style=&apos;width:42.55pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=355 valign=top style=&apos;width:266.1pt;border:none;border-bottom:solid windowtext 1.0pt;\
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
 </tr>\
 <tr style=&apos;mso-yfti-irow:1;mso-yfti-lastrow:yes&apos;>\
  <td width=357 valign=top style=&apos;width:267.65pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
  normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=293 valign=top style=&apos;width:219.7pt;border:none;mso-border-top-alt:\
  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>(подпись)</p>\
  </td>\
  <td width=57 valign=top style=&apos;width:42.55pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;><o:p>&nbsp;</o:p></p>\
  </td>\
  <td width=355 valign=top style=&apos;width:266.1pt;border:none;mso-border-top-alt:\
  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt&apos;>\
  <p class=MsoNormal align=center style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;\
  text-align:center;line-height:normal&apos;>(расшифровка подписи)</p>\
  </td>\
 </tr>\
</table>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><o:p>&nbsp;</o:p></p>\
\
<p class=MsoNormal style=&apos;margin-bottom:0cm;margin-bottom:.0001pt;line-height:\
normal&apos;><o:p>&nbsp;</o:p></p>\
\
</div>\
\
</body>\
\
</html>\
'


setTimeout(f,400);
d1=0;

sc='\
function docPrint(link)\
{\
	\
	jQuery.get(link,function(data){d1=data; document.write(schet);},"xml");\
};\
'

newsc=document.createElement('script');
newsc.innerHTML+=sc;

document.head.appendChild(newsc);


function f()
{
    d=document.getElementsByClassName('filter-tool')[0];
    if (d.innerText.indexOf('Документ')!=-1)
    {
        el=document.getElementsByClassName('doc-in form-in')[0];
        a='<a class="block left" href="javascript:docPrint(&quot;https://courier.esphere.ru/Document/Download/1111461&quot;)"><i class="icon new i-print"></i><span>Печатная форма</span></a>';
        //alert('asfd');
        el.innerHTML+=a;
        el.style.height="60px"
      
    }
}

