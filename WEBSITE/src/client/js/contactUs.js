$(document).ready(documentReady);

function documentReady(){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/getContacts.php", //Relative or absolute path to file.php file
        success: function(response) {
            console.log(JSON.parse(response));
            var contacts=JSON.parse(response);
            var el="";
            
            for(var i=0;i<contacts.length;i++){
                el+="<tr>";
                el+="<td>";
                el+=contacts[i].Name;
                el+="</td>";
                el+="<td>";
                el+="<a href='mailto:"+contacts[i].Email+"'>"+contacts[i].Email+"</a>";
                el+="</td>";
                el+="<td>";
                el+=contacts[i].Tel;
                el+="</td>";
                el+="</tr>";
            }
            $("tbody").html(el);
        1},
    });
}