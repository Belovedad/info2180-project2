// JavaScript Document

//transition used for the extra feature.


var t = 0,
	l = 0;


window.onload = setTiles;



function setTiles() {
	var area = document.getElementById("puzzlearea");
	var x = area.children;

	for (var i = 0; i < x.length; i++) {
		x[i].classList.add("puzzlepiece");
		x[i].style.left = l + "px";
		x[i].style.top = t + "px";
		x[i].style.backgroundPosition = "-" + x[i].style.left + " " + "-" + x[i].style.top;
		l += 100;
		if (l > 300) {
			t += 100;
			l = 0;
		}

		x[i].onclick = function () {
			if (movable(this.style.left, this.style.top)) {
				var loc = switcher(this.style.left, this.style.top);
				this.style.top = loc[1];
				this.style.left = loc[0];
				this.style.transition = "all 500ms"; // adding transnition here incase one decides to shuffle manually :/
			}
		};

		x[i].onmouseover = function () {
			if (movable(this.style.left, this.style.top)) {
				this.classList.add("movablepiece");
			}
		};

		x[i].onmouseout = function () {
			this.classList.remove("movablepiece");
		};
	}
	var s = document.getElementById("shufflebutton");
	s.onclick = function () {
		shuffle();
	};


}

function movable(posl, post) {

	var x = parseInt(posl, 10);
	var y = parseInt(post, 10);
	console.log(x);
	console.log(y);

	if (x + 100 === l && y === t || x - 100 === l && y === t || y + 100 === t && x === l || y - 100 === t && x === l) {
		return true;
	} else {
		return false;
	}

}

function switcher(x, y) {
	var ol = x;
	var ot = y;
	x = l + "px";
	y = t + "px";
	l = parseInt(ol, 10);
	t = parseInt(ot, 10);
	return [x, y];
}


function shuffle() {
	var area = document.getElementById("puzzlearea");
	var x = area.children;
	var moves = [];
	for (var i = 0; i < 50; i++) {
		for (var j = 0; j < x.length; j++) {
			if (movable(x[j].style.left, x[j].style.top)) {
				moves.push([x[j], j]);
				x[j].style.transition = "all 500ms"; //transition element applied to pieces shuffled
			}
		}
		if (moves.length != 0) {
			var q = Math.floor(Math.random() * moves.length);
			var w = switcher(moves[q][0].style.left, moves[q][0].style.top);
			moves[q][0].style.left = w[0];
			moves[q][0].style.top = w[1];
		}
	}
}
