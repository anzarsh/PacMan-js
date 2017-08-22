(function(){
	var Start = function(){
		var self = this;
		
		this.size = 1;

		this.canvas = document.createElement("canvas");		
		this.ctx = this.canvas.getContext("2d");

		this.pacman = new pacman.Pacman(self.canvas, this.size, 7, 100, 100);
		
		this.map = new pacman.Map();
		this.map.load("map/lvl1.map", function(map){
			self.canvas.width = self.size * 8 * map.width;
			self.canvas.height = self.size * 8 * map.height;
			self.canvas.style.backgroundColor = "black";
			document.body.appendChild(self.canvas);
			self.drawMap(map);
			self.pacman.paint();
		}, function(err){
			console.error(err);
		});


		this.keys = {};
		this.stepDelay = 10;
		window.addEventListener("keydown", function(e){

			var key = e.keyCode;
			if(!self.keys[key]){

				for (k in self.keys){
					clearInterval(self.keys[k]);
					delete self.keys[key];
				}

				self.keys = {};
				if (key == 37){
				
					self.keys[key] = setInterval(function(){
						self.pacman.left();
					}, self.stepDelay);
				
				} else	if (key == 38){
				
					self.keys[key] = setInterval(function(){
						self.pacman.top();
					}, self.stepDelay);
				
				} else if (key == 39){
				
					self.keys[key] = setInterval(function(){
						self.pacman.right();
					}, self.stepDelay);
				
				} else if (key == 40){
					self.keys[key] = setInterval(function(){
						self.pacman.bottom();
					}, self.stepDelay);
				
				}

			}
		});

		window.addEventListener("keyup", function(e){
			var key = e.keyCode;
			if(self.keys[key]){
				clearInterval(self.keys[key]);
				delete self.keys[key];
			}
		});

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