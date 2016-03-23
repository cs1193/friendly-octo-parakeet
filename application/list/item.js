var Item = (function () {

	var Item = function (object) {
		this.id = guid(); // guid generation
		this.content = object.content;
		this.complete = object.complete;
		this.listid = object.listid;
		this.createddate = new Date();
		this.updateddate = new Date();
	};

	return Item;

})();