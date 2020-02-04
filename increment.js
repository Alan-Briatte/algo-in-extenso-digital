let globalSpreadedVal;
let globalInputVal;

(() => {
	let jqInput = $(".increment-test__input input");

	jqInput.on("keyup", ev => {
		globalInputVal = ev.target.value;
		createArray();
	});
})();

function createArray() {
	let spreadedVal = [...globalInputVal];

	let arrayLength = spreadedVal.length;
	globalSpreadedVal = spreadedVal.map(num => parseInt(num));
	setValues(spreadedVal, arrayLength);
}

function setValues(arr, length) {
	const jqContainer = $(".increment-test__buttons");
	jqContainer.empty();

	for (let i = 0; i < length; i++) {
		let button = $(`<button>${arr[i]}</button>`);
		button.attr("data-idx", i);
		button.addClass("btn btn-primary");
		button.on("click", () => {
			increment(i);
		});
		jqContainer.append(button);
	}
}

function showResult() {
	let result = parseInt(globalSpreadedVal.join(""));

	if (!isNaN(result)) {
		$(".increment-test__result input").val(result);
		$(".increment-test__array-view").append(
			`<span>${globalSpreadedVal}</span>`
		);
		globalInputVal = globalSpreadedVal.join("");
		createArray();
	}
}

function increment(idx) {

	let toIncrement = globalSpreadedVal[idx];
	let newVal;

	newVal = toIncrement + 1 === 10 ? 0 : toIncrement + 1;

	globalSpreadedVal[idx] = newVal;
	showResult();
}
