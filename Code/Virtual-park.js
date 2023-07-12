function showSection(sectionID) {
	var sections = document.getElementsByClassName("attraction-section");
	for (var i = 0; i < sections.length; i++) {
		sections[i].style.display = "none";
	}

	var section = document.getElementById(sectionID);
	section.style.display = "grid";
}
