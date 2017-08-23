(function(){
	var Start = function(){
		var self = this;
		
		// setInterval(function(){
		// 	console.log(
		// 		self.keys[37],
		// 		self.keys[38],
		// 		self.keys[39],
		// 		self.keys[40],
		// 		self.keyLine)
		// }, 50);

		this.size = 1;

		this.direction = {
			37: "left",
			38: "top",
			39: "right",
			40: "bottom"
		};

		this.canvas = document.createElement("canvas");		
		this.ctx = this.canvas.getContext("2d");

		this.pacman = new pacman.Pacman(self.canvas, this.size, 7);
		
		this.map = new pacman.Map();
		this.map.load("map/lvl1.map", function(map, point){
			self.canvas.width = self.size * 8 * map.width;
			self.canvas.height = self.size * 8 * map.height;
			self.canvas.style.backgroundColor = "black";
			document.body.appendChild(self.canvas);
			self.drawMap(map);
			self.pacman.setPoint(point.x, point.y);
			self.pacman.paint();

			self.addKeyEvents();
		}, function(err){
			console.error(err);
		});

	};

	Start.prototype.addKeyEvents = function(){
		var self = this;

		this.keys = {};
		this.keyLine = null;
		this.stepDelay = 10;
		window.addEventListener("keydown", function(e){self.keyDownFire(e)});
	};

	Start.prototype.keyDownFire =	function(e){
		var self = this;

		var key = e.keyCode;

		if(self.keys[key]) return;
		if(Object.keys(self.keys).length && (!self.pacman.isInXCenter() || !self.pacman.isInYCenter())){
			self.keyLine = key;
			setTimeout(function(){self.keyLine = null}, self.stepDelay*10);
			return;
		} else if(Object.keys(self.keys).length && !self.keyLine && self.map.canGo(self.pacman.x, self.pacman.y, self.direction[self.keyLine])){
			self.clearKeys();
			self.keyLine = null;
		}
			
		

		if (key == 37){

			if (!self.pacman.isInYCenter() || !self.map.canGo(self.pacman.x, self.pacman.y, "left")) return;
			self.keys[key] = setInterval(function(){
				if (!self.map.canGo(self.pacman.x, self.pacman.y, "left") && self.pacman.isInYCenter()) self.clearKeys();
				if(self.pacman.isInXCenter() && self.keyLine && self.map.canGo(self.pacman.x, self.pacman.y, self.direction[self.keyLine])){
					console.log(2);
					self.clearKeys();
					var event = {keyCode: self.keyLine};
					self.keyLine = null;
					self.keyDownFire(event);
					return;
				}
				self.pacman.left();

			}, self.stepDelay);
		
		} else	if (key == 38){
			
			if (!self.pacman.isInXCenter() && !self.map.canGo(self.pacman.x, self.pacman.y, "top")) return;
			self.keys[key] = setInterval(function(){
				if (!self.map.canGo(self.pacman.x, self.pacman.y, "top") && self.pacman.isInXCenter()) self.clearKeys();
				if(self.pacman.isInYCenter() && self.keyLine && self.map.canGo(self.pacman.x, self.pacman.y, self.direction[self.keyLine])){
					console.log(3);
					self.clearKeys();
					var event = {keyCode: self.keyLine};
					self.keyLine = null;
					self.keyDownFire(event);
					return;
				}
				self.pacman.top();
			}, self.stepDelay);
		
		} else if (key == 39){
			
			if (!self.pacman.isInYCenter() && !self.map.canGo(self.pacman.x, self.pacman.y, "right")) return;
			self.keys[key] = setInterval(function(){
				if (!self.map.canGo(self.pacman.x, self.pacman.y, "right") && self.pacman.isInYCenter()) self.clearKeys();
				if(self.pacman.isInXCenter() && self.keyLine && self.map.canGo(self.pacman.x, self.pacman.y, self.direction[self.keyLine])){
					self.clearKeys();
					var event = {keyCode: self.keyLine};
					self.keyLine = null;
					self.keyDownFire(event);
					return;
				}
				self.pacman.right();
			}, self.stepDelay);
		
		} else if (key == 40){
			
			if (!self.pacman.isInXCenter() && !self.map.canGo(self.pacman.x, self.pacman.y, "bottom")) self.clearKeys();
			self.keys[key] = setInterval(function(){
				if (!self.map.canGo(self.pacman.x, self.pacman.y, "bottom") && self.pacman.isInXCenter()) return ;
				if(self.pacman.isInYCenter() && self.keyLine && self.map.canGo(self.pacman.x, self.pacman.y, self.direction[self.keyLine])){
					self.clearKeys();
					var event = {keyCode: self.keyLine};
					self.keyLine = null;
					self.keyDownFire(event);
					return;
				}
				self.pacman.bottom();
			}, self.stepDelay);
		
		}
		
	};

		// window.addEventListener("keyup", function(e){
		// 	var key = e.keyCode;
		// 	if(self.keys[key]){
		// 		clearInterval(self.keys[key]);
		// 		delete self.keys[key];
		// 	}
		// });

	// };

	Start.prototype.clearKeys = function(){
		var self = this;
		for (k in self.keys){
			clearInterval(self.keys[k]);
			delete self.keys[k];
		}
		self.keys = {};
		// self.keyLine = null;
	};

	Start.prototype.drawMap = function(map){
		var height = map.height;
		var width = map.width;
		this.ctx.beginPath();
		this.ctx.fillStyle = "blue";
		for (var j = 0; j < height; j++){
			for (var i = 0; i < width; i++){
				if(map.data[j*width+i] === "1"){
					this.ctx.fillRect(((i*8)+1), ((j*8)+1), 6, 6);
				}
			}
		}
	};

	window.pacman = window.pacman || {};
	window.pacman.Start = Start;
})();