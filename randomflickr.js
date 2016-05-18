//seting up 2 images to load into, don't display until both loaded
//could this be an array?
var imagesloaded=0;
var image1 = new Image();
var image2 = new Image();
image1.onload = function(){
   imagesloaded++;
   if (imagesloaded==2){
	   combo(image1,image2);
	   imagesloaded=0;
   }
};
image2.onload = function(){
   imagesloaded++;
   if (imagesloaded==2){
	   combo(image1,image2);
	   imagesloaded=0;
   }
};


//what to d owhen the json arrives from flickr api
//store in global photosObj
 var jsonFlickrApi =function(thejson){
   photosObj =thejson.photos.photo;
   randomBlend();
 
}


//get 2 random photos and info
//load the images, global the info 
var randomBlend =function(){
	imagesloaded=0;
    var maxPhotos=photosObj.length;
	
	try {
	    var ran1 =Math.floor((Math.random() * maxPhotos) + 1);
	    var ran2 =Math.floor((Math.random() * maxPhotos) + 1);
	    var imagesrc=photosObj[ran1].url_c;
	    var imagesrc1=photosObj[ran2].url_c;
		 owner1=photosObj[ran1].ownername;
		 owner2=photosObj[ran2].ownername;
	}
	catch(err) {
	    var ran1 =Math.floor((Math.random() * maxPhotos) + 1);
	    var ran2 =Math.floor((Math.random() * maxPhotos) + 1);
	
		 
	
	    var imagesrc=photosObj[ran1].url_c;
	    var imagesrc1=photosObj[ran2].url_c;	
		 owner1=photosObj[ran1].ownername;
		 owner2=photosObj[ran2].ownername;
	}
   
	 license1=photosObj[ran1].license;
	 license2=photosObj[ran2].license;
	 owner1Id=photosObj[ran1].owner;
	 owner2Id=photosObj[ran2].owner;
	 photo1Id=photosObj[ran1].id;
	 photo2Id=photosObj[ran2].id;
	
 
    
   
    image1.src=imagesrc;
    image2.src=imagesrc1;
}

var combo=function(img1,img2){
    /*
    var img1 = document.getElementById('img1');
       var img2 = document.getElementById('img2');*/
	//document.getElementById('pic').style.width=Math.min(img1.width,img2.width)+"px";
	//document.getElementById('pic').style.height=Math.min(img1.height,img2.height)+"px";
	
	
   	document.getElementById('pic').style.background="url("+img1.src+"),url("+img2.src+")";
document.getElementById('pic').style.backgroundSize='cover';
	showCredits();
	
	setTimeout(randomBlend, 10000)
}

var showCredits=function(){
	
	var photolink1 = "<a target='new' href='https://flickr.com/photos/"+owner1Id+"/"+photo1Id+"'>view on flickr</a>";
	var photolink2 = "<a target='new' href='https://flickr.com/photos/"+owner2Id+"/"+photo2Id+"'>view on flickr</a>";

	var credits1 ="Photo by: "+owner1+" : "+ get_license_text(license1);
	var credits2 ="Photo by "+owner2+" : "+ get_license_text(license2);
	document.getElementById('licenses').innerHTML=credits1+" "+photolink1+"<br>"+ credits2+" "+photolink2;
	
    
}

var swapmode=function(){
   var e = document.getElementById("mode");
   var mode = e.options[e.selectedIndex].value;
   document.getElementById('pic').style.backgroundBlendMode=mode;
}

document.getElementById('controlwrap').onmouseover = function() {show('controls')};
document.getElementById('controlwrap').onmouseout=function() {hide('controls')};

document.getElementById('info').onclick = function() {
	if(document.getElementById('controls').style.visibility=="hidden"){
		show('controls');
	}else{
		hide('controls');
	}
}
 



function show(id) {
    document.getElementById(id).style.visibility = "visible";
  }
  function hide(id) {
    document.getElementById(id).style.visibility = "hidden";
  }

  /*
  	licenses stuff from @cogdog
  */
  var licenses = new Array( "", "BY-NC-SA", "BY-NC", "BY-NC-ND", "BY", "BY-SA", "BY-ND", "", "PD", "CC0", "PD" );

   function get_license_text( thelicense ) {
   	switch( thelicense ) {
   		case "7":
   			return 'with no copyright restriction (Flickr Commons)';
   			break;
   		case "8":
   			return 'as s United States Government Work ( PD )';
   			break;
   		default:
   			return 'under a Creative Commons (' + licenses[thelicense] + ') license';
   	}
   }
 