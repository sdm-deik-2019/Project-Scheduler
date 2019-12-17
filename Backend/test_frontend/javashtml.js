"use strict"
var as={0:'red',1:'blue',2:'orange',3:'purple',4:'pink'}
var i=-1;
function cc(){
var asdasd=document.getElementById("iddd")
alert("information sent");
}
function loadJsonData() {
     var postdata = JSON.stringify(
         {
             "From": document.getElementById("TxtFrom").value,
             "To": document.getElementById("TxtTo").value,
             "Body": document.getElementById("TxtBody").value
         });
         try {
			 $.support.cors = true;
             $.ajax({
                 type: "POST",
                 url: "http://localhost/1300/simpleserver/",
                 cache: false,
                 data: postdata,
				 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: getSuccess,
                 error: getFail
             });
         } catch (e) {
             alert(e);
         }
         function getSuccess(data, textStatus, jqXHR) {
			 var parentobj=document.getElementById("objects");
			 var node = document.createElement("LI"); 
			 var textnode = document.createTextNode(data.From+","+data.To+","+data.Body); 
			 node.appendChild(textnode);   			 
			 parentobj.appendChild(node);  
             alert(JSON.stringify(data)+" success");
     };
         function getFail(jqXHR, textStatus, errorThrown, xhr) {
             alert(jqXHR.status+" error");
     };
 };
function getdata() 
{
	try{
	$.support.cors = true;
             $.ajax({
                 type: "GET",
                 url: "http://localhost/1300/simpleserver/",
                 cache: false,
                 data: "",
				 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: getSuccessGET,
                 error: getFailGET
	});}
	catch(e)
	{
		alert(e)
	}
	         function getSuccessGET(data, textStatus, jqXHR) {
			 	var parentobj=document.getElementById("objects");
				//clear
			   while (parentobj.firstChild)
				{
					parentobj.removeChild(parentobj.firstChild);
				}
					for(var i=0; i<data.length; i++)
					{
						var node = document.createElement("LI"); 
						var textnode = document.createTextNode(data[i].From+","+data[i].To+","+data[i].Body); 
						node.appendChild(textnode);   			 
					parentobj.appendChild(node);  
					}
			 
             alert(JSON.stringify(data)+" success");
     };
         function getFailGET(jqXHR, textStatus, errorThrown, xhr) {
             alert(jqXHR.status+" error");
     };
} 
