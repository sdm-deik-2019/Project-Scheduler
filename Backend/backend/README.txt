A simple backend for interaction between frontend and the database.
This program was made in Visual Studio 2019.
If you want to test this program without opening the .sln file you should:
 	1. Go to ./ConsoleApp4/ConsoleApp4/bin/Debug
	2. Run ConsoleApp4.exe as administrator (Or it will block you)

For testing you should use the test_frontend.

Most methods wasn't used because they were made in the early point of development, and i didn't know what to expect, 
and this is basicly just a representation how this backend would work.

If you opened the c# script you can see that methods such as "Insert", "Select" and so on are obsolete.
It is because originally i wanted this to be as dynamic as possible, but in this case it would mean that i have to remodel the whole sql.
For the same reason i made the DatabaseExplorer.cs: it's original goal was to discover databases by getting their columns, tables etc.

The JsonHandler.StringToObjs didn't worked for some reason, so i started to rewrite it, then i realized that i don't need this method at all so i left it as it is.