var List = (function () {

	var List = function (object) {
		this.id = guid();
		this.name = object.name;
		this.items = [];
		this.createddate = new Date();
		this.updateddate = new Date();
		this.renderList();
		this.renderSummary();
	};

	List.prototype.addItem = function (content) {
		var item = new Item({content: content, complete: false, listid: this.id});
		this.items.push(item);
		this.updateddate = new Date();
		this.addItemToList(item);
		this.updateCount();
	}

	List.prototype.removeItem = function (itemid) {
		var temp = this.items;

		console.log(temp);

		for (i = 0; i < temp.length; i++) {
			if(temp[i].id === itemid) {
				temp.splice(i, 1);
			}
		}

		console.log(temp);

		this.items = temp;
		this.removeItemFromList(itemid);
		this.updateCount();
	}

	List.prototype.updateItemContent = function (itemid, content) {
		var temp = this.items;

		for (i = 0; i < temp.length; i++) {
			if(temp[i].id === itemid) {
				temp[i].content = content;
			}
		}

		this.items = temp;
		console.log(this.items);
	}

	List.prototype.setItemAsComplete = function (itemid, status) {
		var temp = this.items;

		for (i = 0; i < temp.length; i++) {
			if(temp[i].id === itemid) {
				temp[i].complete = status;
			}
		}

		this.items = temp;
		console.log(this.items);

		this.updateItemStatus(itemid, status);
	}

	List.prototype.getStatusByTag = function (tag) {
		var temp = this.items;
		var displayArrayActive = [];
		var displayArrayCompleted = [];

		if (tag === "active") {
			for (i = 0; i < temp.length; i++) {
				if(!temp[i].complete) {
					displayArrayActive.push (temp[i].id);
				}
			}

			this.renderStatusByTag(displayArrayActive);
		} else if (tag === "completed") {
			for (i = 0; i < temp.length; i++) {
				if(temp[i].complete) {
					displayArrayCompleted.push (temp[i].id);
				}
			}

			this.renderStatusByTag(displayArrayCompleted);
		} else {
			for (i = 0; i < temp.length; i++) {
				$('.item-box[data-id="'+temp[i].id+'"]').style.display = "block";
			}
		}
	}

	List.prototype.renderStatusByTag = function (array) {
		if(array && array.length > 0) {
			var temp = this.items;

			for (i = 0; i < temp.length; i++) {
				$('.item-box[data-id="'+temp[i].id+'"]').style.display = "none";
			}

			for (i = 0; i < array.length; i++) {
				$('.item-box[data-id="'+ array[i] +'"]').style.display = "block";
			}

		}
	};

	List.prototype.renderList = function () {
		var listBox = document.createElement("div");
		var listBoxClassAttribute = document.createAttribute("class");
		listBoxClassAttribute.value = "list-box";
		listBox.setAttributeNode(listBoxClassAttribute);

		var listBoxTitle = document.createElement("input");

		var listBoxTitlePlaceHolderAttribute = document.createAttribute("placeholder");
		listBoxTitlePlaceHolderAttribute.value = "Write things you want to do?";
		listBoxTitle.setAttributeNode(listBoxTitlePlaceHolderAttribute);

		var listBoxTitleClassAttribute = document.createAttribute("class");
		listBoxTitleClassAttribute.value = "list-box-new-item";
		listBoxTitle.setAttributeNode(listBoxTitleClassAttribute);

		var listBoxDataIDValueAttribute = document.createAttribute("data-id");
		listBoxDataIDValueAttribute.value = this.id;
		listBoxTitle.setAttributeNode(listBoxDataIDValueAttribute);

		listBox.appendChild(listBoxTitle);

		var listBoxItemHolder = document.createElement("div");

		var listBoxItemHolderID = document.createAttribute("id");
		listBoxItemHolderID.value = "list-box-items";
		listBoxItemHolder.setAttributeNode(listBoxItemHolderID);
		listBox.appendChild(listBoxItemHolder);


		var listBoxSummaryHolder = document.createElement("div");

		var listBoxSummaryHolderID = document.createAttribute("id");
		listBoxSummaryHolderID.value = "list-box-summary";
		listBoxSummaryHolder.setAttributeNode(listBoxSummaryHolderID);

		listBox.appendChild(listBoxSummaryHolder);

		$("#list-holder").appendChild(listBox);
	}

	List.prototype.addItemToList = function (item) {
		var itemBox = document.createElement("div");
		var itemBoxClassAttribute = document.createAttribute("class");
		itemBoxClassAttribute.value = "item-box";
		itemBox.setAttributeNode(itemBoxClassAttribute);

		itemBoxDataIDAttribute = document.createAttribute("data-id");
		itemBoxDataIDAttribute.value = item.id;
		itemBox.setAttributeNode(itemBoxDataIDAttribute);


		var itemBoxCheckBox = document.createElement("input");

		itemBoxCheckBoxTypeAttribute = document.createAttribute("type");
		itemBoxCheckBoxTypeAttribute.value = "checkbox";
		itemBoxCheckBox.setAttributeNode(itemBoxCheckBoxTypeAttribute);

		itemBoxCheckBoxClassAttribute = document.createAttribute("class");
		itemBoxCheckBoxClassAttribute.value = "item-box-checkbox";
		itemBoxCheckBox.setAttributeNode(itemBoxCheckBoxClassAttribute);

		itemBoxCheckBoxDataIDAttribute = document.createAttribute("data-id");
		itemBoxCheckBoxDataIDAttribute.value = item.id;
		itemBoxCheckBox.setAttributeNode(itemBoxCheckBoxDataIDAttribute);

		itemBox.appendChild(itemBoxCheckBox);

		var itemBoxText =  document.createElement("input");

		itemBoxTextTypeAttribute = document.createAttribute("type");
		itemBoxTextTypeAttribute.value = "text";
		itemBoxText.setAttributeNode(itemBoxTextTypeAttribute);

		itemBoxTextClassAttribute = document.createAttribute("class");
		itemBoxTextClassAttribute.value = "item-box-text";
		itemBoxText.setAttributeNode(itemBoxTextClassAttribute);

		itemTextDataIDAttribute = document.createAttribute("data-id");
		itemTextDataIDAttribute.value = item.id;
		itemBoxText.setAttributeNode(itemTextDataIDAttribute);

		itemBoxTextValueAttribute = document.createAttribute("value");
		itemBoxTextValueAttribute.value = item.content;
		itemBoxText.setAttributeNode(itemBoxTextValueAttribute);

		itemBox.appendChild(itemBoxText);

		var itemBoxDelete = document.createElement("button");

		itemBoxDeleteClassAttribute = document.createAttribute("class");
		itemBoxDeleteClassAttribute.value = "item-box-delete";
		itemBoxDelete.setAttributeNode(itemBoxDeleteClassAttribute);

		itemDeleteDataIDAttribute = document.createAttribute("data-id");
		itemDeleteDataIDAttribute.value = item.id;
		itemBoxDelete.setAttributeNode(itemDeleteDataIDAttribute);

		itemBoxDeleteText = document.createTextNode("Delete");
		itemBoxDelete.appendChild(itemBoxDeleteText);

		itemBox.appendChild(itemBoxDelete);

		$("#list-box-items").appendChild(itemBox);
	}

	List.prototype.renderSummary = function () {

		var listSummaryCount = document.createElement("div");

		var listSummaryCountClass = listSummaryCount.setAttribute("class", "list-summary-count");

		var listSummaryCountText = document.createTextNode("0 items");
		listSummaryCount.appendChild(listSummaryCountText);

		var listSummaryFilter = document.createElement("div");
		listSummaryFilter.setAttribute("class", "list-summary-filter");

		var listSummaryFilterAll = document.createElement("button");
		listSummaryFilterAll.setAttribute("id", "summary-all");
		listSummaryFilterAll.setAttribute("class", "summary-filter-button");
		listSummaryFilterAll.appendChild(document.createTextNode("All"));
		listSummaryFilter.appendChild(listSummaryFilterAll);

		var listSummaryFilterActive = document.createElement("button");
		listSummaryFilterActive.setAttribute("id", "summary-active");
		listSummaryFilterActive.setAttribute("class", "summary-filter-button");
		listSummaryFilterActive.appendChild(document.createTextNode("Active"));
		listSummaryFilter.appendChild(listSummaryFilterActive);

		var listSummaryFilterCompleted = document.createElement("button");
		listSummaryFilterCompleted.setAttribute("id", "summary-completed");
		listSummaryFilterCompleted.setAttribute("class", "summary-filter-button");
		listSummaryFilterCompleted.appendChild(document.createTextNode("Completed"));
		listSummaryFilter.appendChild(listSummaryFilterCompleted);


		$('#list-box-summary').appendChild(listSummaryFilter);

		$('#list-box-summary').appendChild(listSummaryCount);
	}

	List.prototype.removeItemFromList = function (itemid) {
		$('.item-box[data-id="' + itemid + '"]').remove();
	}

	List.prototype.updateItemStatus = function (itemid, status) {

		if (status) {
			$('.item-box-text[data-id="'+ itemid +'"]').setAttribute('class', 'item-box-text item-strike');
		} else {
			$('.item-box-text[data-id="'+ itemid +'"]').setAttribute('class', 'item-box-text item-unstrike');
		}

	}

	List.prototype.updateCount = function () {
		$(".list-summary-count").innerHTML = this.items.length +" items";
	}

	// Methods - Add, Delete, Filter, onComplete
	
	return List;
})();