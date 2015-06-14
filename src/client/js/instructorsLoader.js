$(document).ready(documentReady);

function documentReady(){
    loadInstructors();
}

function loadInstructors(){
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/GetAllInstructors.php", //Relative or absolute path to file.php file
        //data: {instructor:id},
        success: function(response) {
            var instructors=JSON.parse(response);
            var el="";
            var currentLetter = '';
            
            
            for(var i=0;i<instructors.length;i++){
                if (instructors[i].Surname.charAt(0) != currentLetter) {
                    if (currentLetter != '') {
                        el += "</div>";
                        }
                    currentLetter = instructors[i].Surname.charAt(0);
                    el += "<div class='row'>";
                    el += "<div class='col-lg-12'>";
                    el += "<h3 class='page-header' id=\"" +currentLetter + "\"> " + currentLetter + " <a href=\"#\"><small> top</small><small class=\"glyphicon glyphicon-arrow-up\"></small></a></h3>"; 
                    el += "</div>";
                    el += "</div>";
                    el += "<div class='row'>";
                }
                el += "<div class='col-md-6 img-portfolio'>";
                el += "<img src='images/Instructors/" + instructors[i].Name+instructors[i].Surname + ".jpg' height='140' width='110' style='float:left; margin-right:5%'/>";
                el+= "<div class='instructorContainer'>";
                el += "<h3 class='instructorName'>" + instructors[i].Name + " "+ instructors[i].Surname +"</h3>";
                el += "<p class='instructorPosition'>" + instructors[i].Position + "</p>";
                el += "<p>" + instructors[i].Certifications + "</p>";
                
                //el+="<div class='instructorBtn'>";
                el += "<button class='btn' type='button' id='std-btn'                 onclick=\"parent.location='instructor.html?instr=" + instructors[i].Id + "'\" >More Info</button>";
                el += "</div> </div>";
                //el+="</div>";
            }
            $("#container").html(el);
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });

}