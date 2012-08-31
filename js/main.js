//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){

	//Find value of radio button.
	var radiobox = function () {
		var radios = $("input[type='radio']:first");
			for(var i = 0; i<radios.length; i++) {
				if(radios[i].checked) {
					whichCategoryValue = radios[i].val();
				}
			}
	
	}

	
	//Store data
	var storeData = function (key) {
		//No key = new key
		if(!key){
			var id = Math.floor(Math.random()*10000000001);
			}
			else{
				//Existing key will be saved when edited
				id = key;
				}
	
	
		//Get all form field values and store in object
		//Object properties contain array w/from label and input value
		radiobox();
		var item = {};
		item.name = ["Name of Task: ", $('#taskName').val()];
		item.category = ["Category: ", whichCategoryValue];
		item.priorityLevel = ["Priority: ", $('#priorities').val()];
		item.startUp = ["Starting Date of Task: ", $('#taskDate').val()];
		item.ending = ["Ending Date of Task: ", $('#taskEnd').val()];
		item.alertOption = ["Type of Alert: ", $('#alertWay').val()];
		item.note = ["Notes", $('#notes').val()];
	
		//Save data into Local Storage: stringify to convert object to string
		localStorage.setItem(id, JSON.stringify(item));		
		alert("Task Saved!");
		window.location.reload();
	}
	
		//Get data
	var getData = function () {
		toggleContr("on");
		if(localStorage.length === 0) {
			alert("There is no data in storage. Default data has been added.");
			autoFillData();
		}
	}
	
	//Write data from localStorage to browser
	var makeDiv = $("<div></div>").attr("id", "items");
	var makeList = $("<ul></ul>").attr("id", "wholeList");
	makeDiv.child(makeList);
	$('seeHere').child(makeDiv);
	$('items').css("display", "block");
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi = $("<li></li>").attr("id", "listing");
		var linksLi = $("<li></li>");
		makeList.child(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key)
		
		//Convert string from local to object
		var obj = JSON.parse(value);
		var makeSubList = $("<ul></ul>");
		makeLi.child(makeSubList);
			for(var r in obj) {
				makeSubLi = $("<li></li>");
				makeSubList.child(makeSubLi);
				var optSubText = obj[r][0]+" "+obj[r][1];
				makeSubLi.html(optSubText);
				makeSubList.child(linksLi);
			}
			//Create edit and delete for items
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	//Images for categories
	var getImage = function (catName, makeSubList) {
		var imgLi = $("<li></li>");
		makeSubList.child(imgLi);
		var newImg = $("<img></img>").attr("src", "images/"+ catName + ".png");
		imgLi.child(newImg);
	}

	var autoFillData = function () {
		//JSON file is dummy tasks
		for(var n in json){
			var id = Math.floor(Math.random()*10000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//Make edit and delete links for stored items
	var makeItemLinks = function (key, linksLi) {	
		var edit = $("<a></a>").text("Edit Task").href("#");
		edit.on("click", editItem);
		linksLi.child(edit);
		
		//line break
		var breakIt = $("<br></br>");
		linksLi.child(breakIt);
		
		//add delete link
		var deleteIt = $("<a></a>").text("Delete Task").href("#");
		deleteIt.key = key;
		deleteIt.on("click", deleteItem);
		linksLi.child(deleteIt);
	}

	var editItem = function () {
		//grab data
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
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
		editSubmit.on("click", validator);
		editSubmit.key = this.key;		
	}
	
	//Set Link & Submit Click Events
	var displayLink = $('#displayData');
	displayLink.on("click", getData);
	
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
	
	var clearLocal = function () {
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}
		else{
			localStorage.clear();
			alert("All tasks have been cleared.");
			window.location.reload();
			return false;
		}
	
	}
	
	//Variable defaults
	var priorityGroup = ["--Choose Priority Level--","High","Medium","Low"];
	var whichCategoryValue;
	
	displayLink = $('#displayData');
	displayLink.on("click", getData);
	
	var clearLink = $('#clear');
	clearLink.on("click", clearLocal);
	
	var submit1 = $('#submit');
	submit1.on("click", validator);
)};