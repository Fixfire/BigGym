$(document).ready(documentReady);

function documentReady(){
    var registration = "Registration fee(una tantum): ";
    var annual = "Fixed annual cost: ";
    var discount = " discount on single course";
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/getRates.php", //Relative or absolute path to file.php file
        success: function(response) {
            var rates=JSON.parse(response);
           
            console.log(JSON.parse(response));
            for(var i=0;i<rates.length;i++){
               switch(rates[i].Type){
                   case "Normal":
                       $("#norm-reg").html(registration+rates[i].Registration+"$");
                       $("#norm-annual").html(annual+rates[i].Annual+"$");
                       break;
                   case "Under25":
                       $("#25-reg").html(registration+rates[i].Registration+"$");
                       $("#25-annual").html(annual+rates[i].Annual+"$");
                       break;
                   case "Over60":
                       $("#60-reg").html(registration+rates[i].Registration+"$");
                       $("#60-annual").html(annual+rates[i].Annual+"$");
                       break;
                   case "UniversityStudents":
                       $("#discount").html(rates[i].Discount+"%"+discount);
                       break;
               }
            }
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}