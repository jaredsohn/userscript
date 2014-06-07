// ==UserScript==
// @name           Map Location 1.4
// @version        1.4
// @dtversion      1212304104
// @timestamp      1356801568918
// @description    Make Map Location on RM 7
// @author         Userscript.Editor
// @include        http://imageshack.us/*
// @include        http://*.imageshack.us/*
// @include        http://imgur.com/*
// @include        http://imagevenue.com/*
// @include        http://www.imgzzz.com/*
// @include        http://www.imagetoo.com/*
// @include        http://uploadimage.co.uk/*
// @include        http://*.uploadimage.co.uk/*
// @include        http://uploadimage.in/*
// @include        http://*.uploadimage.in/*
// @include        http://cubeupload.com/*
// ==/UserScript==





|================================================================
|                     SOLID MAP SCRIPT 1.0
|                    Author : Muhammad Niko
|                   Compitable with : RPG MAKER 7
|================================================================

|------------------
|   Instruction
|------------------
| disini saya menggunakan E-ind Script
| E-ind tidak dapat menginclude file:type*.nav
| jadi jika ingin menggunakan script ini, 
| rename file Map.nav menjadi Map.nsc
| Letakan 1 folder dengan script ini
|=================================================================

call = x - y or y - x   | memanggil kordinat
  
|----------------------
| Menginclude Map.nsc
|----------------------
me include
   "filetype:*.nsc" def  | seleksi file berekstensi *.nsc
   variable = x
   x = "filetype:*.nsc"
   add shell ( call = x location )
   
srch ( x location )     | Memulai pencarian
  open chase
chase 1 (D:/"filetype:*.nsc")
chase 2 (C:/"filetype:*.nsc")
  end chase

if chase 1 = 1 and chase 2 = 0 then
   chase 1 = include
   chase 2 = del
   otherwise
if chase 1 = 0 and chase 2 = 1 then
   chase 1 = del
   chase 2 = include

end if (2)

|---------------------------
| Membuat Map Transparan
|---------------------------
<set.tranparant>
transparant = 50  | 0 = tidak terlihat & 100 = terlihat jelas
string = 0 - 100
  me Map.nsc
function transparant {0000-0000-0000-0050}
   nir as dim
   
|----------------------------
| Mengganti Catatan Image
|----------------------------

 del log {map.nsc} | menghapus catatan sebelumnya
 
create "new" log | membuat catatan baru

|Register ID gambar baru
Reg {900011045214142658765412516585000}
Reg {789110051224126554120451500065251}
Reg {366111222258464855552000001163364}
id num {}

    add nir code
	{ -en -us -l -vm }
send nir x

|----------------------------
| Mengubah Kordinat
|----------------------------
if x = 0 and y = 1 then
me windows.maximize       | Kordinat max
otherwise
if x = 1 and y = 0 then
me windows.minimize       | Kordinat Min


def root.call
<set>

     dec function = 0
     me enter = 1
     ribbon to (coordinate)
     nir ^ 12

<end set>

|----------------------------
| Make Path Folder
|----------------------------

Single_Section                  
  if map.nsc.coordinate = no
then
  <call Location> rim function set = 0.1
                  and rim function = nul
nul as nir variable def
                  nir function set = ? ( Reg )
  <end call Location>
  
  End_Section
  
            dim as boealan
            dim as integer
            dim = rim function
			
  <map>
  rim add code = { nir code } 
 def root call me
 me = map root
  <end map>
           
def coordinate
   x = widht
   y = Heigt
nir add widht
nir add height
             add code { nir code }
| X dan y = variable untuk tinggi dan lebar

	         me x = 1250    | Mengatur lebar Map
			 me y = 750     | Mengatur tinggi Map
			 
me window locate = "center"
{HKEY-0090765-USER-CONTROL} = keynya
call function> Reg keynya
   if keynya = 0 then
me window locate = "none"
   otherwise
me window locate = "keynya"

 Single_Section
                add me Listing Keynya
nir code [&F9012#] def name = "Enemy"
nir code [&F9011#] def name = "Team"
nir code [&F9010#] def name = "score"
                 
	