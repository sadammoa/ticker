var day_txt = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var month_txt = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
var wwo_api_key = "1dc62aa250664e5ea6c181443161908";
var wwo_tz_api_key = "1dc62aa250664e5ea6c181443161908";
var wwo_zip_code = "55425";
var hourAdjust = 0;

//function getWeather() {
	//var lastWeather = localStorage.getItem('lastWeather');
	
	//if (lastWeather && Date.now() < lastWeather) {
		//console.log('dont need weather yet')
		//displayWeather(JSON.parse(localStorage.getItem('weatherJson')))
		//return
	//}
		
	 //$.get("https://api.openweathermap.org/data/2.5/forecast?id=5018739&units=imperial&appid=9b553bddc8f2890875e0441f19e28e46",function(r) {
		//weatherGrabbed = new Date();
		//localStorage.setItem('lastWeather', weatherGrabbed.setMinutes(weatherGrabbed.getMinutes() + 30))
		//localStorage.setItem('weatherJson', JSON.stringify(r))
		//displayWeather(r)
	//},"json");
//}

//function displayWeather(r) {
	//$('.weather_box').remove();
	//var totalDays = 0
	//var lastDay,currentDay,highTemp,icon
	//for (var t in r.list) {
		//if (totalDays >= 5) break
		//item = r.list[t]
		//today = item.dt_txt.split(' ')
		//currentDay = today[0]
		//if (!lastDay) lastDay = currentDay
		//if (today[1] == "12:00:00") icon = item.weather[0].icon
		//if (lastDay != currentDay) {
			//split_date = lastDay.split('-');
			//totalDays++
			//var day = new Date(split_date[0],split_date[1]-1,split_date[2]);
			//var output = '<div class="weather_box">';
			//output += '<div class="day">'+(totalDays==1 ? "Today" : day_txt[day.getDay()] )+'</div>';
			//output += '<span class="temp high">'+Math.ceil((highTemp ? highTemp : item.main.temp_max))+'<sup><span class="deg">&deg;</span>F</sup></span>';
			//output += '<img src="icons/new/wthr-'+(icon ? icon : item.weather[0].icon)+'.png">';
			//output += '</div>';
			//$('#weather_container').append(output);
			//highTemp = null			
			//icon = null			
		//}
		//highTemp = (!highTemp || highTemp < item.main.temp_max ? item.main.temp_max : highTemp)
		
		//lastDay = currentDay
	//}	
//}

function getDate() {
	var today_date = new Date();
	$('#date_container').html('<span>'+day_txt[today_date.getDay()]+' '+month_txt[today_date.getMonth()]+' '+today_date.getDate()+', '+today_date.getFullYear()+'</span>');
}
function getTime() {
	var today_date = new Date();
	var getHours = today_date.getHours() + hourAdjust;
	var hour = (getHours > 12) ? getHours - 12 : getHours;  // get hours
	var minutes = (today_date.getMinutes().toString().length == 1) ? "0"+today_date.getMinutes().toString() : today_date.getMinutes();  // get hours
	var am_pm = (getHours >= 12) ? " P.M." : " A.M.";  // get AM/PM
	$('#time_container').html('<span class="inner">'+hour+':'+minutes+'<span class="ampm">'+am_pm+'</span></span>');
}


//commented out
//getWeather();
//displayEvents();
getDate();
getTime();
setInterval(function(){
	getWeather();
},30000*60);
function startTime() {
	setInterval(function(){
		getTime();
	},400*60);
}
setInterval(function(){
	getDate();
},10000*60);
//commented out
//$.get("https://api.worldweatheronline.com/premium/v1/tz.ashx?q="+wwo_zip_code+"&key="+wwo_tz_api_key+"&format=json&date=today",function(r) {
	//var today_dtime = new Date(r.data.time_zone[0].localtime);
	//var local_date = new Date();
	//var hoursDiff = (today_dtime - local_date) / 36e5;
	//if (hoursDiff > .80) {
		//console.log('adjustment +1');
		//hourAdjust = 1;
	//} else if (hoursDiff < -.80) {
		//console.log('adjustment -1');
		//hourAdjust = -1;
	//}
	//getTime();
	//startTime();
//}).fail(function(){
	//getTime();
	//startTime();
//});

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}



var feed = "https://moaapi.net/resttest";

$.ajax(feed, {
    accepts: {
        xml: "application/rss+xml"
    },
    dataType: "xml",
    success: function (data) { 
        var output = '<div class ="weather_box"> <h3>';
        $(data).find("item").each(function () { // or "item" or whatever suits your feed
            var el = $(this);
            
             
            output += '<span class="day">'; /*var output = '<div class="weather_box">';*/// trying to change this to the #weather_box 
			//commented out switch for mall opening hours
			
            output += el.find("title").text() + '<br/><br/><br/>'; //'<br>  06/06/2018-0/06/2018 <br>Start: 10:00 AM <br>End: 10:30 PM </div>' ;
            var dater = el.find("field_event_date_range").text();
			
			/*            var output = '<div class="weather_box">';
            output += '<div class="day">'+(totalDays==1 ? "Today" : day_txt[day.getDay()] )+'</div>';
            output += '<span class="temp high">'+Math.ceil((highTemp ? highTemp : item.main.temp_max))+'<sup><span class="deg">&deg;</span>F</sup></span>';
            output += '<img src="icons/new/wthr-'+(icon ? icon : item.weather[0].icon)+'.png">';
            output += '</div>';
            $('#weather_container').append(output);*/
			var date11 = new Date(dater.slice(0, 4), dater.slice(5, 7)-1 , dater.slice(8, 10));
			var beginDate = new Date(dater.slice(0, 4),dater.slice(5, 7)-1,dater.slice(8, 10),dater.slice(11, 16));

			//var endDate = new Date(dater.slice())
			/*console.log("THIS Begin date:",beginDate.toString());  */
			//console.log("0-4:::::",dater.slice(0,4)); /*year1*/
			//console.log("5,7:::::",dater.slice(5,7));   /*month1*/
			//console.log("8,10:::::",dater.slice(8,10)); /*day1*/
			//console.log("11,16:::::",dater.slice(11,16));    /*time1*/ 
			//console.log("17,18:::::",dater.slice(17,18));	/*hyphen*/
			//console.log("19,23:::::",dater.slice(19,23)); /*year2*/
			//console.log("24,26:::::",dater.slice(24,26)); /*month2*/
			//console.log("27,29:::::",dater.slice(27,29)); /*day2*/
			//console.log("30,35:::::",dater.slice(30,35)); /*time2*/
			//console.log("11,13:::::",dater.slice(11,13)); /* hr1*/
			//console.log("timehr2:::::",dater.slice(30,32)-12+dater.slice(32,36)); /*time2-12hrformat*/
			//console.log("timehr1:::::",dater.slice(11,13)-12+dater.slice(13,17)); /*time1-12hrformat*/
			//console.log("date1::::::",dater.slice(5,7)+'/'+dater.slice(8,10)+'/'+ dater.slice(0, 4));
			//console.log("date2::::::",dater.slice(24,26)+'/'+dater.slice(27,29)+'/'+ dater.slice(19,23));
			console.log("timefull:::::",dater.slice(11,16)+"-"+dater.slice(30,35));

		


			var date1 = /*new Date*/(dater.slice(5,7)+'/'+ dater.slice(8,10)+ '/'+ dater.slice(0, 4));
			var date11 = new Date (dater.slice(5,7)+'/'+ dater.slice(8,10)+ '/'+ dater.slice(0, 4));
            var date2 = dater.slice(22, 32);
			var date22 = /*new Date*/(dater.slice(24,26)+'/'+ dater.slice(27,29)+'/'+ dater.slice(19,23));
			var date222= new Date (dater.slice(24,26)+'/'+ dater.slice(27,29)+'/'+ dater.slice(19,23));
            var time1 = dater.slice(11,16);
			var time2 = dater.slice(30,35);
			var timehr1 = dater.slice(11,13) /*+ dater.slice(13,17)*/;
			var timehr2 = dater.slice(30,32) /*+ dater.slice(32,36)*/;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() ; //January is 0!
			var yyyy = today.getFullYear();
			var dateRange = "";
			var dateoverride = el.find("field_event_time_overrride").text();
			

			//timehr1 = timehr1 >= 12 ? timehr1 -12 + dater.slice(13,17) + "PM" : timehr1 + dater.slice(13,17) + "AM"; // 12hr format AMPM for hr1
			//timehr2 = timehr2 >= 12 ? timehr2 -12 + dater.slice(32,36)  + " PM" : timehr2 + dater.slice(32,36) + " AM"; // 12hr format AMPM for hr2
			if (timehr1 = "10") {

				timehr1 =dater.slice(11,13);
			}
			else if (timehr1 = "12") {
				timehr1 = dater.slice(11,13);
			}
			else timehr1.replace ("0","");

			if (timehr2 = "10") {
				timehr2 = dater.slice(30,32);
			}
			else if (timehr2 = "12") {
				timehr2 = dater.slice(30,32);
			}

			else timehr2= timehr2.replace ("0","");

			timehr1 = timehr1 >= 12 ? timehr1 -12 + dater.slice(13,17)  + "PM" : timehr1 + dater.slice(13,17) + "AM"; // 12hr format AMPM for hr1
			timehr2 = timehr2 >= 12 ? timehr2  -12 + dater.slice(32,36)   + " PM" : timehr2 + dater.slice(32,36) + " AM"; // 12hr format AMPM for hr2

			/*if (timehr1 > 12) {
				timehr1 = timehr1 -12 + dater.slice(13,17) + "PM";
			}
			else if ( timehr1 < 12) {
				timehr1 = timehr1 + dater.slice(13,17) + "AM";
			}
			else  (timehr1=="12") = 12 + dater.slice(13,17) + "PM"

			switch (true){
			
				case (timehr1 > 12) :
					timehr1 = timehr1 -12 + dater.slice(13,17) + "PM";

				case ( timehr1 < 12) :
					timehr1 = timehr1 + dater.slice(13,17) + "AM";
				
				case (timehr1 == 12 ):
					timehr1= 12 + dater.slice(13,17) + "PM"
			}*/

			
			/*if (timehr1 = "0:00PM") {
				timehr1 = dater.slice(11,13) + dater.slice(13,17) + "PM";
			}
			else timehr1 == timehr1;

			if (timehr2 = "0:00PM") { 
				timehr1 = dater.slice(30,32) + dater.slice(32,36)  + "PM"; 
			}
			else timehr2 == timehr2;*/
			
            //commented out
            //alert(dater + "===" + date11);
            if (dd < 10) {
                dd = '0' + dd
            }
			mm=mm+1;
            if (mm < 10) {
                mm = '0' + mm
            }
			
            today = mm + '/' + dd + '/' + yyyy;
			today = new Date(mm, dd, yyyy,0,0,0,0);
			today = new Date();
			//alert(date222);

			console.log("date11::::::::",date11);
			console.log("date222::::::::", date222);
			if (date11 <= today && today <= date222 ) {
                dateRange = "TODAY!      " ;
			    dateRange.replace("-",".");
				//time1 += timehr1 + ":00";
				//time2 += timehr2 + ":00";
				dateRange += timehr1 + " - " + timehr2 + "     ";
				dateRange.replace("-","");
				dateRange.replace("-","");
            
			} 

			else if (date1 == date22 ) {
                dateRange = /*dateRange +  + */ date1;
                //dateRange.replace("-", ".")
			} 

			else dateRange = date1 + " - " + date22;

			/*if (typeof dateoverride = string) {

				dateRange = dateoverride;
			}
			else if (dateoverride = undefined) {
				dateoveride = " "; }

			else dateRange= dateRange;*/


			/*switch (today) {
			
			case (date1 <= today && today <= date22) :

			dateRange = "TODAY!<br/>";
			dateRange.replace("-",".");
			//time1 += timehr1 + ":00";
			//time2 += timehr2 + ":00";
			dateRange += timehr1 + " - " + timehr2 + '<br/><br/><br/>';
			dateRange.replace("-","");
			dateRange.replace("-","");
				break;
			case (dateoverride = "undefined"):
			dateoveride = "";
				break;
			case (typeof dateoverride === "ReferenceError"):
			dateoverride = "";
				break;
			case (typeof dateoverride === "string"):
			dateRange = dateoverride;
				break;
			case (date1 == date2):
			dateRange = dateRange + date1;
				break;
			default: dateRange = date1 + "- <br/>" + date2; 
			}*/

			console.log("switch case output:::::::", dateRange );




			//output += date1 + date22 + time1 +"-" +time2;
			console.log("type of::::::::::", typeof dateoverride);
			console.log("timehr1::::::::::", timehr1);
			console.log("timehr2::::::::::", timehr2);
			//console.log("dateRangelast::::::::::", dateRange);
			//console.log("today::::::::::", today);
			
			output += dateoverride;
			output += dateRange;
			output += el.find("field_date_time_override").text() + '<br/><br/><br/>';
            //commented out
            //output += '<span class="temp high">' + "04/26/2018" + '</span>';
           // output += '<img src="' + el.find("url").text() +'" height="20" width="20">';
           
           // commented out//
            //output = "<h3>hello<br />goodbye<br />hello<br />goodbye<br />hello<br />goodbye<br /></h3>";
            //output += '</span></br></br><span class="day">________________<br/><br/></span>';
            //$('#weather_container').append(output);


		});
        output += "</h3></div>"; 
		$('#weather_container').append(output);
		
	}
	
});






