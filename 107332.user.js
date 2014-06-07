// ==UserScript==
// @name          NSIS AutoLink
// @namespace     http://www.squarefree.com/userscripts
// @include     http://forums.winamp.com/*
// @include     https://forums.winamp.com/*
// @include     http://nsis.sourceforge.net/*
// @include     https://nsis.sourceforge.net/*
// @include     http://nsis.sf.net/*
// @include     https://nsis.sf.net/*
// @version     0.1.1
// @date     	2011-07-20
// @description   Puts links on NSIS commands and links them to the official scripting reference
// ==/UserScript==

/*

  Author:	Jesse Ruderman (original AutoLink script) - http://www.squarefree.com/
			Jan T. Sott (NSIS AutoLink modification) - http://whyeye.org
			
  License: MPL, GPL, LGPL.

  Version history:

    0.1.1	-added some nsDialogs commands
	
    0.1		-first demo

*/


const timeBefore = new Date();


/***********************************
 *             Filters             *
 ***********************************/

/*

  I encourage you to create new filters in your copy of AutoLink. 

  Filters have three fields:

   * name (string)
       Used for tooltip on created links, e.g. "Link added by AutoLink filter: Plain Text Links".
       Used for class attribute of created links, e.g. "autolink autolink-plain-text-links".

   * regexp (regular expression)
       The entire text matching the regular expression will be linked.
       Must be global (/g).
       May be case-insensitive (/i).

   * href (function)
       Arguments: |match|, an output of regexp.exec.  (May also treat RegExp.leftContext, etc. as inputs.)
       Returns: The URL to be used for a link, or |null| to cancel link creation.
       Must not use filter.regexp, but may use other regular expressions.
    
  This regular expression reference might be useful:
  http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:RegExp
  
  If multiple filters match a string, the first filter will win.

*/

var docs_ch4_url = "http://nsis.sourceforge.net/Docs//Chapter4.html"
var docs_ch5_url = "http://nsis.sourceforge.net/Docs/Chapter5.html"
var nsdialogs_url = "http://nsis.sourceforge.net/Docs/nsDialogs/Readme.html"

const filters = [
  {
    name: "Abort",
    regexp: /\bAbort\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.1"; }
  },
  {
    name: "AddBrandingImage",
    regexp: /\bAddBrandingImage\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.1"; }
  },
  {
    name: "AddSize",
    regexp: /\bAddSize\b/g,
    href: function(match) { return docs_ch4_url + "#4.6.1.1"; }
  },
  {
    name: "AllowRootDirInstall",
    regexp: /\bAllowRootDirInstall\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.2"; }
  },
  {
    name: "AllowSkipFiles",
    regexp: /\bAllowSkipFiles\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.1"; }
  },
  {
    name: "AutoCloseWindow",
    regexp: /\bAutoCloseWindow\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.3"; }
  },
  {
    name: "BGFont",
    regexp: /\bBGFont\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.4"; }
  },
  {
    name: "BGGradient",
    regexp: /\bBGGradient\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.5"; }
  },
  {
    name: "BrandingText",
    regexp: /\bBrandingText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.6"; }
  },
  {
    name: "BringToFront",
    regexp: /\bBringToFront\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.1"; }
  },
  {
    name: "Call",
    regexp: /\bCall\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.2"; }
  },
  {
    name: "CallInstDLL",
    regexp: /\bCallInstDLL\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.1"; }
  },
  {
    name: "Caption",
    regexp: /\bCaption\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.7"; }
  },
  {
    name: "ChangeUI",
    regexp: /\bChangeUI\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.8"; }
  },
  {
    name: "CheckBitmap",
    regexp: /\bCheckBitmap\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.9"; }
  },
  {
    name: "ClearErrors",
    regexp: /\bClearErrors\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.3"; }
  },
  {
    name: "CompletedText",
    regexp: /\bCompletedText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.10"; }
  },
  {
    name: "ComponentText",
    regexp: /\bComponentText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.11"; }
  },
  {
    name: "CopyFiles",
    regexp: /\bCopyFiles\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.2"; }
  },
  {
    name: "CRCCheck",
    regexp: /\bCRCCheck\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.12"; }
  },
  {
    name: "CreateDirectory",
    regexp: /\bCreateDirectory\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.3"; }
  },
  {
    name: "CreateFont",
    regexp: /\bCreateFont\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.2"; }
  },
  {
    name: "CreateShortCut",
    regexp: /\bCreateShortCut\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.4"; }
  },
  {
    name: "Delete",
    regexp: /\bDelete\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.1"; }
  },
  {
    name: "DeleteINISec",
    regexp: /\bDeleteINISec\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.1"; }
  },
  {
    name: "DeleteINIStr",
    regexp: /\bDeleteINIStr\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.2"; }
  },
  {
    name: "DeleteRegKey",
    regexp: /\bDeleteRegKey\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.3"; }
  },
  {
    name: "DeleteRegValue",
    regexp: /\bDeleteRegValue\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.4"; }
  },
  {
    name: "DetailPrint",
    regexp: /\bDetailPrint\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.3"; }
  },
  {
    name: "DetailsButtonText",
    regexp: /\bDetailsButtonText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.13"; }
  },
  {
    name: "DirText",
    regexp: /\bDirText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.14"; }
  },
  {
    name: "DirVar",
    regexp: /\bDirVar\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.15"; }
  },
  {
    name: "DirVerify",
    regexp: /\bDirVerify\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.16"; }
  },
  {
    name: "EnableWindow",
    regexp: /\bEnableWindow\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.4"; }
  },
  {
    name: "EnumRegKey",
    regexp: /\bEnumRegKey\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.5"; }
  },
  {
    name: "EnumRegValue",
    regexp: /\bEnumRegValue\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.6"; }
  },
  {
    name: "Exch",
    regexp: /\bExch\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.9.1"; }
  },
  {
    name: "Exec",
    regexp: /\bExec\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.2"; }
  },
  {
    name: "ExecShell",
    regexp: /\bExecShell\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.3"; }
  },
  {
    name: "ExecWait",
    regexp: /\bExecWait\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.4"; }
  },
  {
    name: "ExpandEnvStrings",
    regexp: /\bExpandEnvStrings\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.7"; }
  },
  {
    name: "File",
    regexp: /\bFile\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.5"; }
  },
  {
    name: "FileBufSize",
    regexp: /\bFileBufSize\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.2"; }
  },
  {
    name: "FileClose",
    regexp: /\bFileClose\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.1"; }
  },
  {
    name: "FileErrorText",
    regexp: /\bFileErrorText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.17"; }
  },
  {
    name: "FileOpen",
    regexp: /\bFileOpen\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.2"; }
  },
  {
    name: "FileRead",
    regexp: /\bFileRead\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.3"; }
  },
  {
    name: "FileReadByte",
    regexp: /\bFileReadByte\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.5"; }
  },
  {
    name: "FileReadUTF16LE",
    regexp: /\bFileReadUTF16LE\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.4"; }
  },
  {
    name: "FileReadWord",
    regexp: /\bFileReadWord\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.6"; }
  },
  {
    name: "FileSeek",
    regexp: /\bFileSeek\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.7"; }
  },
  {
    name: "FileWrite",
    regexp: /\bFileWrite\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.8"; }
  },
  {
    name: "FileWriteByte",
    regexp: /\bFileWriteByte\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.10"; }
  },
  {
    name: "FileWriteUTF16LE",
    regexp: /\bFileWriteUTF16LE\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.9"; }
  },
  {
    name: "FileWriteWord",
    regexp: /\bFileWriteWord\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.11"; }
  },
  {
    name: "FindClose",
    regexp: /\bFindClose\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.12"; }
  },
  {
    name: "FindFirst",
    regexp: /\bFindFirst\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.13"; }
  },
  {
    name: "FindNext",
    regexp: /\bFindNext\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.5.14"; }
  },
  {
    name: "FindWindow",
    regexp: /\bFindWindow\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.5"; }
  },
  {
    name: "FlushINI",
    regexp: /\bFlushINI\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.8"; }
  },
  {
    name: "Function",
    regexp: /\bFunction\b/g,
    href: function(match) { return docs_ch4_url + "#4.7.1.1"; }
  },
  {
    name: "FunctionEnd",
    regexp: /\bFunctionEnd\b/g,
    href: function(match) { return docs_ch4_url + "#4.7.1.2"; }
  },
  {
    name: "GetCurInstType",
    regexp: /\bGetCurInstType\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.10"; }
  },
  {
    name: "GetCurrentAddress",
    regexp: /\bGetCurrentAddress\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.4"; }
  },
  {
    name: "GetDlgItem",
    regexp: /\bGetDlgItem\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.6"; }
  },
  {
    name: "GetDLLVersion",
    regexp: /\bGetDLLVersion\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.5"; }
  },
  {
    name: "GetDLLVersionLocal",
    regexp: /\bGetDLLVersionLocal\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.6"; }
  },
  {
    name: "GetErrorLevel",
    regexp: /\bGetErrorLevel\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.7.1"; }
  },
  {
    name: "GetFileTime",
    regexp: /\bGetFileTime\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.7"; }
  },
  {
    name: "GetFileTimeLocal",
    regexp: /\bGetFileTimeLocal\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.8"; }
  },
  {
    name: "GetFullPathName",
    regexp: /\bGetFullPathName\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.9"; }
  },
  {
    name: "GetFunctionAddress",
    regexp: /\bGetFunctionAddress\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.5"; }
  },
  {
    name: "GetInstDirError",
    regexp: /\bGetInstDirError\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.7.2"; }
  },
  {
    name: "GetLabelAddress",
    regexp: /\bGetLabelAddress\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.6"; }
  },
  {
    name: "GetTempFileName",
    regexp: /\bGetTempFileName\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.10"; }
  },
  {
    name: "Goto",
    regexp: /\bGoto\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.7"; }
  },
  {
    name: "HideWindow",
    regexp: /\bHideWindow\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.7"; }
  },
  {
    name: "Icon",
    regexp: /\bIcon\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.8"; }
  },
  {
    name: "IfErrors",
    regexp: /\bIfErrors\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.9"; }
  },
  {
    name: "IfFileExists",
    regexp: /\bIfFileExists\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.10"; }
  },
  {
    name: "IfRebootFlag",
    regexp: /\bIfRebootFlag\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.11"; }
  },
  {
    name: "IfSilent",
    regexp: /\bIfSilent\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.12"; }
  },
  {
    name: "InitPluginsDir",
    regexp: /\bInitPluginsDir\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.7.3"; }
  },
  {
    name: "InstallButtonText",
    regexp: /\bInstallButtonText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.19"; }
  },
  {
    name: "InstallColors",
    regexp: /\bInstallColors\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.20"; }
  },
  {
    name: "InstallDir",
    regexp: /\bInstallDir\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.21"; }
  },
  {
    name: "InstallDirRegKey",
    regexp: /\bInstallDirRegKey\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.22"; }
  },
  {
    name: "InstProgressFlags",
    regexp: /\bInstProgressFlags\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.23"; }
  },
  {
    name: "InstType",
    regexp: /\bInstType\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.24"; }
  },
  {
    name: "InstTypeGetText",
    regexp: /\bInstTypeGetText\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.12"; }
  },
  {
    name: "InstTypeSetText",
    regexp: /\bInstTypeSetText\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.11"; }
  },
  {
    name: "IntCmp",
    regexp: /\bIntCmp\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.13"; }
  },
  {
    name: "IntCmpU",
    regexp: /\bIntCmpU\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.14"; }
  },
  {
    name: "IntFmt",
    regexp: /\bIntFmt\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.10.1"; }
  },
  {
    name: "IntOp",
    regexp: /\bIntOp\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.10.2"; }
  },
  {
    name: "IsWindow",
    regexp: /\bIsWindow\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.8"; }
  },
  {
    name: "LangString",
    regexp: /\bLangString\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.15.2"; }
  },
  {
    name: "LicenseBkColor",
    regexp: /\bLicenseBkColor\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.25"; }
  },
  {
    name: "LicenseData",
    regexp: /\bLicenseData\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.26"; }
  },
  {
    name: "LicenseForceSelection",
    regexp: /\bLicenseForceSelection\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.27"; }
  },
  {
    name: "LicenseLangString",
    regexp: /\bLicenseLangString\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.15.3"; }
  },
  {
    name: "LicenseText",
    regexp: /\bLicenseText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.28"; }
  },
  {
    name: "LoadLanguageFile",
    regexp: /\bLoadLanguageFile\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.15.1"; }
  },
  {
    name: "LockWindow",
    regexp: /\bLockWindow\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.9"; }
  },
  {
    name: "LogSet",
    regexp: /\bLogSet\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.12.1"; }
  },
  {
    name: "LogText",
    regexp: /\bLogText\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.12.2"; }
  },
  {
    name: "MessageBox",
    regexp: /\bMessageBox\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.15"; }
  },
  {
    name: "MiscButtonText",
    regexp: /\bMiscButtonText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.29"; }
  },
  {
    name: "Name",
    regexp: /\bName\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.30"; }
  },
  {
    name: "Nop",
    regexp: /\bNop\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.7.4"; }
  },
  {
    name: "OutFile",
    regexp: /\bOutFile\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.31"; }
  },
  {
    name: "Page",
    regexp: /\bPage\b/g,
    href: function(match) { return docs_ch4_url + "#4.5.4"; }
  },
  {
    name: "PageEx",
    regexp: /\bPageEx\b/g,
    href: function(match) { return docs_ch4_url + "#4.5.6"; }
  },
  {
    name: "PageExEnd",
    regexp: /\bPageExEnd\b/g,
    href: function(match) { return docs_ch4_url + "#4.5.7"; }
  },
  {
    name: "Pop",
    regexp: /\bPop\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.9.2"; }
  },
  {
    name: "Push",
    regexp: /\bPush\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.9.3"; }
  },
  {
    name: "Quit",
    regexp: /\bQuit\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.17"; }
  },
  {
    name: "ReadEnvStr",
    regexp: /\bReadEnvStr\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.9"; }
  },
  {
    name: "ReadINIStr",
    regexp: /\bReadINIStr\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.10"; }
  },
  {
    name: "ReadRegDWORD",
    regexp: /\bReadRegDWORD\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.11"; }
  },
  {
    name: "ReadRegStr",
    regexp: /\bReadRegStr\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.12"; }
  },
  {
    name: "Reboot",
    regexp: /\bReboot\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.11.1"; }
  },
  {
    name: "RegDLL",
    regexp: /\bRegDLL\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.13"; }
  },
  {
    name: "Rename",
    regexp: /\bRename\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.6"; }
  },
  {
    name: "RequestExecutionLevel",
    regexp: /\bRequestExecutionLevel\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.32"; }
  },
  {
    name: "ReserveFile",
    regexp: /\bReserveFile\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.7"; }
  },
  {
    name: "Return",
    regexp: /\bReturn\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.16"; }
  },
  {
    name: "RMDir",
    regexp: /\bRMDir\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.8"; }
  },
  {
    name: "SearchPath",
    regexp: /\bSearchPath\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.11"; }
  },
  {
    name: "Section",
    regexp: /\bSection\b/g,
    href: function(match) { return docs_ch4_url + "#4.6.1.2"; }
  },
  {
    name: "SectionEnd",
    regexp: /\bSectionEnd\b/g,
    href: function(match) { return docs_ch4_url + "#4.6.1.3"; }
  },
  {
    name: "SectionGetFlags",
    regexp: /\bSectionGetFlags\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.2"; }
  },
  {
    name: "SectionGetInstTypes",
    regexp: /\bSectionGetInstTypes\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.6"; }
  },
  {
    name: "SectionGetSize",
    regexp: /\bSectionGetSize\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.8"; }
  },
  {
    name: "SectionGetText",
    regexp: /\bSectionGetText\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.4"; }
  },
  {
    name: "SectionGroup",
    regexp: /\bSectionGroup\b/g,
    href: function(match) { return docs_ch4_url + "#4.6.1.5"; }
  },
  {
    name: "SectionGroupEnd",
    regexp: /\bSectionGroupEnd\b/g,
    href: function(match) { return docs_ch4_url + "#4.6.1.6"; }
  },
  {
    name: "SectionIn",
    regexp: /\bSectionIn\b/g,
    href: function(match) { return docs_ch4_url + "#4.6.1.4"; }
  },
  {
    name: "SectionSetFlags",
    regexp: /\bSectionSetFlags\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.1"; }
  },
  {
    name: "SectionSetInstTypes",
    regexp: /\bSectionSetInstTypes\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.5"; }
  },
  {
    name: "SectionSetSize",
    regexp: /\bSectionSetSize\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.7"; }
  },
  {
    name: "SectionSetText",
    regexp: /\bSectionSetText\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.3"; }
  },
  {
    name: "SendMessage",
    regexp: /\bSendMessage\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.10"; }
  },
  {
    name: "SetAutoClose",
    regexp: /\bSetAutoClose\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.11"; }
  },
  {
    name: "SetBrandingImage",
    regexp: /\bSetBrandingImage\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.12"; }
  },
  {
    name: "SetCompress",
    regexp: /\bSetCompress\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.3"; }
  },
  {
    name: "SetCompressor",
    regexp: /\bSetCompressor\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.4"; }
  },
  {
    name: "SetCompressorDictSize",
    regexp: /\bSetCompressorDictSize\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.5"; }
  },
  {
    name: "SetCtlColors",
    regexp: /\bSetCtlColors\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.15"; }
  },
  {
    name: "SetCurInstType",
    regexp: /\bSetCurInstType\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.13.9"; }
  },
  {
    name: "SetDatablockOptimize",
    regexp: /\bSetDatablockOptimize\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.6"; }
  },
  {
    name: "SetDateSave",
    regexp: /\bSetDateSave\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.7"; }
  },
  {
    name: "SetDetailsPrint",
    regexp: /\bSetDetailsPrint\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.14"; }
  },
  {
    name: "SetDetailsView",
    regexp: /\bSetDetailsView\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.13"; }
  },
  {
    name: "SetErrorLevel",
    regexp: /\bSetErrorLevel\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.7.5"; }
  },
  {
    name: "SetErrors",
    regexp: /\bSetErrors\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.18"; }
  },
  {
    name: "SetFileAttributes",
    regexp: /\bSetFileAttributes\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.12"; }
  },
  {
    name: "SetFont",
    regexp: /\bSetFont\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.33"; }
  },
  {
    name: "SetOutPath",
    regexp: /\bSetOutPath\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.1.9"; }
  },
  {
    name: "SetOverwrite",
    regexp: /\bSetOverwrite\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.8"; }
  },
  {
    name: "SetRebootFlag",
    regexp: /\bSetRebootFlag\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.11.2"; }
  },
  {
    name: "SetRegView",
    regexp: /\bSetRegView\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.7.6"; }
  },
  {
    name: "SetShellVarContext",
    regexp: /\bSetShellVarContext\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.7.7"; }
  },
  {
    name: "SetSilent",
    regexp: /\bSetSilent\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.16"; }
  },
  {
    name: "ShowInstDetails",
    regexp: /\bShowInstDetails\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.34"; }
  },
  {
    name: "ShowUninstDetails",
    regexp: /\bShowUninstDetails\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.35"; }
  },
  {
    name: "ShowWindow",
    regexp: /\bShowWindow\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.14.17"; }
  },
  {
    name: "SilentInstall",
    regexp: /\bSilentInstall\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.36"; }
  },
  {
    name: "SilentUnInstall",
    regexp: /\bSilentUnInstall\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.37"; }
  },
  {
    name: "Sleep",
    regexp: /\bSleep\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.7.8"; }
  },
  {
    name: "SpaceTexts",
    regexp: /\bSpaceTexts\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.38"; }
  },
  {
    name: "StrCmp",
    regexp: /\bStrCmp\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.19"; }
  },
  {
    name: "StrCmpS",
    regexp: /\bStrCmpS\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.4.20"; }
  },
  {
    name: "StrCpy",
    regexp: /\bStrCpy\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.8.1"; }
  },
  {
    name: "StrLen",
    regexp: /\bStrLen\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.8.2"; }
  },
  {
    name: "SubCaption",
    regexp: /\bSubCaption\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.39"; }
  },
  {
    name: "TargetMinimalOS",
    regexp: /\bTargetMinimalOS\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.2.9"; }
  },
  {
    name: "UninstallButtonText",
    regexp: /\bUninstallButtonText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.40"; }
  },
  {
    name: "UninstallCaption",
    regexp: /\bUninstallCaption\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.41"; }
  },
  {
    name: "UninstallIcon",
    regexp: /\bUninstallIcon\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.42"; }
  },
  {
    name: "UninstallSubCaption",
    regexp: /\bUninstallSubCaption\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.43"; }
  },
  {
    name: "UninstallText",
    regexp: /\bUninstallText\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.44"; }
  },
  {
    name: "UninstPage",
    regexp: /\bUninstPage\b/g,
    href: function(match) { return docs_ch4_url + "#4.5.5"; }
  },
  {
    name: "UnRegDLL",
    regexp: /\bUnRegDLL\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.3.14"; }
  },
  {
    name: "Var",
    regexp: /\bVar\b/g,
    href: function(match) { return docs_ch4_url + "#4.2.1.1"; }
  },
  {
    name: "VIAddVersionKey",
    regexp: /\bVIAddVersionKey\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.3.1"; }
  },
  {
    name: "VIProductVersion",
    regexp: /\bVIProductVersion\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.3.2"; }
  },
  {
    name: "WindowIcon",
    regexp: /\bWindowIcon\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.45"; }
  },
  {
    name: "WriteINIStr",
    regexp: /\bWriteINIStr\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.13"; }
  },
  {
    name: "WriteRegBin",
    regexp: /\bWriteRegBin\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.14"; }
  },
  {
    name: "WriteRegDWORD",
    regexp: /\bWriteRegDWORD\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.15"; }
  },
  {
    name: "WriteRegExpandStr",
    regexp: /\bWriteRegExpandStr\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.17"; }
  },
  {
    name: "WriteRegStr",
    regexp: /\bWriteRegStr\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.2.16"; }
  },
  {
    name: "WriteUninstaller",
    regexp: /\bWriteUninstaller\b/g,
    href: function(match) { return docs_ch4_url + "#4.9.6.1"; }
  },
  {
    name: "XPStyle",
    regexp: /\bXPStyle\b/g,
    href: function(match) { return docs_ch4_url + "#4.8.1.46"; }
  },
  
/*** Compiler Utility Commands ***/

  {
    name: "!include",
    regexp: /!include\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.1"; }
  },
  {
    name: "!addincludedir",
    regexp: /!addincludedir\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.2"; }
  },
  {
    name: "!addplugindir",
    regexp: /!addplugindir\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.3"; }
  },
  {
    name: "!appendfile",
    regexp: /!appendfile\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.4"; }
  },
  {
    name: "!cd",
    regexp: /!cd\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.5"; }
  },
  {
    name: "!delfile",
    regexp: /!delfile\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.6"; }
  },
  {
    name: "!echo",
    regexp: /!echo\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.7"; }
  },
  {
    name: "!error",
    regexp: /!error\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.8"; }
  },
  {
    name: "!execute",
    regexp: /!execute\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.9"; }
  },
  {
    name: "!packhdr",
    regexp: /!packhdr\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.10"; }
  },
  {
    name: "!finalize",
    regexp: /!finalize\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.11"; }
  },
  {
    name: "!system",
    regexp: /!system\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.12"; }
  },
  {
    name: "!tempfile",
    regexp: /!tempfile\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.13"; }
  },
  {
    name: "!warning",
    regexp: /!warning\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.14"; }
  },
  {
    name: "!verbose",
    regexp: /!verbose\b/g,
    href: function(match) { return docs_ch5_url + "#5.1.15"; }
  },
  
/*** Conditional Compilation ***/

  {
    name: "!define",
    regexp: /!define\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.1"; }
  },
  {
    name: "!undef",
    regexp: /!undef\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.2"; }
  },
  {
    name: "!ifdef",
    regexp: /!ifdef\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.3"; }
  },
  {
    name: "!ifndef",
    regexp: /!ifndef\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.4"; }
  },
  {
    name: "!if",
    regexp: /!if\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.5"; }
  },
  {
    name: "!ifmacrodef",
    regexp: /!ifmacrodef\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.6"; }
  },
  {
    name: "!ifmacrondef",
    regexp: /!ifmacrondef\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.7"; }
  },
  {
    name: "!else",
    regexp: /!else\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.8"; }
  },
  {
    name: "!endif",
    regexp: /!endif\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.9"; }
  },
  {
    name: "!insertmacro",
    regexp: /!insertmacro\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.10"; }
  },
  {
    name: "!macro",
    regexp: /!macro\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.11"; }
  },
  {
    name: "!macroend",
    regexp: /!macroend\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.12"; }
  },
  {
    name: "!searchparse",
    regexp: /!searchparse\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.13"; }
  },
  {
    name: "!searchreplace",
    regexp: /!searchreplace\b/g,
    href: function(match) { return docs_ch5_url + "#5.4.14"; }
  },
  
/*** Conditional Compilation ***/

  {
    name: "nsDialogs::Create",
    regexp: /nsDialogs::Create\b/g,
    href: function(match) { return nsdialogs_url + "#ref-create"; }
  },
  {
    name: "nsDialogs::CreateControl",
    regexp: /nsDialogs::CreateControl\b/g,
    href: function(match) { return nsdialogs_url + "#ref-createcontrol"; }
  },
  {
    name: "nsDialogs::Show",
    regexp: /nsDialogs::Show\b/g,
    href: function(match) { return nsdialogs_url + "#ref-show"; }
  },
  {
    name: "nsDialogs::SelectFileDialog",
    regexp: /nsDialogs::SelectFileDialog\b/g,
    href: function(match) { return nsdialogs_url + "#ref-selectfiledialog"; }
  },
  {
    name: "nsDialogs::SelectFolderDialog",
    regexp: /nsDialogs::SelectFolderDialog\b/g,
    href: function(match) { return nsdialogs_url + "#ref-selectfolderdialog"; }
  },
  {
    name: "nsDialogs::SetRTL",
    regexp: /nsDialogs::SetRTL\b/g,
    href: function(match) { return nsdialogs_url + "#ref-setrtl"; }
  },
  {
    name: "nsDialogs::GetUserData",
    regexp: /nsDialogs::GetUserData\b/g,
    href: function(match) { return nsdialogs_url + "#ref-getuserdata"; }
  },
  {
    name: "nsDialogs::SetUserData",
    regexp: /nsDialogs::SetUserData\b/g,
    href: function(match) { return nsdialogs_url + "#ref-setuserdata"; }
  },
  {
    name: "nsDialogs::OnBack",
    regexp: /nsDialogs::OnBack\b/g,
    href: function(match) { return nsdialogs_url + "#ref-onback"; }
  },
  {
    name: "nsDialogs::OnChange",
    regexp: /nsDialogs::OnChange\b/g,
    href: function(match) { return nsdialogs_url + "#ref-onchange"; }
  },
  {
    name: "nsDialogs::OnClick",
    regexp: /nsDialogs::OnClick\b/g,
    href: function(match) { return nsdialogs_url + "#ref-onclick"; }
  },
  {
    name: "nsDialogs::OnNotify",
    regexp: /nsDialogs::OnNotify\b/g,
    href: function(match) { return nsdialogs_url + "#ref-onnotify"; }
  },
  {
    name: "nsDialogs::CreateTimer",
    regexp: /nsDialogs::CreateTimer\b/g,
    href: function(match) { return nsdialogs_url + "#ref-createtimer"; }
  },
  {
    name: "nsDialogs::KillTimer",
    regexp: /nsDialogs::KillTimer\b/g,
    href: function(match) { return nsdialogs_url + "#ref-killtimer"; }
  }
  
];


/***********************************
 *  Helper functions for filters   *
 ***********************************/

function digits(s)
{
  return s.replace(/[^0-9]/g, "");
}

function alphanumerics(s)
{
  return s.replace(/[^0-9a-z]/ig, "");
}


/***********************************
 *           Link styling          *
 ***********************************/
    
/*

  You can make links generated by AutoLink look different from normal links
  by editing styleLink below and/or by setting up user style sheet rules.
  
  Example: on squarefree.com, make autolinked plain text links orange. (Firefox trunk only.)
  
    @-moz-document domain(squarefree.com) { 
      .autolink-plain-text-link { color: orange ! important; }
    }
      
*/

function styleLink(a, filter)
{
  a.style.color = "green";
}


/***********************************
 *           Fix filters           *
 ***********************************/

function fixFilters()
{
  var i, r;
  for (i = 0; r = filters[i]; ++i) {
    // lowercase, and replace each run of non-alphanumerics with a single hyphen
    r.classNamePart = r.name.toLowerCase().replace(/[^0-9a-z]+/ig, "-");
    if(!r.regexp.global)
      alert("AutoLink filter " + r.name + " is not global! This will break stuff!");
  }
}
fixFilters();


/***********************************
 *      When and where to run      *
 ***********************************/

var moddingDOM = false;

window.addEventListener("load", init, false);
function init()
{
  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  setTimeout(go, 50, document.body);
}

// This makes it work at Gmail.
// 20% performance penalty on a plain text file with a link on almost every line.
// Tiny performance penalty on pages with few automatically added links.
function nodeInserted(e)
{
  // our own modifications should not trigger this.
  // (we don't want our regular expression objects getting confused)
  // (we want better control over when we recurse)
  
  //GM_log("Inserted: " + e.target);
  
  if (!moddingDOM)
    go(e.target);
}



/***********************************
 *          DOM traversal          *
 ***********************************/


/*

  This script uses manual DOM traversal, in an iterative way without a stack!

  Advantages of snapshot XPath:
    * Much less code
    * 20-40% faster
    * May be possible to get another speed boost by including the regexp in the XPath expression - http://www.developer.com/xml/article.php/10929_3344421_3
    * All the cool people are using it
  
  Advantages of manual DOM traversal:
    * Lets us stop+continue (snapshot xpath doesn't let us)
    * Lets us modify DOM in strange ways without worrying.
    * Easier to control which elements we recurse into.

*/


// Ignore all children of these elements.
const skippedElements = { 
  a:        true, // keeps us from screwing with existing links. keeps us from recursing to death :)
  noscript: true, // noscript has uninterpreted, unshown text children; don't waste time+sanity there.
  head:     true,
  script:   true,
  style:    true,
  textarea: true,
  label:    true,
  select:   true,
  button:   true,
  h1:   	true,
  h2:   	true,
  h3:   	true,
  h4:   	true
}

const gmail = (location.host == "gmail.google.com");

function skipChildren(node)
{
  if (node.tagName)  // !
  {
    if (skippedElements[node.tagName.toLowerCase()]) {
      return true;
    }
    
    if (gmail) {
      if (node.className == "ac") // gmail autocomplete (fake dropdown)
        return true;
      if (node.className == "ilc sxs") // invite foo to gmail (fake link/button)
        return true;
    }
  }

  return false;
}


function go(traversalRoot)
{
  var m;
  
  // Ensure we're not already in a forbidden element.
  for (m = traversalRoot; m != undefined; m = m.parentNode) {
    if (skipChildren(m)) {
      return;
    }
  }

  // work around bug, or in case previous user scripts did crazy stuff
  traversalRoot.normalize();

  function cont(n, didChildren)
  {
    var k = 0; // split work into chunks so Firefox doesn't freeze
    var q;
    
    while (n && k < 100)
    {
      ++k;
    
      // Do stuff at this node
      if (!didChildren && n.nodeType == 3) {
        if((q = runFiltersOnTextNode(n))) {
          n = q[0];

          // if there were changes, run filters again on the new text node that's here          
          if (q[1]) 
            continue;
        }
      }
  
      // Traverse to the "next" node in depth-first order

      if (!n.firstChild)
        didChildren = true;
  
      if (didChildren && n == traversalRoot)
        break;
      else if (!didChildren && n.firstChild && !skipChildren(n)) {
        n = n.firstChild;
        // didChildren is already false and should stay false
      }
      else {
        if (n.nextSibling) {
          n = n.nextSibling;
          didChildren = false;
        }
        else {
          n = n.parentNode;
          didChildren = true;
        }
      }
    } // end while
  
    if (!n) {
      //GM_log("Odd. traversalRoot was " + traversalRoot);
    }
    else if (n == traversalRoot) {
      //GM_log("Done");
      //alert("AutoLink time: " + (new Date() - timeBefore))
    }
    else {
      // Continue after 10ms.
      //GM_log("will have to continue");
      setTimeout(cont, 10, n, didChildren);
    }
    
  } // end function cont
  
  cont(traversalRoot, false);
}


/***********************************
 *         Running filters         *
 ***********************************/

// runFiltersOnTextNode
// Return: node at which to continue traversal, or |null| to mean no changes were made.

function runFiltersOnTextNode(node)
{
  // Too many variables.  Good hint that I need to split this function up :P
  var source, j, regexp, match, lastLastIndex, k, filter, href, anyChanges; // things
  var used, unused, firstUnused, lastUnused, a, parent, nextSibling; // nodes
  
  source = node.data;
  
  anyChanges = false;

  // runFiltersOnTextNode has its own do-too-much-at-once avoider thingie.
  // assumption: if there is one text node with a lot of matches,
  // it's more important to finish quickly than be transparent.
  // (e.g. plain text file FULL of links)
  // assumption: 40 * 100 = 140.
  k=0;
  
  for (j = 0; filter = filters[j]; ++j) {
    regexp = filter.regexp;
    
    if (regexp.test(source)) {

      parent = node.parentNode;
      nextSibling = node.nextSibling;

      
      regexp.lastIndex = 0;
      firstUnused = null;
      
      // Optimization from the linkify that came with Greasemonkey(?):
      // instead of splitting a text node multiple times, take advantage
      // of global regexps and substring.

      for (match = null, lastLastIndex = 0; k < 40 && (match = regexp.exec(source)); ) {
      
        // this should happen first, so RegExp.foo is still good :)
        href = genLink(filter, match); 
        
        if (href != null && href != location.href) { 
          ++k;

          unused = document.createTextNode(source.substring(lastLastIndex, match.index));
          if (!anyChanges) {
            anyChanges = true;
            parent.removeChild(node);
            firstUnused = unused;
            moddingDOM = true;
          }
          parent.insertBefore(unused, nextSibling);

          used = document.createTextNode(match[0])
  
          a = document.createElement("a");
          a.href = href;
          a.title = "Look up: " + filter.name;
          a.className = "autolink autolink-" + filter.classNamePart;
  
          styleLink(a, filter);
  
          a.appendChild(used);
          parent.insertBefore(a, nextSibling);
          
          lastLastIndex = regexp.lastIndex;
        }

      }

      if (anyChanges) {
        lastUnused = document.createTextNode(source.substring(lastLastIndex));
        parent.insertBefore(lastUnused, nextSibling);
        moddingDOM = false;
        return [firstUnused, true]
      }
      
      return [node, false];
    }
  }
  return null;
}

function genLink(filter, match)
{
  try {
    return filter.href(match); 
  }
  catch(er) {
    return "data:text/plain,Error running AutoLink function for filter: " + encodeURIComponent(filter.name) + "%0A%0A" + encodeURIComponent(er);
  }
}
