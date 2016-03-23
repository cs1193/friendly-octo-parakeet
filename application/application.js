(function (window, document, List, Item) {
	var ENTER_KEY = 13;

	document.addEventListener("DOMContentLoaded", function () {
		console.groupCollapsed("Todo List");
		console.time("Execution");
		var list = new List({name: "New List"});

		$on($(".list-box-new-item"),"keypress", function (event) {

			if(event.keyCode === ENTER_KEY) {
				list.addItem(this.value);
				this.value = '';
			}
		});


		$delegate($("#list-box-items"), ".item-box-delete", "click", function (event) {
			list.removeItem(this.getAttribute("data-id"));
		});

		$delegate($("#list-box-items"), ".item-box-text", "keypress", function (event) {
			if(event.keyCode === ENTER_KEY) {
				list.updateItemContent(this.getAttribute("data-id"), this.value);
			}
		});

		$delegate($("#list-box-items"), ".item-box-checkbox", "change", function (event) {
			if (this.checked) {
				list.setItemAsComplete(this.getAttribute("data-id"), true);				
			} else {
				list.setItemAsComplete(this.getAttribute("data-id"), false);
			}
		});

		$on($("#summary-all"), "click", function (event) {
			list.getStatusByTag("all");
		});

		$on($("#summary-active"), "click", function (event) {
			list.getStatusByTag("active");
		});

		$on($("#summary-completed"), "click", function (event) {
			list.getStatusByTag("completed");
		});


		console.timeEnd("Execution");
		console.groupEnd();
	});


})(window, document, List, Item);