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
    
    document.title="All courses by level";
    
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
                    el += "<h3>" + currentLetter + "</h3> <hr>"; 
                    el += "<div class='row'>";
                }
                
                console.log(courses[i].Name);
                
                el += "<div class='col-md-2' id='courseBlock'>";
                el += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                el += "<h3>" + courses[i].Name + "</h3>";
                el += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";
                el += "<p>Category : " + courses[i].Category.Name + "</p>";
                el += "<p>Level : " + courses[i].Level + "</p>";
                el += "<button class='btn' type='button' id='std-btn'></button>";
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
                if (courses[i].Level != "advanced") {
                    break;
                    
                }
                advanced += "<div class='col-md-2' id='courseBlock'>";
                advanced += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                advanced += "<h3>" + courses[i].Name + "</h3>";
                advanced += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";
                advanced += "<p>Category:" + courses[i].Category.Name + "</p>";
                advanced += "<p>Level:" + courses[i].Level + "</p>";
                advanced += "<button class='btn' type='button' id='std-btn'></button>";
                advanced += "</div>";
            }
            
            if (advanced != "") {
                advanced = "<h3>Advanced</h3> <hr> <div class='row'>" + advanced; 
                advanced += "</div>";
            }

             
            for (i; i<courses.length; i++) {
                if (courses[i].Level != "beginner") {
                    break;
                    
                }
                beginner += "<div class='col-md-2' id='courseBlock'>";
                beginner += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                beginner += "<h3>" + courses[i].Name + "</h3>";
                beginner += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";
                beginner += "<p>Category:" + courses[i].Category.Name + "</p>";
                beginner += "<p>Level:" + courses[i].Level + "</p>";
                beginner += "<button class='btn' type='button' id='std-btn'></button>";
                beginner += "</div>";
            }
            
            if (beginner != "") {
                beginner = "<h3>Beginner</h3> <hr> <div class='row'>" + beginner; 
                beginner += "</div>";
            }
            
            
            for (i; i<courses.length; i++) {
                if (courses[i].Level != "intermediate") {
                    break;
                    
                }
                
                intermediate += "<div class='col-md-2' id='courseBlock'>";
                intermediate += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                intermediate += "<h3>" + courses[i].Name + "</h3>";
                intermediate += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";
                intermediate += "<p>Category:" + courses[i].Category.Name + "</p>";
                intermediate += "<p>Level:" + courses[i].Level + "</p>";
                intermediate += "<button class='btn' type='button' id='std-btn'></button>";
                intermediate += "</div>";
            }
            
             if (intermediate != "") {
                intermediate = "<h3>Intermediate</h3> <hr> <div class='row'>" + intermediate; 
                intermediate += "</div>";
            }
 
            el = beginner + advanced + intermediate;      
                    
                    
                    
            console.log(el);
            $("#container").html(el);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}


