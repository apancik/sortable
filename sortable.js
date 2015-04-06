function ready(fn) {
	if (document.readyState != "loading") {
		fn();
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

ready(function() {
	var tables = document.querySelectorAll("[sortable]");

	for (var index = 0; index < tables.length; index++) {
		var header = tables[index].querySelectorAll("thead th");
		var table = tables[index].querySelector("tbody");

		for (var headerIndex = 0; headerIndex < header.length; headerIndex++) {
			(function(column) {
				var headerElement = header[column];

				headerElement.addEventListener("click", function() {
					var direction = headerElement.getAttribute("data-sorted") || 1;

					var rows = table.querySelectorAll("tr");

					var data = [];

					for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
						data.push([rows[rowIndex].querySelectorAll("td")[column].innerHTML, rowIndex]);
					}

					data.sort(function(a, b) {
						if (!isNaN(parseFloat(a[0])) && !isNaN(parseFloat(b[0]))) {
							if (parseFloat(a[0]) < parseFloat(b[0])) {
								return -direction;
							} else if (parseFloat(a[0]) > parseFloat(b[0])) {
								return direction;
							} else {
								return 0;
							}
						} else {
							if (a[0].toLocaleLowerCase() < b[0].toLocaleLowerCase()) {
								return -direction;
							} else if (a[0].toLocaleLowerCase() > b[0].toLocaleLowerCase()) {
								return direction;
							} else {
								return 0;
							}
						}
					});

					for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
						table.appendChild(rows[data[dataIndex][1]]);
					}

					headerElement.setAttribute("data-sorted", -direction);
				});
			})(headerIndex);
		}
	}
});
