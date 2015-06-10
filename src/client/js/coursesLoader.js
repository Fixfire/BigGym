$(document).ready(documentReady);

var ordering;
function documentReady(){
    console.log("I'm ready");
    ordering = "level";
    createLink();
    loadCoursesAlphabet();
}


function createLink() {
    $("#link").html("Order by " + ordering);
}


function reorder() {
    if (ordering == "level") {
        ordering = "alphabet";
        loadCoursesLevel();
    } else {
        ordering = "level";
        loadCoursesAlphabet();
    }
    createLink();
}

function loadCoursesAlphabet(){

    console.log("Loading courses");
    
    document.title="All courses by alphabet";
    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "../../server/getAllCourses_alphabet.php", //Relative or absolute path to file.php file
        success: function(response) {
            console.log(JSON.parse(response));
            var courses = JSON.parse(response);
            var el = "";
            var currentLetter = '';
            for (var i=0; i<courses.length; i++) {
                if (courses[i].Name.charAt(0) != currentLetter) {
                    if (currentLetter != '') {
                        el += "</div>";
                        }
                    currentLetter = courses[i].Name.charAt(0);
                    el += "<div class='row'>";
                    el += "<div class='col-lg-12'>"; 
                    el += "<h3 class='page-header' id=\"" +currentLetter +" \"> " + currentLetter + "</h3>"; 
                    el += "</div>";
                    el += "</div>";
                    el += "<div class='row'>";
                }
                
                console.log(courses[i].Name);
                
                el += "<div class='col-md-4' img-portfolio>";
                el += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                el += "<h3>" + courses[i].Name + "</h3>";
                el += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";
                el += "<p>Category: " + courses[i].Category + "</p>";
                el += "<p>Level: " + courses[i].Level + "</p>";

                el += "<button onclick=\"parent.location='course.html?name="+courses[i].Name+"'\"class='btn' type='button' id='std-btn'>More Info</button>";
                el += "</div>";
            }
            el += "</div>";
            console.log(el);
            $("#container").html(el);
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}


function loadCoursesLevel(){

    console.log("Loading courses");
    
    document.title="All courses by level";
    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "../../server/getAllCourses_level.php", //Relative or absolute path to file.php file
        success: function(response) {
            console.log(JSON.parse(response));
            var courses = JSON.parse(response);
            var el = "";
            var intermediate = "";
            var advanced = "";
            var beginner = "";
            var i=0;
            
            
            

             
            for (i=0; i<courses.length; i++) {
                if (courses[i].Level != "beginner") {
                    break;
                    
                }
                beginner += "<div class='col-md-4'>";
                beginner += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                beginner += "<h3>" + courses[i].Name + "</h3>";
                beginner += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";

                beginner += "<p>Category: " + courses[i].Category + "</p>";
                beginner += "<p>Level: " + courses[i].Level + "</p>";

                beginner += "<button onclick=\"parent.location='course.html?name="+courses[i].Name+"'\"class='btn' type='button' id='std-btn'>More Info</button>";
                beginner += "</div>";
               
            }
            
            if (beginner != "") {
                var header="";
                beginner += "</div>";
                header = "<div class='row'>";
                header += "<div class='col-lg-12'>";
                header += "<h3 class='page-header'>Beginner</h3> "; 
                header += "</div>";
                header += "</div>";
                header += "<div class='row'>";
                beginner = header+ beginner;
            }
            
            
            for (i; i<courses.length; i++) {
                if (courses[i].Level != "intermediate") {
                    break;
                    
                }
                
                intermediate += "<div class='col-md-4'>";
                intermediate += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                intermediate += "<h3>" + courses[i].Name + "</h3>";
                intermediate += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";
                intermediate += "<p>Category: " + courses[i].Category + "</p>";
                intermediate += "<p>Level: " + courses[i].Level + "</p>";

                intermediate += "<button onclick=\"parent.location='course.html?name="+courses[i].Name+"'\"class='btn' type='button' id='std-btn'>More Info</button>";
                intermediate += "</div>";
                
            }
            
             if (intermediate != "") {
                var header="";
                intermediate += "</div>";
                header = "<div class='row'>";
                header += "<div class='col-lg-12'>";
                header += "<h3 class='page-header'>Intermediate</h3> "; 
                header += "</div>";
                header += "</div>";
                header += "<div class='row'>";
                intermediate = header+ intermediate;
            }
            
            for (i; i<courses.length; i++) {
                if (courses[i].Level != "advanced") {
                    break;
                    
                }
                advanced += "<div class='col-md-4'>";
                advanced += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                advanced += "<h3>" + courses[i].Name + "</h3>";
                advanced += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";

                advanced += "<p>Category: " + courses[i].Category + "</p>";
                advanced += "<p>Level: " + courses[i].Level + "</p>";

                advanced += "<button onclick=\"parent.location='course.html?name="+courses[i].Name+"'\"class='btn' type='button' id='std-btn'>More Info</button>";
                advanced += "</div>";
                
            }
            
            if (advanced != "") {
                var header="";
                advanced += "</div>";
                header = "<div class='row'>";
                header += "<div class='col-lg-12'>";
                header += "<h3 class='page-header'>Advanced</h3> "; 
                header += "</div>";
                header += "</div>";
                header += "<div class='row'>";
                advanced = header+ advanced;
            }
 
            el = beginner + intermediate + advanced;      
                    
                    
                    
            console.log(el);
            $("#container").html(el);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}


