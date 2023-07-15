const track = document.getElementsByClassName("image-track");
var currentSection = 0;

function showSection(sectionID) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		sections[i].style.display = "none";
		if (sections[i].id == sectionID) {
			currentSection = i;
		}
	}

	var section = document.getElementById(sectionID);
	section.style.display = "grid";
}

const handleOnDown = (e) =>
	(track[currentSection].dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
	track[currentSection].dataset.mouseDownAt = "0";
	track[currentSection].dataset.prevPercentage =
		track[currentSection].dataset.percentage;
};

const handleOnMove = (e) => {
	if (track[currentSection].dataset.mouseDownAt === "0") return;

	const mouseDelta =
			parseFloat(track[currentSection].dataset.mouseDownAt) - e.clientX,
		maxDelta = window.innerWidth / 2;

	const percentage = (mouseDelta / maxDelta) * -100,
		nextPercentageUnconstrained =
			parseFloat(track[currentSection].dataset.prevPercentage) +
			percentage,
		nextPercentage = Math.max(
			Math.min(nextPercentageUnconstrained, 0),
			-100
		);

	track[currentSection].dataset.percentage = nextPercentage;

	track[currentSection].animate(
		{
			transform: `translate(${nextPercentage + 50}%, 0%)`,
		},
		{ duration: 1200, fill: "forwards" }
	);
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
