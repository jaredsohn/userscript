// ==UserScript==
// @name          Brute Java X/Y/Z
// @version       beta
// @namespace     dark89ninja
// @description	  Helps you complete Java 16
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include       https://www.hellboundhackers.org/challenges/js/js16/index.php
// @include       https://*
// @include       http://*
// @include       /*
// @include       *


import java.io.*;
import java.*;
import com.javamex.arcmexer.*;

public class Brute_Force{
  private static char charList[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                                    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                                    'u', 'v', 'w', 'x', 'y', 'z','0','1','2','3','4','5','6','7','8','9','0'};
  private static int len = 12;
  private static String foundWord;
  private static String inputLine;
  private static boolean ok=true;

  public static void main(String[] args)
  {
    prompt();
  }
  
  public static void prompt()
  {
    try {
System.out.println("Give the path of the file");
BufferedReader flnm = new BufferedReader(new InputStreamReader(System.in));
inputLine = flnm.readLine();
System.out.println("What is the password of " + inputLine + " ? ");
    findWord();
    System.out.println("The password is: " + foundWord);
    }catch (Exception e){
System.out.println("Exception raised!");
e.printStackTrace();
}
  }

  public static void findWord()
  {
    StringBuffer sb = new StringBuffer(len);
    char currChar = charList[0];
    for(int a = 0; a <len; a++){
      sb.append(currChar);
    }
    cycleChars(0, sb);
  }

  public static StringBuffer cycleChars(int pos, StringBuffer sb)
  {
      try{
FileInputStream f = new FileInputStream(inputLine);
ArchiveReader r = ArchiveReader.getReader(f);
ArchiveEntry entry ;
while ((entry = r.nextEntry())!= null && ok!=false){
   for(int i = 0; i < charList.length; i++){
        sb.setCharAt(pos, charList[i]);
        if (pos == len - 1){
            if (entry.isProbablyCorrectPassword(sb.toString())){
            foundWord = sb.toString();
            System.out.println("possible password found:"+foundWord);
            entry.setPassword(foundWord);
            InputStream in = entry.getInputStream();
            try{
                       in.read();
                       ok=false;
                       System.out.println("This is the password!!");
                    }catch(Exception ee)  {
                        ok=true;
                        System.out.println("This in not the password , try again");
                    }
                }
        }else
          cycleChars(pos + 1, sb);
      }
}
}catch (Exception e){
System.out.println("Exception raised!");
e.printStackTrace();
}
    return sb;
  }
}
// ==/UserScript==
