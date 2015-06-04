$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    loadInstructors();
}

function loadInstructors(){
    console.log("Loading all instructotrs...");
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/getAllInstructors.php", //Relative or absolute path to file.php file
        //data: {instructor:id},
        success: function(response) {
            console.log(JSON.parse(response));
            var instructors=JSON.parse(response);
            var el="";
            var currentLetter = '';
            
            
            for(var i=0;i<instructors.length;i++){
                if (instructors[i].Surname.charAt(0) != currentLetter) {
                    if (currentLetter != '') {
                        el += "</div>";
                        }
                    currentLetter = instructors[i].Surname.charAt(0);
                    el += "<h3>" + currentLetter + "</h3> <hr>"; 
                    el += "<div class='row'>";
                }
                console.log(instructors[i].Name);
                el += "<div class='col-md-4' id='instructorBlock'>";
                el += "<img src='images/Instructors/" + instructors[i].Name+instructors[i].Surname + ".jpg' height='140' width='110' style='float:left; padding-right: 10px'/>";
                el+= "<div class='instructorContainer'>";
                el += "<h3 class='instructorName'>" + instructors[i].Name + " "+ instructors[i].Surname +"</h3>";
                el += "<p class='instructorPosition'>" + instructors[i].Position + "</p>";
                el += "<p>" + instructors[i].Certifications + "</p>";
                el+="</div>";
                el+="<div class='instructorBtn'>";
                el += "<button class='btn' type='button' id='std-btn'                 onclick=\"parent.location='instructor.html?instr=" + instructors[i].Id + "'\" >More Info</button>";
                el += "</div> </div>";
            }
            $("#container").html(el);
            console.log(el);
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });

}