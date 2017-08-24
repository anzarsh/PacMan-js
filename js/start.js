(function(){
	var Start = function(){
		var self = this;
		
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
		this.stepDelay = 20;
		window.addEventListener("keydown", function(e){self.keyDownFire(e)});
	};

	Start.prototype.keyDownFire =	function(e){
		var self = this;

		var key = e.keyCode;

		//отмена повторного нажатия той же клавиши
		if(self.keys[key]) return;

		//поставить в очередь
		if(Object.keys(self.keys).length>0){
			self.keyLine = key;
			return;
		}

		//может ли PacMan идти в указанном направлении
		if(self.map.canGo(self.pacman.x, self.pacman.y, self.direction[key])){

			self.keys[key] = setInterval(function(){

				//сделать движение в направлении в соответствии с нажатой клавишей
				self.pacman.turn(self.direction[key]);


				if (self.keyLine && self.pacman.isInCenter() && self.map.canGo(self.pacman.x, self.pacman.y, self.direction[self.keyLine])){
					/*если есть на очереди движение в другую сторону и Pacman может туда пойти*/
					var tempKey = self.keyLine;
					self.clearKeys();
					self.keyDownFire({keyCode: tempKey});
				} else if(self.pacman.isInCenter() && !self.map.canGo(self.pacman.x, self.pacman.y, self.direction[key])){
					/*если PacMan-у в этом направлении уже некуда идти*/
					self.clearKeys();
				} else if(self.pacman.isInCenter()){
					/*если есть очередь на движение в другом направлении, но Pacman не может туда повернуть, до следующей клетки, то очистить эту очередь*/
					self.keyLine = null;
				}

			}, self.stepDelay);

		}

	};

	Start.prototype.clearKeys = function(){
		var self = this;
		for (k in self.keys){
			clearInterval(self.keys[k]);
			delete self.keys[k];
		}
		self.keys = {};
		self.keyLine = null;
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