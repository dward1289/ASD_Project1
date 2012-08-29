//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){

var validator = function () {
	$('#taskForm').validate();
	}
	
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
				$('#taskForm').css("display", "none");
				$('#clear').css("display", "inline");
				$('#displayData').css("display", "none");
				break;
			case "off":
				$("taskForm").css("display", "block");
				$("clear").css("display", "inline");
				$("displayData").css("display", "inline");
				$("items").css("display", "none");
				
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
	
	
	//Get data function
	var getData = function () {
		toggleContr("on");
		if(localStorage.length === 0) {
			alert("There is no data in storage. Default data has been added.");
			autoFillData();
			}
			
		//Write data from local storage to browser
		var makeDiv = $("<div> </div>").attr("id", "items");
		var makeList = $("<ul> </ul>").attr("id", "wholeList");
		makeDiv.append(makeList);
		var container = $('#seeHere');
		container.append(makeDiv);
		$('#items').css("display", "block");
		for(var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement("li");
			makeLi.setAttribute("id", "listing");
			var linksLi = document.createElement("li");
			makeList.append(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
		
		//Convert string from local to object
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			getImage(obj.priorityLevel[1], makeSubList);
			for(var r in obj) {
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[r][0]+" "+obj[r][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
				
				}
				
				//Create edit and delete buttons for items in local storage
				makeItemLinks(localStorage.key(i), linksLi); 
		}
	}
	
	//Image for categories
	var getImage = function (catName, makeSubList) {
		var imgLi = document.createElement("li");
		makeSubList.appendChild(imgLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imgLi.appendChild(newImg);
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
		var edit = document.createElement('a');
		edit.href = "#";
		edit.key = key;
		var editTxt = "Edit task";
		edit.addEventListener("click", editItem);
		edit.innerHTML= editTxt;
		linksLi.appendChild(edit);
		
		//add line break
		var breakIt = document.createElement("br");
		linksLi.appendChild(breakIt);
		
		//add delete single link
		var deleteIt = document.createElement('a');
		deleteIt.href = "#";
		deleteIt.key = key;
		var deleteTxt = "Delete Task";
		
		deleteIt.addEventListener("click", deleteItem);
		deleteIt.innerHTML= deleteTxt;
		linksLi.appendChild(deleteIt);
		}
	
	var editItem = function () {
		//Grab the data first.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show form again
		toggleContr("off");
		
		//Populate with current
		$('#taskName').value = item.name[1];
		$('#priorities').value = item.priorityLevel[1];
		$('#taskDate').value = item.startUp[1];
		$('#taskEnd').value = item.ending[1];
		$('#alertWay').value = item.alertOption[1];
		$('#notes').value = item.note[1];
		if(item.category[1] == "Home") {
			elId("home").setAttribute("checked", "checked");
			}
		if(item.category[1] == "Business") {
			elId("business").setAttribute("checked", "checked");
					}
		if(item.category[1] == "School") {
			elId("school").setAttribute("checked", "checked");
					}
		
		
		//Remove listener from submit button.
		$('#submit').unbind("click", storeData);
		
		//Change submit value to edit
		//Found helpful code for button at: http://www.permadi.com/tutorial/jsInnerHTMLDOM/index.html
		$('#submit').val("Edit Task");
		
		//Save key value in this function as property of editSubmit, use that value when save edited data.
		$('#submit').bind("click", validator);
		$('#submit').key = this.key;
	}
	
	
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
	
	//Set Link & Submit Click Events
	$('#displayData').bind('click', getData);
	$('#clear').bind('click', clearLocal);
	$('#submit').bind('click', validator);
	
});