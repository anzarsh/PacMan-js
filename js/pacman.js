(function(){
	var Pacman = function(canvas, size, radius, x, y){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.size = size;
		this.radius = radius * this.size;
		this.screenX = x;
		this.screenY = y;
		this.state = 20;
		this.direction = 0;
		this.step = 1 * this.size;
		this.stateEnd = 38;
	};

	Pacman.prototype._paint = function(color, radiusPlus){
		var xs = [];
		var ys = [];
		xs.push(this.screenX);
		ys.push(this.screenY);
		if (this.screenX < this.radius){
			xs.push(this.screenX + this.canvas.width);
		} else if (this.screenX > this.canvas.width - this.radius - 1){
			xs.push(this.screenX - this.canvas.width);
		}
		if (this.screenY < this.radius){
			ys.push(this.screenY + this.canvas.height);
		} else if (this.screenY > this.canvas.height - this.radius - 1){
			ys.push(this.screenY - this.canvas.height);
		}
		var stateEnd2 = this.stateEnd/2;
		var stateEnd3 = 3*this.stateEnd/2;

		var state = this.state > stateEnd2 ? this.stateEnd - this.state : this.state;
		var topAngle = (this.direction * (Math.PI/2)) - (state*(Math.PI/stateEnd3));
		var bottomAngle = (this.direction * (Math.PI/2)) + (state*(Math.PI/stateEnd3));
		for(var i = 0; i < xs.length ; ++i){
			for(var j = 0; j < ys.length ; ++j){
				this.ctx.beginPath();
				this.ctx.fillStyle = color;
				this.ctx.arc(xs[i], ys[j], this.radius + radiusPlus, topAngle, topAngle + Math.PI, true);
				this.ctx.fill();

				this.ctx.beginPath();
				this.ctx.fillStyle = color;
				this.ctx.arc(xs[i], ys[j], this.radius + radiusPlus, bottomAngle, bottomAngle + Math.PI, false);
				this.ctx.fill();
			}
		}
	};

	Pacman.prototype.paint = function(){
		this._paint("yellow", 0);
	};

	Pacman.prototype.clear = function(){
		this._paint("black", 1);
	};

	Pacman.prototype.left = function(){
		this.clear();
		this.screenX -= this.step;
		this.screenX = (this.screenX<0)?this.canvas.width-1:this.screenX;
		this.direction = 2;
		this.state = (++this.state) % this.stateEnd;
		this.paint();
	};

	Pacman.prototype.right = function(){
		this.clear();
		this.screenX += this.step;
		this.screenX %= this.canvas.width;
		this.direction = 0;
		this.state = (++this.state) % this.stateEnd;
		this.paint();
	};

	Pacman.prototype.top = function(){
		this.clear();
		this.screenY -= this.step;
		this.screenY = (this.screenY<0)?this.canvas.height-1:this.screenY;
		this.direction = 3;
		this.state = (++this.state) % this.stateEnd;
		this.paint();
	};

	Pacman.prototype.bottom = function(){
		this.clear();
		this.screenY += this.step;
		this.screenY %= this.canvas.height;
		this.direction = 1;
		this.state = (++this.state) % this.stateEnd;
		this.paint();
	};

	window.pacman = window.pacman || {};
	window.pacman.Pacman = Pacman;
})();