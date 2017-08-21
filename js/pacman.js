(function(){
	var Pacman = function(ctx, radius, x, y){
		this.ctx = ctx;
		this.radius = radius;
		this.x = x;
		this.y = y;
		this.state = 1;
		this.direction = 0;
		this.step = 1;
		this.paint();
	};

	Pacman.prototype.paint = function(){
		var state = this.state == 3 ? 1 : this.state;
		var topAngle = (this.direction * (Math.PI/2)) - (state*(Math.PI/8));
		var bottomAngle = (this.direction * (Math.PI/2)) + (state*(Math.PI/8));

		this.ctx.beginPath();
		this.ctx.fillStyle = "yellow";
		this.ctx.arc(this.x, this.y, this.radius, topAngle, topAngle + Math.PI, true);
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.fillStyle = "yellow";
		this.ctx.arc(this.x, this.y, this.radius, bottomAngle, bottomAngle + Math.PI, false);
		this.ctx.fill();
	};

	Pacman.prototype.clear = function(){
		var state = this.state == 3 ? 1 : this.state;
		var topAngle = (this.direction * (Math.PI/2)) - (state*(Math.PI/8));
		var bottomAngle = (this.direction * (Math.PI/2)) + (state*(Math.PI/8));

		this.ctx.beginPath();
		this.ctx.fillStyle = "black";
		this.ctx.arc(this.x, this.y, this.radius + 1, topAngle, topAngle + Math.PI, true);
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.fillStyle = "black";
		this.ctx.arc(this.x, this.y, this.radius + 1, bottomAngle, bottomAngle + Math.PI, false);
		this.ctx.fill();
	};

	Pacman.prototype.left = function(){
		this.clear();
		this.x -= this.step;
		this.direction = 2;
		this.state = (++this.state) % 4;
		this.paint();
	};

	Pacman.prototype.right = function(){
		this.clear();
		this.x += this.step;
		this.direction = 0;
		this.state = (++this.state) % 4;
		this.paint();
	};

	Pacman.prototype.top = function(){
		this.clear();
		this.y -= this.step;
		this.direction = 3;
		this.state = (++this.state) % 4;
		this.paint();
	};

	Pacman.prototype.bottom = function(){
		this.clear();
		this.y += this.step;
		this.direction = 1;
		this.state = (++this.state) % 4;
		this.paint();
	};

	window.pacman = window.pacman || {};
	window.pacman.Pacman = Pacman;
})();