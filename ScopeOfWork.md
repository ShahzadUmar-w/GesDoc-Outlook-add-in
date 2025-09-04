1. Pehla Button: "Registar Email" (Email Register Karein)
Is Button ka Kaam kya hai?
Jab aap Outlook mein koi email khol kar is button par click karenge, to aapka Add-in us poori email ko (yani uski saari headings, text, pictures, jo kuch bhi email mein hai) ek khaas file mein badal dega. Is file ko ".eml format" mein banaya jayega (jaise aapki tasveerें .jpg hoti hain ya documents .pdf hote hain, waise hi emails ke liye .eml hota hai). Phir is .eml file ko company ke DMS mein bhej diya jayega taake woh save ho jaye.
Technical Process (Kaise Kaam Karega?):
Step 1 (Email nikalna): Aapka Add-in Outlook se us email ka saara "kacha maal" (raw content) nikalega. Yani email kisne bheji, kisko bheji, subject kya tha, email ki body mein kya likha tha, wagaira.
Step 2 (.eml banana): Is kache maal ko istemal karke, aap us email ko ek properly formatted .eml file mein convert karenge.
Step 3 (API ko bhejna): Ab aap is .eml file ko client ki di hui ek khaas internet address par bhejenge. Is internet address ko "API endpoint" kehte hain, jo http://servername/api/upload_api_doc.asp hai.
Step 4 (Username bhejna): Jab aap .eml file API ko bhej rahe honge, to uske saath aapko user ka naam (jo Add-in ki settings mein pehle se save hoga) bhi bhejna hoga. DMS ko isse pata chalega ke kis shakhs ne yeh email save ki hai.
Step 5 (Confirmation): API aapko wapas jawab degi ke email kamyabi se save ho gayi ya koi masla aa gaya. Yeh jawab aap user ko Add-in mein dikha sakte hain (jaise "Email saved successfully!").
2. Doosra Button: "Registar Email e Anexos" (Email aur Attachments Register Karein)
Is Button ka Kaam kya hai?
Yeh button pehle button se thoda behtar hai. Agar aapki email ke saath kuch files (attachments) lagi hui hain, to jab aap is button par click karenge, to Add-in aapko un saari attachments ki ek list dikhayega. Har attachment ke naam ke saath ek chota sa box hoga (jise "checkbox" kehte hain). Aap apni marzi se chun sakte hain ke konsi attachments ko email ke saath DMS mein save karna hai aur kisko nahi.
Technical Process (Kaise Kaam Karega?):
Step 1 (Attachments ki list dikhana): Sab se pehle, Add-in Outlook se email mein lagi hui tamam attachments ke naam nikalega aur unhein "Task Pane" mein checkboxes ke saath dikhayega.
Step 2 (User ki selection): User apni marzi se kuch attachments ko "check" karega (chunega).
Step 3 (Email aur Attachments nikalna): Jab user is button par click karega, to Add-in:
Usi tarah poori email ko .eml file mein convert karega (jaise pehle button mein kiya tha).
Aur phir, jin attachments ko user ne chuna tha, un har attachment ko bhi alag-alag files mein nikalega.
Step 4 (API ko bhejna): Ab yeh .eml email file aur chuni hui attachment files, dono ko client ki wahi pehle wali "document upload" API (http://servername/api/upload_api_doc.asp) par bhej diya jayega.
Step 5 (Username aur ID): Is baar bhi user ka naam (username) aur ek khaas "document ID" (jo Add-in khud banayega) API ko bheja jayega. API har attachment ko ATT_1, ATT_2, ATT_3 wagaira naam dekar DMS mein save karegi.
Step 6 (Confirmation): API jawab degi ke email aur attachments save ho gayin ya nahi.
3. Teesra Button: "Registar Fatura" (Invoice Register Karein)
Is Button ka Kaam kya hai?
Yeh button khaas taur par bills ya "invoices" (jaise aapko kisi cheez ka bill email mein PDF format mein aata hai) ko save karne ke liye banaya gaya hai. Yeh thoda mukhtalif hai kyunki is mein poori email save nahi hoti, sirf aapki chuni hui invoice file save hoti hai.
Technical Process (Kaise Kaam Karega?):
Step 1 (Attachments ki list dikhana): Jab user is button par click karega, to Add-in email mein lagi hui saari attachments ki ek list "dropdown menu" ki shakal mein dikhayega.
Step 2 (User ki selection): User is list mein se woh attachment chunega jo invoice (bill) hai (maslan, "Invoice_123.pdf").
Step 3 (Attachment nikalna): User ki selection ke baad, Add-in sirf us chuni hui invoice attachment file ka content nikalega. Poori email ko nahi nikalega.
Step 4 (Khaas API ko bhejna): Ab yeh invoice attachment file client ki doosri khaas internet address (API endpoint) par bheji jayegi. Yeh invoice ke liye alag API hai: http://servername/api/upload_api_fact.asp.
Step 5 (Username aur ID): Is baar bhi user ka naam (username) aur ek document ID API ko bheja jayega.
Step 6 (Confirmation): Invoice API jawab degi ke bill save ho gaya ya nahi.
Zaroori Points (Important Details) – Tafseel se Samjhen
1. API Integration (Internet Addresses se Rabta):
Matlab: "API" ka matlab hai "Application Programming Interface". Aasan alfaaz mein, yeh woh khaas "internet addresses" hain jin par aapka Add-in data bhejega aur wahan se jawab hasil karega. Client ne aapko do aise addresses diye hain.
Kaise Istemaal Karein?
http://servername/api/upload_api_doc.asp: Yeh address "Registar Email" aur "Registar Email e Anexos" buttons ke liye istemal hoga. Yani jab aap aam emails ya attachments save karenge.
http://servername/api/upload_api_fact.asp: Yeh address sirf "Registar Fatura" button ke liye istemal hoga. Yani jab aap khaas bills (invoices) save karenge.
Kaam: Aapka Add-in in addresses par "data packets" (files aur information) bhejega.
2. Authentication (Login/Password ki Bajaye):
Matlab: Authentication ka matlab hota hai ke system ko kaise pata chalega ke aap sahi user hain. Aam taur par iske liye username aur password hota hai.
Is Project Mein Kaise? Client ne kaha hai ke koi login system nahi hoga.
Aap kya karenge?
Aap Add-in mein ek "Settings" ka option banayenge (jaisa ke gear icon).
Jab user pehli baar is Add-in ko istemal karega ya jab bhi woh settings badalna chahega, woh is option par click karega.
Ek choti si window khulegi jahan user apna "username" (maslan: shahzad.umar) aur company ke DMS server ka "servername" (maslan: http://dms.mycompany.com) type karke save karega.
Yeh information Add-in apne paas "local storage" mein (yani user ke computer mein) save kar lega.
Har baar jab user koi email ya attachment save karega, to Add-in khud ba khud yeh username aur servername DMS ki API ko bhej dega.
3. Technology (Aap Kaun Se Tools Istemaal Karein):
Matlab: "Technology" ka matlab hai ke aap Add-in banane ke liye kaun se software tools aur languages istemal karenge.
Kaun Se Tools?
React.js: Yeh ek bahut hi modern aur popular JavaScript library hai jisse web-based applications (jaise aapka Add-in bhi browser mein chalta hai) banana bohat aasan ho jata hai. Yeh user interface (buttons, lists, text) banane mein madad karega aur aapka Add-in tez chale ga.
MUI (Material-UI): Yeh React ke liye ek design library hai. Iska kaam hai ke aapke Add-in ke buttons, text fields, aur baqi sab cheezain Google ke "Material Design" jaisi khoobsurat, modern, aur saaf suthri dikhen. Isse aapke Add-in ka user interface (UI) behtareen banega.
4. Platform (Kahan Kahan Chalega):
Matlab: "Platform" ka matlab hai ke aapka Add-in kis-kis jagah par kaam karega.
Kahan Kahan?
Aap jo Add-in banayenge, woh sirf ek Outlook version par nahi, balki har jagah chalega:
Outlook Desktop (Windows): Agar user apne Windows computer par Outlook software istemal karta hai.
Outlook Web (Browser): Agar user koi browser (jaise Chrome, Edge, Firefox) khol kar us mein Outlook ki website (Outlook.com) istemal karta hai.
Outlook for Mac: Agar user Apple Mac computer par Outlook software istemal karta hai.
Yeh har jagah par ek jaisa hi dikhega aur kaam karega.
5. Budget aur Milestones (Kaam aur Paise ki Tarbiyat):
Matlab: Yeh project ke paise aur kaam ke stages ke bare mein hai.
Tafseel:
Is poore project ka total budget $400 hai.
Yeh paise do hisson mein milenge (jise "Milestones" kehte hain):
Milestone 1: $200 aapko project shuru karte waqt (jab offer accept ki thi) mil chuke hain.
Milestone 2: $200 aapko tab milenge jab aap Add-in ka saara kaam mukammal kar lenge, woh theek se chal raha hoga, aur client usko accept kar lega.
Khulasa (Summary) – Ek Line Mein Samajh Len
Aapko ek chota sa Outlook tool banana hai jo users ko Outlook se bahar jaye baghair, unki emails aur attachments ko company ke record system (DMS) mein save karne mein madad karega, bilkul aasan tareeqe se aur ek modern design ke saath. Ismein login ki zaroorat nahi hogi, sirf ek baar settings karni hongi.