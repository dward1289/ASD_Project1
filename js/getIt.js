//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){

	//getElementById function
	var elId = function (n) {
		var theElement = document.getElementById(n);
		return theElement;
	}
	
	
	//Find value of selected radio button.
	var radiobox = function () {
		var radios = document.forms[0].whichCategory;
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked) {
				whichCategoryValue = radios[i].value;
				}
			}
		}
	
	
	
	var toggleContr = function (n) {
		switch(n) {
			case "on":
				$('#displayData2').css("display", "none");
				break;
			case "off":
				$('#displayData2').css("display", "inline");
				$('#items').css("display", "none");
				
				break;
			default:
				return false;
				}
			}
			
	
	//Store data function
	var storeData = function (key) {
		//No key = new key
		if(!key){
			var id = Math.floor(Math.random()*10000000001);
			}
			else{
				//Existing key will be saved when edited
				id = key;
				}
	}
	
	
	//Get data function
	var getData = function () {
		toggleContr("on");
		if(localStorage.length === 0) {
			alert("There is no data in storage. Default data has been added.");
			autoFillData();
			}
			
		//Write data from local storage to browser
		var makeDiv = $("<div></div>").attr("id", "items");
		var makeList = $("<ul></ul>").attr("id", "wholeList");
		makeDiv.html(makeList);
		$('#seeHere').html(makeDiv);
		$('#items').css("display", "block");
		for(var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = $("<li></li>").attr("id", "listing");
			var linksLi = $("<li></li>");
			makeList.append(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
		
		//Convert string from local to object
			var obj = JSON.parse(value);
			var makeSubList = $("<ul></ul>");
			makeLi.append(makeSubList);
			getImage(obj.priorityLevel[1], makeSubList);
			for(var r in obj) {
				var makeSubLi = $("<li></li>");
				makeSubList.append(makeSubLi);
				var optSubText = obj[r][0]+" "+obj[r][1];
				makeSubLi.html(optSubText);
				makeSubList.append(linksLi);
				
				}
				
				//Create edit and delete buttons for items in local storage
				makeItemLinks(localStorage.key(i), linksLi); 
		}
	}
	
	//Image for categories
	var getImage = function (catName, makeSubList) {
			var imgLi = $("<li></li>");
		makeSubList.html(imgLi);
		var newImg = $("<img></img>").attr("src", "images/"+ catName + ".png");
		imgLi.html(newImg);
	}
	
	
	var autoFillData = function () {
		//JSON object comes from json.js, storing it in local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*10000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//Make edit and delete buttons for each stored item
	var makeItemLinks = function (key, linksLi) {
		//add edit single item link
		var edit = $("<a></a>").attr("href", "#").text("Edit Task");
		edit.key = key;
		edit.on("click", editItem);
		linksLi.html(edit);
		
			//add line break
		var breakIt = $("<br></br>");
		linksLi.html(breakIt);
		
		//add delete single link
		var deleteIt = $("<a></a>").attr("href", "#").text("Delete Task");
		deleteIt.key = key;
		
		deleteIt.on("click", deleteItem);
		linksLi.html(deleteIt);

		}
	
	var editItem = function () {
		//Grab the data first.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show form again
		toggleContr("off");
		
		//populate form
		$('#taskName').val(item.name[1]);
		$('#priorities').val(item.priorityLevel[1]);
		$('#taskDate').val(item.startUp[1]);
		$('#taskEnd').val(item.ending[1]);
		$('#alertWay').val(item.alertOption[1]);
		$('#notes').val(item.note[1]);
		if(item.category[1] == "Home") {
			$('#home').attr("checked", "checked");
			}
		if(item.category[1] == "Business") {
			$('#business').attr("checked", "checked");
					}
		if(item.category[1] == "School") {
			$('#school').attr("checked", "checked");
					}
		
		

		
		var editSubmit = $('#submit');
		editSubmit.on("click", validate);
		editSubmit.key = this.key;	
	}
		
	//Set Link & Submit Click Events
	var displayLink2 = $('#displayData2');
	displayLink2.on("click", getData);
	
	var deleteItem = function () {
		var ask = confirm("Are you sure you want to delete this task?");
		alert("Task deleted.");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}
		else{
			alert("Task not deleted.");
			window.location.reload();
			return false;
		}
	}
	
});