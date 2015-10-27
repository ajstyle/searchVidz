
//Searchbar Handler 
$(function()
{
   var searchField  = $('#query') ; 
   var icon = $('#search-btn');

//Focus Handler 

$(searchField).on('focus',function(){

$(this).animate( {

   width : '100%'  
     },400) ; 

$(icon).animate({

right : '10px' 
},400);



});

//Blur Event Handler 

$(searchField).on('blur',function(){

if(searchField.val() == '')
{
	$(searchField).animate({
          width : '45%' 
	},400,function(){});

	$(icon).animate({
		right: '380px'
		},400, function() {} );
		/* stuff to do after animation is complete */
}
	});

$('#search-form').submit(function(e){ 

       e.preventDefault();

}); 

});


function search()
{
     //clear Result 
   
   $('#results').html('');
   $('#buttons').html('');

   //GEt Form Input
 q = $('#query').val() ; 

 //Run Get Request on api 
 $.get(
   "https://www.googleapis.com/youtube/v3/search",{

   	part : 'snippet , id ' ,
   	q : q ,
   	type : 'video' , 
    key : 'AIzaSyC_rwO9XUvk8m7PqJ9PXE97-0iWXo1WKBE' 
} ,   

    function(data){
    	var nextPageToken = data.nextPageToken ; 
        var prevPageToken = data.prevPageToken ; 
        
       //Log data 
        console.log(data);

       $.each(data.items , function(i , item){

       	//Get output
    console.log(i);
       	var output = getOutput(item);

       	//Display results 
       	
$('#results').append(output) ;  
       	
           
       }) ; 

    var buttons =  	getButtons(nextPageToken , prevPageToken ) ; 

    //Display Buttons 
    $('#buttons').append(buttons);


    
    


    
 	});
}

//Next page 
function nextPage()
{
	 
 
var token = $('#next-button').data('token');
var q = $('#next-button').data('query');

	 //clear Result 
   
   $('#results').html('');
   $('#buttons').html('');

   //GEt Form Input
 q = $('#query').val() ; 

 //Run Get Request on api 
 $.get(
   "https://www.googleapis.com/youtube/v3/search",{

   	part : 'snippet , id ' ,
   	q : q ,
   	pageToken : token ,
   	type : 'video' , 
    key : 'AIzaSyC_rwO9XUvk8m7PqJ9PXE97-0iWXo1WKBE' 
} ,   

    function(data){
    	var nextPageToken = data.nextPageToken ; 
        var prevPageToken = data.prevPageToken ; 
        
       //Log data 
        console.log(data);

       $.each(data.items , function(i , item){

       	//Get output

       	var output = getOutput(item);

       	//Display results 
       	
$('#results').append(output) ;  
       	
           
       }) ; 

    var buttons =  	getButtons(nextPageToken , prevPageToken ) ; 

    //Display Buttons 
    $('#buttons').append(buttons);

 	});

}


function prevPage()
{
	 
 
var token = $('#prev-button').data('token');
var q = $('#prev-button').data('query');

	 //clear Result 
   
   $('#results').html('');
   $('#buttons').html('');

   //GEt Form Input
 q = $('#query').val() ; 

 //Run Get Request on api 
 $.get(
   "https://www.googleapis.com/youtube/v3/search",{

   	part : 'snippet , id ' ,
   	q : q ,
   	pageToken : token ,
   	type : 'video' , 
    key : 'AIzaSyC_rwO9XUvk8m7PqJ9PXE97-0iWXo1WKBE' 
} ,   

    function(data){
    	var nextPageToken = data.nextPageToken ; 
        var prevPageToken = data.prevPageToken ; 
        
       //Log data 
        console.log(data);

       $.each(data.items , function(i , item){

       	//Get output

       	var output = getOutput(item);

       	//Display results 
       	
$('#results').append(output) ;  
       	
           
       }) ; 

    var buttons =  	getButtons(nextPageToken , prevPageToken ) ; 

    //Display Buttons 
    $('#buttons').append(buttons);


    
    


    
 	});

}


































//Build getOutput Function 
 

 function getOutput(item)
 {
 	var videoId = item.id.videoId ; 
 	var title = item.snippet.title ; 
 	var desc = item.snippet.description ; 
 	var thumb = item.snippet.thumbnails.high.url ; 
 	var channelTitle = item.snippet.channelTitle ; 
 	var videoDate = item.snippet.publishedAt ; 
    
    //Build Output string 
   
    var output = '<li>' +
    '<div class = "list-left">'+'<img src = "'+thumb+'">' + 
     '</div>' + 
     '<div class = "list-right">' + 
     '<h3><a class = "fancybox fancybox.iframe" href = "http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
     '<small>By <span class = "cTitle">'+channelTitle+'</span> on '+videoDate+' </small> ' +
     '<p>'+desc+'</p> '  +
     '</div>' + 
     '</li>'+
     '<div class = "clearfix"></div>' + 
     '' ; 

       return output ; 

      

}

//Build the Buttons
function getButtons(nextPageToken , prevPageToken)
{
    if(!prevPageToken)
    {
    	var btnoutput = '<div class = "button-container">'+
    	'<button id = "next-button" class = "paging-button" data-token = "'+nextPageToken+'" data-query = "'+q+'"' + 
        'onclick="nextPage();">Next Page</button></div>';
    }
    else 
    {
       var btnoutput = '<div class = "button-container">' + 
     ' <button id = "prev-button" class = "paging-button" data-token = "'+prevPageToken+'" data-query = "'+q+'"' + 
     'onclick =  "prevPage();">Prev Page</button>' +
  
     ' <button id = "next-button" class = "paging-button" data-token = "'+nextPageToken+'" data-query = "'+q+'"' + 
     'onclick =  "nextPage();">Next Page</button></div> ' ;	
    }
      return btnoutput ; 
}        