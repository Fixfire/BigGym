$(document).ready(documentReady);

function documentReady(){
     //Facebook script setup
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: '1677221109163837',
          xfbml      : true,
          version: 'v2.3' // or v2.0, v2.1, v2.0
        });     
        $('#loginbutton,#feedbutton').removeAttr('disabled');
    });
   $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/FacebookFeed.php", //Relative or absolute path to file.php file
       
        success: function(response) { 
            console.log(JSON.parse(response));
            fillPosts(JSON.parse(response));
        }
 });
}

/*FB Core*/
function fillPosts(response){
    var displaylimit = 4;
    var fbprofile = "bigbiggym";
    var feeds=response.data;
    
    var headerHTML = '';
	var loadingHTML = '';
	headerHTML += '<a href="https://facebook.com/" target="_blank"><img src="images/fb-logo.png" width="40" style="float:left;padding:3px 12px 0px 6px" alt="twitter bird" /></a>';
	headerHTML += '<span style="font-size:13px"><a href="https://facebook.com/'+fbprofile+'" target="_blank">'+fbprofile+'</a></span></h1>';
	loadingHTML += '<div id="loading-container"><img src="images/ajax-loader.gif" width="32" height="32" alt="tweet loader" /></div>';
	
	$('#fb-api').html(headerHTML + loadingHTML);
    
    console.log(fbprofile);
    console.log(feeds);
    console.log(response);
    
    var feedHTML = '';
    var displayCounter = 1;
    for (var i=0; i<feeds.length; i++) {
				var fbscreenname = feeds[i].from.name;
                var status = feeds[i].message; 
				var statusid = feeds[i].id;
                var date=new Date(feeds[i].updated_time);
				console.log(date);
				 
				 //Generate twitter feed HTML based on selected options
				 	if (!(feeds[i].message==undefined) && (displayCounter <= displaylimit)) {             
						
							status = addlinks(status);
						 
						if (displayCounter == 1) {
							feedHTML += headerHTML;
						}
									 
						feedHTML += '<div class="twitter-article" id="tw'+displayCounter+'">'; 										                 
						feedHTML += '<div class="fb-text"><p><span class="tweetprofilelink"><strong><a href="https://facebook.com/'+fbscreenname+'" target="_blank">'+fbscreenname+'</a></strong> </span><br/>'+status+'</p>';
						feedHTML += '</div>';
						feedHTML += '</div>';
						displayCounter++;
					}   
				 
            }
             
            $('#fb-api').html(feedHTML);
    
    //Function modified from Stack Overflow
    function addlinks(data) {
        //Add link to all http:// links within tweets
         data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
            return '<a href="'+url+'"  target="_blank">'+url+'</a>';
        });
             
        //Add link to @usernames used within tweets
        data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
            return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
		//Add link to #hastags used within tweets
        data = data.replace(/\B#([_a-z0-9]+)/ig, function(reply) {
            return '<a href="https://twitter.com/search?q='+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
        return data;
    }
}
